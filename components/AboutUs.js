import React from "react";
import { View, Image, Text, Dimensions } from "react-native";
import { Box } from "native-base";

const windowWidth = Dimensions.get("window").width;

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>About Us</Text>
        <Text style={styles.paragraph}>
          O Fome Zero surgiu como uma solução inovadora para atender às necessidades dos consumidores e restaurantes em um mundo cada vez mais conectado. Desenvolvido como um MVP (Minimum Viable Product) para a disciplina de Projeto de Bloco do curso de Engenharia de Software do Instituto Infnet, o Fome Zero visa revolucionar a forma como os pedidos são feitos e atendidos. Nosso principal objetivo é proporcionar uma plataforma fácil de usar, onde os clientes possam explorar uma ampla variedade de opções gastronômicas e fazer seus pedidos de forma conveniente.  Junte-se a nós nessa jornada e faça parte dessa revolução culinária!
        </Text>
      </View>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-12860.jpg?w=2000' }}
        style={[styles.image, { width: windowWidth }]}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    height: 200,
    marginTop: 16,
  },
};

export default AboutUs;