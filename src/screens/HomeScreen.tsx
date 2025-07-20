import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCarContext } from '../context/CarContext';
import FooterMenuComponent from '../components/ButtomMenu';
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeView: React.FC = () => {
  const [feedback, setFeedback] = useState({
    visible: false,
    title: '',
    message: '',
    iconName: 'info',
    iconColor: 'gray',
  });

  
  
  // Define las rutas y parámetros de la navegación
  
  type RootStackParamList = {
    Home: undefined; // No recibe parámetros
    Comparison: { topCar: CarData | null; bottomCar: CarData | null }; // 
    Search: undefined; // No recibe parámetros
    SelectCar: { selectedCarIndex: number; car?: CarData }; // Recibe el índice del marco que se está actualizando
  };

  // Configurar la navegación con tipado
  // Definir la interfaz para los datos del auto
interface CarData {
  id: string;
  name: string;
  price: string;
  image: string;
}
  const [topCar, setTopCar] = useState<CarData | null>(null);
  const [bottomCar, setBottomCar] = useState<CarData | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute(); // Asegúrate de llamar a useRoute() para obtener el objeto de ruta.
  
  // Cargar datos de AsyncStorage al montar
  useEffect(() => {
    loadSelectedCars();
  }, []);

  useEffect(() => {
    const params = route.params as { selectedCarIndex: number; car?: CarData };
  
    if (params?.car) {
      const { selectedCarIndex, car } = params;
  
      if (selectedCarIndex === 0) {
        console.log("Actualizando topCar:", car);
        setTopCar(car);
      } else if (selectedCarIndex === 1) {
        console.log("Actualizando bottomCar:", car);
        setBottomCar(car);
      }
  
      // Limpiar parámetros después de actualizar
      navigation.setParams({ selectedCarIndex: undefined, car: undefined });
    }
  }, [route.params]);
  
  

   // Guardar cambios en AsyncStorage solo cuando cambien `topCar` o `bottomCar`
   useEffect(() => {
    saveSelectedCars();
  }, [topCar, bottomCar]);

  const loadSelectedCars = async () => {
    try {
      const data = await AsyncStorage.getItem("selectedCars");
      if (data) {
        const { topCar: storedTopCar, bottomCar: storedBottomCar } = JSON.parse(data);
  
        console.log("Cargando carros desde AsyncStorage:", { storedTopCar, storedBottomCar });
  
        // Solo cargar carros si el marco está vacío
        if (!topCar && storedTopCar) {
          console.log("Cargando topCar desde AsyncStorage");
          setTopCar(storedTopCar);
        }
        if (!bottomCar && storedBottomCar) {
          console.log("Cargando bottomCar desde AsyncStorage");
          setBottomCar(storedBottomCar);
        }
      } else {
        console.log("No hay datos guardados en AsyncStorage.");
      }
    } catch (error) {
      console.error("Error al cargar datos desde AsyncStorage:", error);
    }
  };
  
  const handleCarRemove = (index: number) => {
    if (index === 0) {
      setTopCar(null);
    } else if (index === 1) {
      setBottomCar(null);
    }
  
    saveSelectedCars(); // Actualiza AsyncStorage
    setFeedback({
      visible: true,
      title: 'Carro eliminado',
      message: 'El carro ha sido eliminado del marco.',
      iconName: 'check-circle',
      iconColor: 'green',
    });
  };
  
  const closeFeedback = () => {
    setFeedback({ ...feedback, visible: false });
  };
   
  const saveSelectedCars = async () => {
    try {
      const updatedData = {
        topCar: topCar || null,
        bottomCar: bottomCar || null,
      };
  
      console.log("Guardando datos en AsyncStorage:", updatedData);
      await AsyncStorage.setItem("selectedCars", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error al guardar datos en AsyncStorage:", error);
    }
  };
  
  // Evento para manejar el tap en un marco (vaciar si ya tiene un carro)
const handleCarTap = (index: number) => {
  if (index === 0) {
    console.log("Vaciando topCar");
    setTopCar(null); // Vacía el marco superior
  } else if (index === 1) {
    console.log("Vaciando bottomCar");
    setBottomCar(null); // Vacía el marco inferior
  }
};

  
  
 
  // Imagen de fondo
  const backgroundImage =
    'https://i.pinimg.com/736x/29/a8/e6/29a8e66fbe1c16bb09cd60b6086af514.jpg';

  return (
    


    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bienvenido a AutoFinder</Text>
          <Text style={styles.subtitle}>Comienza a comparar</Text>
        </View>

        {/* Contenido Principal */}
        <View style={styles.mainContent}>

{/* Marco superior */}
<View style={styles.carFrame}>
  {topCar && (
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => handleCarRemove(0)}
    >
      <Text style={styles.removeButtonText}>X</Text>
    </TouchableOpacity>
  )}
  <TouchableOpacity
    onPress={() =>
      topCar
        ? null
        : navigation.navigate('SelectCar', { selectedCarIndex: 0 })
    }
    style={[styles.addCarBox, topCar && styles.carLoadedBox]}
  >
    {topCar ? (
      <View style={styles.carCard}>
        <Image source={{ uri: topCar.image }} style={styles.carImage} />
        <Text style={styles.carName}>{topCar.name}</Text>
        <Text style={styles.carPrice}>${topCar.price}</Text>
      </View>
    ) : (
      <Text style={styles.addCarText}>+</Text>
    )}
  </TouchableOpacity>
</View>
<Text style={styles.vsText}>VS</Text>
{/* Marco inferior */}
<View style={styles.carFrame}>
  {bottomCar && (
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => handleCarRemove(1)}
    >
      <Text style={styles.removeButtonText}>X</Text>
    </TouchableOpacity>
  )}
  <TouchableOpacity
    onPress={() =>
      bottomCar
        ? null
        : navigation.navigate('SelectCar', { selectedCarIndex: 1 })
    }
    style={[styles.addCarBox, bottomCar && styles.carLoadedBox]}
  >
    {bottomCar ? (
      <View style={styles.carCard}>
        <Image source={{ uri: bottomCar.image }} style={styles.carImage} />
        <Text style={styles.carName}>{bottomCar.name}</Text>
        <Text style={styles.carPrice}>${bottomCar.price}</Text>
      </View>
    ) : (
      <Text style={styles.addCarText}>+</Text>
    )}
  </TouchableOpacity>
</View>


<TouchableOpacity
  style={[
    styles.compareButton,
    !(topCar && bottomCar) && styles.compareButtonDisabled, // Aplica estilo si está deshabilitado
  ]}
  onPress={() => {
    if (topCar && bottomCar) {
      navigation.navigate('Comparison', { topCar, bottomCar });
    }
  }}
  disabled={!(topCar && bottomCar)} // Desactiva el botón si no están ambos marcos llenos
>
  <Text style={styles.compareButtonText}>COMPARAR</Text>
</TouchableOpacity>




        </View>

        {/* Menú Inferior */}
        <View style={styles.menuContainer}>
          <FooterMenuComponent />
        </View>




      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Mismos estilos que ya tienes
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  addCarBox: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  carLoadedBox: {
    borderWidth: 0, // Quita el borde si hay un carro cargado
    backgroundColor: 'transparent', // Elimina el fondo del marco
  },
  carCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    width: '100%', // Asegura que ocupe todo el espacio del marco
  },
  carImage: {
    width: '100%', // Ajusta dinámicamente al tamaño del contenedor
    height: 70,
    resizeMode: 'contain', // Mantiene las proporciones de la imagen
    marginBottom: 5,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flexShrink: 1, // Permite que el texto se ajuste dinámicamente
  },
  carPrice: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
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
  compareButton: {
    backgroundColor: '#fff', // Fondo blanco
    paddingVertical: 10, // Espaciado vertical
    paddingHorizontal: 20, // Espaciado horizontal
    borderRadius: 8, // Bordes redondeados
    alignItems: 'center', // Centrar texto horizontalmente
    justifyContent: 'center', // Centrar texto verticalmente
    shadowColor: '#000', // Sombra (opcional)
    shadowOffset: { width: 0, height: 2 }, // Offset de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 3, // Elevación para Android
    marginVertical: 15,
    marginBottom: 30,
  },
  compareButtonText: {
    color: '#000', // Texto negro
    fontSize: 16, // Tamaño de la letra
    fontWeight: 'bold', // Texto en negrita
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#706C78',
    marginTop: 5,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 0,
  },
  vsText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 20,
  },

  addCarText: {
    fontSize: 40,
    color: '#fff',
  },
  cardContainer: {
    backgroundColor: '#ccc',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: 250,
  },

  menuContainer: {
    width: '80%',
    bottom: 75, //75
  },

  carFrame: {
    position: 'relative', // Para posicionar el botón X
    marginBottom: 20, // Espaciado entre marcos
  },
  
  removeButton: {
    position: 'absolute',
    top: -10, // Ajusta la posición
    right: -10, // Ajusta la posición
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  
  removeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  compareButtonDisabled: {
    backgroundColor: '#ccc', // Color gris para indicar que está desactivado
    shadowOpacity: 0, // Elimina la sombra para deshabilitado
  },
  
  
});

export default HomeView;