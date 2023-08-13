import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box, Image, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      bg="#f1f1f1"
    >
      <Box flex={2} alignItems="center" justifyContent="center" paddingRight={5}>
        <Image
          source={require("../assets/logo.png")}
          alt="Logo"
          resizeMode="contain"
        />
      </Box>
      <Box
        flex={2}
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Feather name="home" size={18} color="#333" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Menu")}>
          <Feather name="menu" size={18} color="#333" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Carrinho")}>
          <Feather name="shopping-cart" size={18} color="#333" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("AboutUs")}>
          <Feather name="info" size={18} color="#333" />
        </Pressable>
      </Box>
    </Box>
  );
};

export default Header;