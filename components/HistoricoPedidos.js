import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HistoricoPedidos = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.historicopedidos}>
      <Text style={styles.heading}>Histórico de Pedidos</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HistoryScreen")}>
          <Text>Exibir Histórico de Pedidos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.btnproblema]} onPress={() => navigation.navigate("RelatarProblema")}>
          <Text>Relatar um Problema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historicopedidos: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#85c872",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  btnproblema: {
    backgroundColor: "#dc3545",
  },
});

export default HistoricoPedidos;
