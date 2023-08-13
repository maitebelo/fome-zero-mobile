import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Toast } from 'toastify-react-native';

import { currentUser } from '../@core/authenticateGateway';
import { myCart } from '../@core/cartGateway';
import { createOrder } from '../@core/orderGateway';
import CartCard from './CartCard';

const Carrinho = () => {
  const [cart, setCart] = React.useState([]);
  const [isntCart, setIsntCart] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const getCart = async () => {
    const cart = await myCart(currentUser()?._v);
    if (!cart) setIsntCart(true);
    return cart;
  };

  React.useEffect(() => {
    console.log(currentUser());
    if (!currentUser()?._v || currentUser()?._v === '') {
      Toast.error('Login Requerido');
      navigation.navigate('Login');
    }

    getCart().then((response) => {
      setCart(response);
    });
  }, []);

  React.useEffect(() => {
    if (refresh) {
      getCart().then((response) => {
        setCart(response);

        setRefresh(false);
      });
    }
  }, [refresh]);

  function sendOrderOnWhatsapp() {
    let totalPrice = 0;
    const products = cart?.products
      ?.map((item: any) => {
        totalPrice += item.price * item.quantity;
        return `${item.name} - ${item.quantity}x`;
      })
      .join('\n');

    const message = `Olá, gostaria de fazer o pedido: \n ${products}\n \n Total: R$ ${totalPrice?.toFixed(
      2
    )}`;

    createOrderHandler()
      .then(() => {
        Linking.openURL(
          `whatsapp://send?phone=5511999999999&text=${message}`
        ).catch((error) => {
          console.log(error);
          Toast.error('Erro');
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.error('Erro');
      });
  }

  const createOrderHandler = async () => {
    if (!cart?.products || cart?.products?.length === 0) {
      Toast.error('Nada para pedir');
      return;
    }

    await createOrder(cart?.products, currentUser()?._v);

    getCart().then((response) => {
      if (!response) {
        setIsntCart(true);
      }

      setCart(response);
    });
    Toast.success('Pedido criado');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Carrinho</Text>
        {cart ? (
          cart?.products?.length === 0 ? (
            <View style={styles.cartContainer}>
              <Text>Carrinho vazio</Text>
            </View>
          ) : (
            <View style={styles.cartContainer}>
              <View>
                {cart?.products?.map((item, index) => (
                  <CartCard item={item} key={index} setRefresh={setRefresh} />
                ))}
              </View>
              <TouchableOpacity
                onPress={() => sendOrderOnWhatsapp()}
                style={styles.sendOrderButton}>
                <Text style={styles.sendOrderButtonText}>Enviar pedido</Text>
              </TouchableOpacity>
            </View>
          )
        ) : isntCart ? (
          <View style={styles.emptyCartContainer}>
            <Text>Carrinho vazio</Text>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Carregando...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyCartContainer: {
    marginTop: 16,
    textAlign: 'center',
  },
  cartContainer: {
    marginTop: 16,
    width: 500,
    textAlign: 'center',
    marginLeft: 'auto',
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    padding: 20,
    flexDirection: 'column',
  },
  sendOrderButton: {
    marginTop: 16,
    paddingBottom: 10,
    backgroundColor: '#4a9655',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    textAlign: 'center',
    width: 310,
    marginLeft: 30,
  },
  sendOrderButtonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 16,
  },
});

export default Carrinho;
