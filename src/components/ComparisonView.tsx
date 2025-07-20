import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import MenuComponent from '../components/MenuComponent';
import DimensionesContent from './Comparison/Dimensiones';
import ConfortContent from './Comparison/ConfortContent';
import TecnologiaContent from './Comparison/TechnologýContent';
import RendimientoContent from './Comparison/PerformanceContent';
import MotorContent from './Comparison/EngineContent';
import SeguridadContent from './Comparison/SecurityContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

const ComparisonView = () => {
  interface CarData {
    id: string;
    name: string;
    price: string;
    image: string;
  }
  type RootStackParamList = {
    Home: undefined;
    Comparison: { topCar: CarData | null; bottomCar: CarData | null }; // Acepta dos carros
    Search: undefined;
    SelectCar: { selectedCarIndex: number; car?: CarData };
  };
  const { fetchAutos, selectedCategory, autos } = useAppContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Use navigation for back functionality

  useEffect(() => {
    fetchAutos();
  }, []);

  const renderContent = () => {
    switch (selectedCategory) {
      case 'Dimensiones':
        return <DimensionesContent />;
      case 'Confort':
        return <ConfortContent />;
      case 'Tecnología':
        return <TecnologiaContent />;
      case 'Rendimiento':
        return <RendimientoContent />;
      case 'Motor':
        return <MotorContent />;
      case 'Seguridad':
        return <SeguridadContent />;
      default:
        return <Text>Selecciona una categoría del menú para ver detalles</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con flecha de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Navigate back to the previous screen
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Comparación de Vehículos</Text>
      </View>

      {/* Sección de fotos y descripciones de los autos */}
      <View style={styles.comparisonHeader}>
      {autos.length >= 2 ? (
  autos.slice(0, 2).map((auto, index) => (
    <View key={index} style={styles.autoCard}>
      <Image source={{ uri: auto.url }} style={styles.autoImage} />
      <Text style={[styles.autoName, { color: index === 0 ? 'purple' : 'red' }]}>{auto.nombre}</Text>
      <Text style={styles.autoPrice}>${auto.precio}</Text>
      <TouchableOpacity
      style={styles.editButton}
      onPress={async () => {
        try {
          // Obtén los autos seleccionados desde AsyncStorage
          const storedCars = await AsyncStorage.getItem('selectedCars');
          const parsedCars = storedCars ? JSON.parse(storedCars) : {};

          // Verifica si parsedCars tiene la estructura esperada
          if (typeof parsedCars !== 'object' || parsedCars === null) {
            console.error('El contenido de selectedCars no es un objeto válido:', parsedCars);
            return;
          }

          // Elimina el auto correspondiente
          const updatedCars = { ...parsedCars };
          if (updatedCars.topCar?.id === auto.id) {
            delete updatedCars.topCar; // Elimina el topCar si coincide
          } else if (updatedCars.bottomCar?.id === auto.id) {
            delete updatedCars.bottomCar; // Elimina el bottomCar si coincide
          } else {
            console.log('El auto no se encontró en topCar ni en bottomCar');
            return;
          }

          // Guarda el objeto actualizado en AsyncStorage
          await AsyncStorage.setItem('selectedCars', JSON.stringify(updatedCars));

          // Redirige al Home
          navigation.navigate('Home');
        } catch (error) {
          console.error('Error al eliminar el auto del AsyncStorage:', error);
        }
      }}
    >
      <Text style={styles.editButtonText}>Editar</Text>
    </TouchableOpacity>


    </View>
  ))
) : (
  <Text>No hay suficientes autos para comparar</Text>
)}

      </View>

      <View style={styles.mainContent}>
        {/* Menú fijo a la izquierda */}
        <View style={styles.menuContainer}>
          <MenuComponent />
        </View>

        {/* Contenido dinámico con scroll a la derecha */}
        <ScrollView style={styles.contentContainer}>
          {renderContent()}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row', // Align back button and text horizontally
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 15,
    marginTop: 45,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  autoCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    maxWidth: '45%',
    minHeight: 250, // Ensure the card has enough height
  },
  
  autoImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  autoName: {
    paddingTop: 1,
    paddingVertical: 20,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '90%', // Prevent text overflow

  },
  autoPrice: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#0056b3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Adjust width
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 250,
  },
  menuContainer: {
    width: '25%',
    marginTop: 45,
  },
  contentContainer: {
    flex: 1,
    marginTop: 15,
    paddingBottom: 400,
  },
});

export default ComparisonView;
