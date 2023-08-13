import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, Dimensions, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Toast } from 'toastify-react-native';

const RelatarProblema = ({ route }) => {
  const orderId = route?.params?.orderId;
  const [pedido, setPedido] = useState('');
  const [problema, setProblema] = useState('');

  const handlePedidoChange = (text) => {
    setPedido(text);
  };

  const handleProblemaChange = (text) => {
    setProblema(text);
  };

  const handleSubmit = () => {
    let message = ''
    if(orderId) message += `Olá, tive um problema com o pedido ${orderId}! \n`

    message += problema

    Linking.openURL(
          `whatsapp://send?phone=5511999999999&text=${message}`
        ).catch((error) => {
          console.log(error);
          Toast.error('Erro');
        }).then(() => {
          Toast.sucess("Enviado!")
        });
  };

  return (
    <View style={styles.menu}>
      <Text style={styles.header}>Relatar um problema com o pedido</Text>
        <Text style={styles.paragraph}>
          Digite como foi sua experiência e enviaremos ao restaurante
        </Text>
      <TextInput
        style={styles.inputText}
        placeholder="Descreva o problema encontrado"
        value={problema}
        onChangeText={handleProblemaChange}
        multiline
        numberOfLines={10}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>       Enviar       </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create ({
    button: {
        display: 'flex',
    padding: 10,
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'none',
    color: '#fff',
    backgroundColor: '#4a9655',
    borderRadius: 5,
    transitionProperty: 'background-color',
    transitionDuration: '0.3s',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputText: {
    marginBottom: 10,
    backgroundColor: "#fff",
    minHeight: "30%",
    minWidth: "90%"
  }, 
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    
  },  
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20
  }, 
});

export default RelatarProblema;
