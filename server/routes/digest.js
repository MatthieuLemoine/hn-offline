const express = require('express');
const { getDigest } = require('../apis/google');
const parseDigest = require('../utils/parseDigest');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { access_token, refresh_token } = req.query;
    const rawDigest = await getDigest({ access_token, refresh_token });
    const digest = await parseDigest(rawDigest);
    res.json(digest);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
