import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ToastAndroid } from 'react-native';
import { addProduct } from '../@core/cartGateway';
import { useNavigation } from "@react-navigation/native"; 

import ToastManager, { Toast } from 'toastify-react-native';
import { currentUser } from '../@core/authenticateGateway';

const MenuCard = ({ item }) => {
  const navigation = useNavigation();
  const [buttonLabel, setButtonLabel] = useState('Adicionar ao Carrinho');

  const addProductHandler = React.useCallback(() => {
    setButtonLabel('Adicionando...');

    if(!currentUser()?._v) {
      Toast.error('Login Requerido');
      navigation.navigate('Login');
    }

    addProduct(item?.id, 1, currentUser()?._v)
      .then(() => {
        setButtonLabel('Adicionado');

        setTimeout(() => {
          setButtonLabel('Adicionar ao Carrinho');
        }, 1500);
      })
      .catch(() => {
        setButtonLabel('Falhar ao adicionar');

        setTimeout(() => {
          setButtonLabel('Adicionar ao Carrinho');
        }, 1500);
      });
  }, [addProduct, item]);

  return (
    <View style={styles.menuItem} key={item.id}>
      <Image style={styles.itemImage} source={{ uri: item.image }} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>R$ {item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={addProductHandler}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItems: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20,
    flexDirection: 'column',
  },
  menuItem: {
    width: 330,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  itemImage: {
    margin: 'auto',
    display: 'block',
    width: 100,
    height: 'auto',
    textAlign: 'center',
  },
  itemName: {
    margin: 0,
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    margin: 0,
    padding: 10,
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    display: 'block',
    margin: 0,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#f2f2f2',
    textAlign: 'right',
  },
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default MenuCard;
