import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';

import { currentUser } from '../@core/authenticateGateway';
import { getProductById } from '../@core/productGateway';
import { listOrder } from '../@core/orderGateway';

export default function HistoryScreen() {
  const [orders, setOrders] = React.useState([]);
  const navigation = useNavigation();

  const getOrders = async () => {
    const order = await listOrder(currentUser()?._v);

    if (!order || order?.length === 0) {
      Toast.error('Sem pedidos');
    }

    return order;
  };

  React.useEffect(() => {
    console.log(currentUser());
    if (!currentUser()?._v || currentUser()?._v === '') {
      Toast.error('Login Requerido');
      navigation.navigate('Login');
    }

    getOrders().then((response) => {
      setOrders(response);
    });
  }, []);

  const handleReportProblem = (orderId) => {
    navigation.navigate('RelatarProblema', { orderId });
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Pedido #{item?.id}</Text>
      <Text>Itens:</Text>
      <FlatList
        data={item.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item?.name}</Text>}
      />
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => handleReportProblem(item?.id)}>
        <Text style={styles.reportButtonText}>Relatar Problema</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Pedidos</Text>
      <FlatList
        style={styles?.content}
        data={orders}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 31,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderCard: {
    marginBottom: 26,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    padding: 10,
  },
  reportButton: {
    backgroundColor: '#4a9655',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  reportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
