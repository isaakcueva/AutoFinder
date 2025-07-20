import React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectCar from '../components/SelectCar';

const SelectCarScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SelectCar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Esto asegura que el fondo sea consistente con el diseño de la app
  },
});

export default SelectCarScreen;