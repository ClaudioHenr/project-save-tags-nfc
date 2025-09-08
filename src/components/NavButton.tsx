import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NavButtonTypes = {
  title: string;
  onPress: () => void;
};

const NavButton = ({title, onPress}: NavButtonTypes) => {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1e40af',
    padding: 10,
    marginBottom: 10, // Espaçamento entre os botões
    width: 200, // Largura fixa para os botões, opcional
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 25,
  },
})

export default NavButton;
