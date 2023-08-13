import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Toast } from 'toastify-react-native';
import { login } from '../@core/authenticateGateway';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formOptions, setFormOptions] = useState({
    linkLabel: 'Esqueceu a senha? Clique aqui',
    href: '/carrinho',
    buttonLabel: 'Entrar',
    isDisabled: false,
  });

  async function handleSubmit(email, password) {
    setFormOptions({
      ...formOptions,
      buttonLabel: 'Entrando...',
      isDisabled: true,
    });
    
    await login(email, password);
  }

  const loginHandler = React.useCallback((email, password) => {
    handleSubmit(email, password)
      .then(() => {
        Toast.success('Sucesso!');
        navigation.navigate('Home');
      })
      .catch(() => {
        Toast.error('Falhou');
        setFormOptions({
          ...formOptions,
          buttonLabel: 'Entrar',
          isDisabled: false,
        });
        console.error(error);
      });
  }, [login]);

  return (
    <View style={styles.formPage}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>
        Digite seu email e senha para acessar sua conta
      </Text>
      <View style={styles.formBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => loginHandler(email, password)}
          disabled={formOptions.isDisabled}>
          <Text style={styles.buttonText}>{formOptions.buttonLabel}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.redirLink}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>{formOptions.linkLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.redirLink}
        onPress={() => navigation.navigate('Register')}>
        <Text>Não possui conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  formPage: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  formBox: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    marginTop: 16,
    paddingBottom: 10,
    backgroundColor: '#4a9655',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    width: 250,
    marginLeft: "auto",
    marginRight: "auto"
  },
  redirLink: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Login;
