import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Pdf from 'react-native-pdf';

const Container = styled.View`
  flex: 1;
`;

const Article = ({ article }) => (
  <Container>
    <Pdf
      source={{ uri: article.filePath, cache: false }}
      style={{
        flex: 1,
      }}
    />
  </Container>
);

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
