import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { API_ROOT } from '../config';

const ARTICLES_KEY = 'articles';
const TOKENS_KEY = 'tokens';

const save = async (key, item) => {
  await AsyncStorage.setItem(key, JSON.stringify(item));
  return item;
};
const get = async (key, defaultValue) => {
  const value = await AsyncStorage.getItem(key);
  if (!value) {
    return defaultValue;
  }
  return JSON.parse(value);
};

export const saveTokens = tokens => save(TOKENS_KEY, tokens);
export const getTokens = () => get(TOKENS_KEY, null);

export const getArticles = () => get(ARTICLES_KEY, []);

export const addArticles = async (articles) => {
  const value = await get(ARTICLES_KEY, []);
  return save(ARTICLES_KEY, [...value, ...articles]);
};

export const removeArticle = async (id) => {
  const value = await get(ARTICLES_KEY);
  if (!value) {
    return [];
  }
  return save(ARTICLES_KEY, value.filters(item => item.id === id));
};

export const clearArticles = async () => {
  const articles = await get(ARTICLES_KEY);
  if (!articles) {
    return [];
  }
  await Promise.all(articles.map(async (article) => {
    if (!article.filePath) {
      return null;
    }
    return RNFetchBlob.fs.unlink(article.filePath).catch(console.error);
  }));
  return save(ARTICLES_KEY, []);
};

export const downloadDigest = async (articles) => {
  const enhancedArticles = await articles.reduce(
    (promise, article) =>
      promise.then(async (acc) => {
        const file = await RNFetchBlob.config({
          fileCache: true,
          appendExt: 'pdf',
        }).fetch('GET', `${API_ROOT}/pdf?url=${article.url}`);
        return [
          ...acc,
          {
            ...article,
            filePath: file.path(),
          },
        ];
      }),
    Promise.resolve([]),
  );
  return addArticles(enhancedArticles);
};
