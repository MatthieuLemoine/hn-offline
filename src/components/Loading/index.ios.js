import React from 'react';
import styled from 'styled-components/native';
import { ProgressViewIOS } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <Container>
    <ProgressViewIOS />
  </Container>
);

export default Loading;
