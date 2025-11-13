// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { encryptPulse, hashPulse, decryptPulse } = require('../utils/crypto');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../utils/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Set it in .env to sign tokens securely.');
}

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, pulseID } = req.body;
    if (!name || !email || !pulseID) {
      return res.status(400).json({ success: false, message: 'name, email and pulseID are required' });
    }

    const hashed = hashPulse(pulseID);
    // avoid duplicates
    const exists = await User.findOne({ $or: [{ email: email.toLowerCase().trim() }, { hashedPulse: hashed }] });
    if (exists) return res.status(409).json({ success: false, message: 'Email or pulse already registered' });

    const encrypted = encryptPulse(pulseID);

    const user = new User({
      name,
      email: email.toLowerCase().trim(),
      hashedPulse: hashed,
      encryptedPulse: encrypted,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: user._id,
      hashedID: hashed,
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// VERIFY: find by pulse hash, decrypt and return name/email on success + JWT
router.post('/verify', async (req, res) => {
  try {
    const { pulseID } = req.body;
    if (!pulseID) return res.status(400).json({ success: false, message: 'pulseID is required' });

    const hashed = hashPulse(pulseID);
    const record = await User.findOne({ hashedPulse: hashed }).lean();

    if (!record) return res.status(404).json({ verified: false, message: 'User not found' });

    const decrypted = decryptPulse(record.encryptedPulse);

    if (decrypted === String(pulseID)) {
      // success — create JWT and return user info
      const payload = { userId: record._id, email: record.email };
      const token = JWT_SECRET ? jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY }) : null;

      return res.json({
        verified: true,
        user: {
          id: record._id,
          name: record.name,
          email: record.email
        },
        token // token will be null if JWT_SECRET not configured
      });
    } else {
      return res.status(401).json({ verified: false, message: 'Verification failed' });
    }
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Protected example route: GET /api/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-encryptedPulse -hashedPulse').lean();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
