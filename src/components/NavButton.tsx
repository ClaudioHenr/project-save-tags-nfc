import React from 'react';
import { Button } from 'react-native';

type NavButtonTypes = {
  title: string;
  onPress: () => void;
};

const NavButton = ({title, onPress}: NavButtonTypes) => {
  return <Button title={title} onPress={onPress} />;
};

export default NavButton;
