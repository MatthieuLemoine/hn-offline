const express = require('express');
const { getPdf } = require('../apis/pdf');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { url } = req.query;
    getPdf(url).pipe(res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
