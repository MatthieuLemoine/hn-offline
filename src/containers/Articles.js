import {
  compose,
  withHandlers,
  withState,
  branch,
  lifecycle,
  renderComponent,
  mapProps,
} from 'recompose';
import { prop, not } from 'ramda';
import { Redirect } from 'react-router-native';
import Loading from '../components/Loading';

import Articles from '../components/Articles';
import { getDigest } from '../api';
import {
  getTokens as getStoredTokens,
  getArticles,
  removeArticle,
  clearArticles,
  downloadDigest,
} from '../storage';

export default compose(
  withState('loading', 'setLoading', true),
  withState('articles', 'setArticles', []),
  withState('tokens', 'setTokens', null),
  withState('code', 'setCode', ''),
  withHandlers({
    fetchLastDigest: props => async () => {
      try {
        const digest = await getDigest(props.tokens);
        const articles = await downloadDigest(digest);
        props.setArticles(articles);
      } catch (e) {
        console.error(e);
      }
    },
    deleteArticle: props => async (article) => {
      try {
        const articles = await removeArticle(article.id);
        props.setArticles(articles);
      } catch (e) {
        console.error(e);
      }
    },
    deleteAll: props => async () => {
      try {
        const articles = await clearArticles();
        props.setArticles(articles);
      } catch (e) {
        console.error(e);
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      try {
        const articles = await getArticles();
        this.props.setArticles(articles);
        const tokens = await getStoredTokens();
        this.props.setTokens(tokens);
      } catch (e) {
        console.error(e);
      } finally {
        this.props.setLoading(false);
      }
    },
  }),
  branch(prop('loading'), renderComponent(Loading)),
  branch(
    compose(
      not,
      prop('tokens'),
    ),
    compose(
      mapProps(() => ({
        to: '/login',
      })),
      renderComponent(Redirect),
    ),
  ),
)(Articles);
