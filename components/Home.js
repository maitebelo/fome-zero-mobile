import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Menu from './Menu';
import HistoricoPedidos from './HistoricoPedidos';
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (  
      <ScrollView>
      <View style={styles.hero}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE2ODA0MTg0MTY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600' }}
          style={styles.heroImage}
        >
          <View style={styles.heroMask}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Delivery de Comida</Text>
              <Text style={styles.heroText}>Faça seu pedido agora mesmo e receba em casa!</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}  onPress={() => navigation.navigate("Menu")}>Ver Cardápio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <Menu />
      <HistoricoPedidos />
      </ScrollView> 
  );
};

const styles = StyleSheet.create({
  hero: {
    height: 500, 
  },
  heroImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  heroMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontSize: 40,
    marginVertical: 0,
    color: '#fff',
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroText: {
    fontSize: 20, 
    color: '#fff',
    marginBottom: 20,
    padding: 8,
    fontFamily: 'Noto Sans',
    textAlign: 'center', 
  },
  button: {
    backgroundColor: '#4a9655', 
    margin: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, 
  },
  buttonText: {  
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;