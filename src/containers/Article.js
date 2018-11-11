import { compose, withState, branch, lifecycle, renderComponent } from 'recompose';
import { prop } from 'ramda';
import Loading from '../components/Loading';
import Article from '../components/Article';
import { getArticles } from '../storage';

export default compose(
  withState('loading', 'setLoading', true),
  withState('article', 'setArticle', null),
  lifecycle({
    async componentDidMount() {
      try {
        const {
          match: {
            params: { id },
          },
        } = this.props;
        const articles = await getArticles();
        const article = articles.find(item => item.id === id);
        if (!article) {
          throw new Error(`Article with id ${id} not found`);
        }
        this.props.setArticle(article);
      } catch (e) {
        console.error(e);
      } finally {
        this.props.setLoading(false);
      }
    },
  }),
  branch(prop('loading'), renderComponent(Loading)),
)(Article);
