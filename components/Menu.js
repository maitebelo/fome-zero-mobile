import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeBaseProvider, Box,ToastAndroid } from 'native-base';
import MenuCard from './MenuCard'
import { list } from "../@core/productGateway"

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await list();
      setMenu(products);
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView>
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <View style={styles.menu}>
          <Text style={styles.header}>Cardápio</Text>
          {menu.length > 0 ? (
            <View style={styles.menuItems}>
              {menu.map((item) => (
                <MenuCard item={item} key={item?.id}/>
              ))}
            </View>
          ) : (
            <View style={styles.menuItems}>
              <Text>Carregando...</Text>
            </View>
          )}
        </View>
      </Box>
    </NativeBaseProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: { 
    display: "flex",
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center', 
    flexDirection: 'column', 
  },
  header: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItems: {
    flex: 1,
    display: 'flex',
    gap: 20,
    padding: 20,
    flexDirection: 'column', 
  }, 
});

export default Menu;
