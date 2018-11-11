import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const Button = styled.Button``;

const Login = ({
  code, openBrowser, setCode, submitCode,
}) => (
  <Container>
    <Title>Login</Title>
    <Text>
      You need to authorize the app to access your gmail account. A code will be displayed.
      Copy-paste it below.
    </Text>
    <Button onPress={openBrowser} title="Authorize Gmail access" />
    <TextInput value={code} onChangeText={setCode} placeholder="Google code" />
    <Button onPress={submitCode} title="Submit" />
  </Container>
);

Login.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  openBrowser: PropTypes.func.isRequired,
  submitCode: PropTypes.func.isRequired,
};

export default Login;
