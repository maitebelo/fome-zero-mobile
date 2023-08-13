import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';

import { sendPasswordResetEmail } from '../@core/authenticateGateway';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const forgotHandler = React.useCallback(
    (email) => {
      setIsLoading(true);
      sendPasswordResetEmail(email)
        .then(() => {
          Toast.success('Sucesso!');
          setIsLoading(false);
          navigation.navigate('Login');
        })
        .catch(() => {
          setIsLoading(false);
          Toast.error('Falhou');
          console.error(error);
        });
    },
    [sendPasswordResetEmail]
  );

  return (
    <View style={styles.container}>
      <View style={styles.formPage}>
        <Text style={styles.title}>Esqueci minha senha</Text>
        <Text style={styles.description}>
          Digite seu email para receber um link para redefinição de senha
        </Text>
        <View style={styles.formBox}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => forgotHandler(email)}
            disabled={isLoading}>
            <Text style={styles.buttonLabel}>
              {isLoading ? 'Enviando...' : 'Enviar e-mail de recuperação'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.redirLink}
          onPress={() => navigation.navigate('Login')}>
          <Text>{`Deseja fazer login? Clique aqui`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}></View>
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

export default ForgotPassword;
