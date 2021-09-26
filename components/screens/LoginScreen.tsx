import React, { useContext, useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import UserContext from '../../contexts/UserContext';
import { loginUser } from '../../network/API';
import { ErrorHandler } from './BaseScreen';

export interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { setIsLoggedIn, setToken, setUsername } = useContext(UserContext);
  const [state, setState] = useState('loaded');
  const [login, setLogin] = useState('mor_2314');
  const [errorMessage, setErrorMessage] = useState(
    'Could not login, please try again later',
  );
  const [password, setPassword] = useState('83r5');

  return ErrorHandler(
    state,
    errorMessage,
    <View>
      <TextInput
        style={styles.input}
        onChangeText={txt => {
          setLogin(txt);
        }}
        value={login}
      />
      <TextInput
        style={styles.input}
        onChangeText={txt => {
          setPassword(txt);
        }}
        value={password}
      />
      <Button
        title={'login'}
        onPress={() => {
          setState('loading');
          loginUser(
            login,
            password,
            token => {
              console.log({ setUsername, login });
              setToken ? setToken(token) : null;
              setUsername ? setUsername(login) : null;
              setState('loaded');
              setIsLoggedIn ? setIsLoggedIn(true) : null;
              navigation.goBack('Home');
            },
            error => {
              setErrorMessage(error.message);
              setState('error');
              console.error(error);
            },
          );
        }}
      />
    </View>,
    () => {
      setState('loaded');
    },
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
