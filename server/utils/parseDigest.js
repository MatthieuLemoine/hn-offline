const scrape = require('scrape-it');
const { format } = require('date-fns');
const { omit } = require('ramda');

const letters = /[A-Za-z]/;
const withoutInfo = omit(['info']);

module.exports = (html) => {
  const today = format(new Date(), 'YYYY/MM/DD');
  return scrape
    .scrapeHTML(html, {
      articles: {
        listItem: 'th > table > tr',
        data: {
          title: 'th > a',
          url: {
            selector: 'th > a',
            attr: 'href',
          },
          info: {
            selector: 'th > div > a',
            convert: (string) => {
              const [source, points = '', comments = ''] = string
                .split('|')
                .map(item => item.trim());
              return {
                source,
                points: points.split(': ')[1],
                comments: comments.split(': ')[1],
                date: today,
              };
            },
          },
        },
      },
    })
    .articles.filter(item =>
      item.title &&
        item.url &&
        !letters.test(item.info.points) &&
        !letters.test(item.info.comments))
    .map(item => ({
      ...withoutInfo(item),
      ...item.info,
    }));
};
