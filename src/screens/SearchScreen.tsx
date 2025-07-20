import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchView from '../components/Searchview';

const SearchScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SearchView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Esto asegura que el fondo sea consistente con el diseño de la app
  },
});

export default SearchScreen;