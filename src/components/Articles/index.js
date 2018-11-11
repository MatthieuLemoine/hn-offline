import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { prop } from 'ramda';
import { Button } from 'react-native';
import { Link } from 'react-router-native';

const Container = styled.View`
  flex: 1;
  align-items: stretch;
  margin-top: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const TopContainer = styled.View`
  margin-horizontal: 16px;
  margin-bottom: 16px;
`;

const List = styled.FlatList`
  flex: 1;
  margin-top: 16px;
`;

const Article = styled(Link)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
`;

const Column = styled.View``;

const ArticleTitle = styled.Text`
  font-size: 16px;
  flex: 4;
`;

const Information = styled.Text`
  font-size: 12px;
  flex: 1;
`;

const Articles = ({ articles, fetchLastDigest, deleteAll }) => (
  <Container>
    <TopContainer>
      <Title>Hacker News Offline</Title>
      <Button title="Fetch last digest" onPress={fetchLastDigest} />
      <Button title="Delete all articles" onPress={deleteAll} />
    </TopContainer>
    <List
      data={articles}
      keyExtractor={prop('id')}
      renderItem={({ item: article }) => (
        <Article to={`/article/${article.id}`}>
          <Fragment>
            <ArticleTitle>{article.title}</ArticleTitle>
            <Column>
              <Information>{article.source}</Information>
              <Information>{article.date}</Information>
            </Column>
          </Fragment>
        </Article>
      )}
    />
  </Container>
);

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  })).isRequired,
  fetchLastDigest: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};

export default Articles;
