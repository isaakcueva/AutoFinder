import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Comparison: undefined;
  Login: undefined;
  Register: undefined;
  Search: undefined;
  Favorites: undefined;
};

const FooterMenuComponent: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footerContainer}>
      {/* Botón de búsqueda */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('Search')}
      >
        <FontAwesome name="search" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Botón de comparación */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="compare-arrows" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Botón de favoritos */}
      <TouchableOpacity style={styles.iconButton}
        onPress={() => navigation.navigate('Favorites')}
          >
        <AntDesign name="heart" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4F4F4F',
    borderTopWidth: 1,
    borderTopColor: '#333',
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  iconButton: {
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FooterMenuComponent;