const request = require('request');
const validateEnv = require('../utils/validateEnv');

validateEnv(['HN_OFFLINE_PDF_API', 'HN_OFFLINE_API_KEY']);

const { HN_OFFLINE_PDF_API, HN_OFFLINE_API_KEY } = process.env;

const getPdf = url =>
  request({
    url: `${HN_OFFLINE_PDF_API}/api/render`,
    method: 'post',
    headers: { 'x-api-key': HN_OFFLINE_API_KEY },
    json: true,
    body: {
      url,
      scrollPage: true,
      viewport: {
        isMobile: true,
        hasTouch: true,
      },
      pdf: {
        margin: {
          top: '16px',
          bottom: '16px',
          left: '16px',
          right: '16px',
        },
      },
    },
  });

module.exports = { getPdf };
