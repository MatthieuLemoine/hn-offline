const express = require('express');
const { getAuthUrl, getTokens } = require('../apis/google');

const router = express.Router();

router.get('/authUrl', (req, res, next) => {
  try {
    res.json({ authUrl: getAuthUrl() });
  } catch (e) {
    next(e);
  }
});

router.get('/tokens', async (req, res, next) => {
  try {
    const { code } = req.query;
    const tokens = await getTokens(code);
    res.json(tokens);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
