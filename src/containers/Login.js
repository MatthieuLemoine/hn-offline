import {
  compose,
  withHandlers,
  withState,
  branch,
  lifecycle,
  renderComponent,
  mapProps,
} from 'recompose';
import { prop } from 'ramda';
import { Redirect } from 'react-router-native';
import Loading from '../components/Loading';

import Application from '../components/Application';
import { getAuthUrl, getTokens } from '../api';
import { saveTokens, getTokens as getStoredTokens } from '../storage';

export default compose(
  withState('loading', 'setLoading', true),
  withState('authUrl', 'setAuthUrl', ''),
  withState('tokens', 'setTokens', null),
  withState('code', 'setCode', ''),
  withHandlers({
    submitCode: props => async () => {
      try {
        const tokens = await getTokens(props.code);
        await saveTokens(tokens);
        props.setTokens(tokens);
      } catch (e) {
        console.error(e);
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      try {
        const tokens = await getStoredTokens();
        this.props.setTokens(tokens);
        const authUrl = await getAuthUrl();
        this.props.setAuthUrl(authUrl);
      } catch (e) {
        console.error(e);
      } finally {
        this.props.setLoading(false);
      }
    },
  }),
  branch(prop('loading'), renderComponent(Loading)),
  branch(
    prop('tokens'),
    compose(
      mapProps(() => ({
        to: '/articles',
      })),
      renderComponent(Redirect),
    ),
  ),
)(Application);
