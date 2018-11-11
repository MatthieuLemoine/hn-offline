import React from 'react';
import styled from 'styled-components/native';
import { ProgressBarAndroid } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <Container>
    <ProgressBarAndroid indeterminate styleAttr="Large" />
  </Container>
);

export default Loading;
