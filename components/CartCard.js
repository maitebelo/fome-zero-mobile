import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {
  myCart,
  incrementProduct,
  decrementProduct,
  removeProduct,
} from '../@core/cartGateway';
import ToastManager, { Toast } from 'toastify-react-native';
import { currentUser } from '../@core/authenticateGateway';

const CartCard = ({ item, setRefresh }) => {

  const removeProductHandler = React.useCallback(() => {
    removeProduct(item?.id, currentUser()?._v)
      .then(() => {
        setRefresh(true);
        
        Toast.success('Removido!');
      })
      .catch(() => {
        Toast.error('Falhou')
      });
  }, [incrementProduct, item]);

  const incrementProductHandler = React.useCallback(() => {
    incrementProduct(item?.id, currentUser()?._v)
      .then(() => {
        setRefresh(true);
        Toast.success('Sucesso!')
      })
      .catch(() => {
        Toast.error('Falhou')
      });
  }, [incrementProduct, item]);

  const decrementProductHandler = React.useCallback(() => {
    decrementProduct(item?.id, currentUser()?._v)
      .then(() => {
        setRefresh(true);
        Toast.success('Sucesso!')
      })
      .catch(() => {
        Toast.error('Falhou')
      });
  }, [decrementProduct, item]);

  return (
    <View style={styles.productContainer}>
      
      <Image source={{ uri: item?.image }} style={styles.productImage} />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>{item?.name}</Text>
        <TouchableOpacity onPress={removeProductHandler}>
          <Text style={styles.quantityButton}>Remover</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.productPriceContainer}>
        <Text style={styles.itemPrice}>R$ {(item?.price * item?.quantity)?.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementProductHandler} style={{ display: item.quantity <= 1 ? "none" : "inherit"}}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={incrementProductHandler}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  productContainer: {
    marginBottom: 16,
    textAlign: 'center',
    width: '80%',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    textAlign: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    margin: 0,
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#c6c6c6',
  },
  quantityButton: {
    fontSize: 18,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 5,
    marginRight: 'auto',
  },
  quantity: {
    marginHorizontal: 8,
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-around',
    
  },
});

export default CartCard;
