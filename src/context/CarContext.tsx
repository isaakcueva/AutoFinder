import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir la estructura de los datos del carro
interface CarData {
  id: string;
  name: string;
  price: string;
  image: string;
}

// Definir el contexto y sus funciones
interface CarContextType {
  topCar: CarData | null;
  bottomCar: CarData | null;
  setTopCar: (car: CarData | null) => void;
  setBottomCar: (car: CarData | null) => void;
  loadStoredCars: () => void;
}

// Crear el contexto
const CarContext = createContext<CarContextType | undefined>(undefined);

// Crear el proveedor del contexto
export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topCar, setTopCarState] = useState<CarData | null>(null);
  const [bottomCar, setBottomCarState] = useState<CarData | null>(null);

  // Guarda los datos en AsyncStorage y actualiza el estado
  const setTopCar = async (car: CarData | null) => {
    try {
      setTopCarState(car);
      if (car) {
        await AsyncStorage.setItem('topCar', JSON.stringify(car));
        console.log('Carro superior guardado en AsyncStorage:', car);
      } else {
        await AsyncStorage.removeItem('topCar'); // Eliminar si es null
        console.log('Carro superior eliminado de AsyncStorage');
      }
    } catch (error) {
      console.error('Error al guardar el carro superior en AsyncStorage:', error);
    }
  };

  const setBottomCar = async (car: CarData | null) => {
    try {
      setBottomCarState(car);
      if (car) {
        await AsyncStorage.setItem('bottomCar', JSON.stringify(car));
        console.log('Carro inferior guardado en AsyncStorage:', car);
      } else {
        await AsyncStorage.removeItem('bottomCar'); // Eliminar si es null
        console.log('Carro inferior eliminado de AsyncStorage');
      }
    } catch (error) {
      console.error('Error al guardar el carro inferior en AsyncStorage:', error);
    }
  };

  // Cargar los datos desde AsyncStorage
  const loadStoredCars = async () => {
    try {
      const storedTopCar = await AsyncStorage.getItem('topCar');
      const storedBottomCar = await AsyncStorage.getItem('bottomCar');
      const parsedTopCar = storedTopCar ? JSON.parse(storedTopCar) : null;
      const parsedBottomCar = storedBottomCar ? JSON.parse(storedBottomCar) : null;

      setTopCarState(parsedTopCar);
      setBottomCarState(parsedBottomCar);

      console.log('Datos cargados desde AsyncStorage:', {
        topCar: parsedTopCar,
        bottomCar: parsedBottomCar,
      });
    } catch (error) {
      console.error('Error al cargar los carros desde AsyncStorage:', error);
    }
  };

  // Cargar los datos automáticamente al iniciar la app
  useEffect(() => {
    loadStoredCars();
  }, []);

  // Guarda automáticamente los cambios en AsyncStorage
  useEffect(() => {
    const saveCarsToStorage = async () => {
      try {
        if (topCar) {
          await AsyncStorage.setItem('topCar', JSON.stringify(topCar));
        }
        if (bottomCar) {
          await AsyncStorage.setItem('bottomCar', JSON.stringify(bottomCar));
        }
        console.log('Autos actualizados en AsyncStorage:', { topCar, bottomCar });
      } catch (error) {
        console.error('Error al sincronizar autos con AsyncStorage:', error);
      }
    };

    saveCarsToStorage();
  }, [topCar, bottomCar]);

  return (
    <CarContext.Provider value={{ topCar, bottomCar, setTopCar, setBottomCar, loadStoredCars }}>
      {children}
    </CarContext.Provider>
  );
};

// Hook para usar el contexto
export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext debe usarse dentro de un CarProvider');
  }
  return context;
};