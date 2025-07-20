// src/context/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Car {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
    url: string;
    dimension: {
        largo: number;
        alto: number;
        ancho: number;
        peso: number;
        capacidad_cajuela: number;
        neumaticos: { valor: number; detalle?: string };
    };
    seguridad: {
        airbag: { incluye: string; detalle?: string };
        frenos: { tipo: string; detalle?: string };
        cinturones: { incluye: string; detalle?: string };
    };
    rendimiento: {
        combustible: { tipo: string; detalle?: string };
        cilindraje: { valor: number; detalle?: string };
        potencia: { valor: number; detalle?: string };
        velocidad_maxima: { valor: number; detalle?: string };
    };
    confort: {
        aire: { tipo: string; detalle?: string };
        asientos?: { tipo: string | null; detalle?: string | null };
        iluminacion?: { tipo: string | null; detalle?: string | null };
        climatizacion?: { tipo: string | null; detalle?: string | null };
        techo?: { tipo: string | null; detalle?: string | null };
        sonido?: { tipo: string | null; detalle?: string | null };
        espacio_piernas?: { tipo: string | null };
    };
    tipo_consumo: {
        descripcion: string;
    };
    tecnologia: {
        pantalla: { tipo: string; detalle?: string };
        sonido: { tipo: string; detalle?: string };
        cargador_inalambrico: { incluye: string; detalle?: string };
        asistencia_estacionamiento: { incluye: string; detalle?: string };
        conectividad: { tipo: string; detalle?: string };
        entrada_sin_llave: { incluye: string; detalle?: string };
        asistencia_conduccion: { tipo: string; detalle?: string };
        control_remoto: { incluye: string; detalle?: string };
    };
}

// Define el tipo del contexto
interface AppContextType {
    autos: Car[];
    fetchAutos: () => void;
    selectedCars: Car[];
    setSelectedCars: (cars: Car[]) => void;
    favorites: Car[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider para el contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [autos, setAutos] = useState<Car[]>([]);
    const [selectedCars, setSelectedCars] = useState<Car[]>([]);
    const [favorites, setFavorites] = useState<Car[]>([]);
    const [selectedCategory, setSelectedCategoryState] = useState<string>('');

    // Función para actualizar selectedCategory y loggear el cambio
    const setSelectedCategory = (category: string) => {
        console.log(`Setting selectedCategory to: ${category}`);
        setSelectedCategoryState(category);
    };

    // Nueva función de fetch con URL y encabezados actualizados
    const fetchAutos = async () => {
        try {
          // Cargar datos de AsyncStorage
          const storedData = await AsyncStorage.getItem("selectedCars");
      
          if (storedData) {
            const { topCar, bottomCar } = JSON.parse(storedData);
      
            if (!topCar || !bottomCar) {
              console.warn("Faltan autos seleccionados para comparar.");
              return;
            }
      
            // Realizar la solicitud con los IDs extraídos de AsyncStorage
            const response = await axios.get(
              `https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af001?car_id1=${topCar.id}&car_id2=${bottomCar.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
                  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
                },
              }
            );
      
            // Procesar la respuesta de la API
            if (response.data) {
              const carsData = response.data.map((car: any) => ({
                id: car.carro_id,
                nombre: car.carro_nombre,
                precio: car.carro_precio,
                tipo: car.carro_tipo,
                url: car.carro_img,
                marca: {
                  nombre: car.marca_nombre,
                  origen: car.marca_origen,
                },
                dimension: {
                  largo: car.dimension_largo,
                  alto: car.dimension_alto,
                  ancho: car.dimension_ancho,
                  peso: car.dimension_peso,
                  capacidad_cajuela: car.dimension_capacidad_cajuela,
                  neumaticos: {
                    valor: car.dimension_neumaticos,
                    detalle: car.dimension_neumaticos_des || undefined,
                  },
                },
                seguridad: {
                  airbag: {
                    incluye: car.seguridad_airbag,
                    detalle: car.seguridad_airbag_des || undefined,
                  },
                  frenos: {
                    tipo: car.seguridad_frenos,
                    detalle: car.seguridad_frenos_des || undefined,
                  },
                  cinturones: {
                    incluye: car.seguridad_cinturones,
                    detalle: car.seguridad_cinturones_des || undefined,
                  },
                },
                rendimiento: {
                  combustible: {
                    tipo: car.rendimiento_combustible,
                    detalle: car.rendimiento_combustible_des || undefined,
                  },
                  cilindraje: {
                    valor: car.rendimiento_cilindraje,
                    detalle: car.rendimiento_cilindraje_des || undefined,
                  },
                  potencia: {
                    valor: car.rendimiento_potencia,
                    detalle: car.rendimiento_potencia_des || undefined,
                  },
                  velocidad_maxima: {
                    valor: car.rendimiento_vel_max,
                    detalle: car.rendimiento_vel_max_des || undefined,
                  },
                },
                confort: {
                  aire: {
                    tipo: car.confort_aire,
                    detalle: car.confort_aire_des || undefined,
                  },
                  asientos: {
                    tipo: car.confort_asientos,
                    detalle: car.confort_asientos_des || undefined,
                  },
                  iluminacion: {
                    tipo: car.confort_iluminacion,
                    detalle: car.confort_iluminacion_des || undefined,
                  },
                  climatizacion: {
                    tipo: car.confort_climatizacion,
                    detalle: car.confort_climatizacion_des || undefined,
                  },
                  techo: {
                    tipo: car.confort_techo,
                    detalle: car.confort_techo_des || undefined,
                  },
                  sonido: {
                    tipo: car.confort_sonido,
                    detalle: car.confort_sonido_des || undefined,
                  },
                  espacio_piernas: { tipo: car.confort_espacio_piernas },
                },
                tipo_consumo: {
                  descripcion: car.tipoconsumo_descripcion,
                },
                tecnologia: {
                  pantalla: {
                    tipo: car.tecnologia_pantalla,
                    detalle: car.tecnologia_pantalla_des || undefined,
                  },
                  sonido: {
                    tipo: car.tecnologia_sonido,
                    detalle: car.tecnologia_sonido_des || undefined,
                  },
                  cargador_inalambrico: {
                    incluye: car.tecnologia_cargador_inalambrico,
                    detalle: car.tecnologia_cargador_inalambrico_des || undefined,
                  },
                  asistencia_estacionamiento: {
                    incluye: car.tecnologia_asistencia_estacionamiento,
                    detalle: car.tecnologia_asistencia_estacionamiento_des || undefined,
                  },
                  conectividad: {
                    tipo: car.tecnologia_conectividad,
                    detalle: car.tecnologia_conectividad_des || undefined,
                  },
                  entrada_sin_llave: {
                    incluye: car.tecnologia_entrada_sin_llave,
                    detalle: car.tecnologia_entrada_sin_llave_des || undefined,
                  },
                  asistencia_conduccion: {
                    tipo: car.tecnologia_asistencia_conduccion,
                    detalle: car.tecnologia_asistencia_conduccion_des || undefined,
                  },
                  control_remoto: {
                    incluye: car.tecnologia_control_remoto,
                    detalle: car.tecnologia_control_remoto_des || undefined,
                  },
                },
              }));
              setAutos(carsData);
            } else {
              console.warn("No se encontraron datos de comparación.");
            }
          } else {
            console.warn("No hay autos seleccionados en AsyncStorage.");
          }
        } catch (error) {
          console.error("Error al obtener datos de comparación:", error);
        }
      };
      

    return (
        <AppContext.Provider
            value={{
                autos,
                fetchAutos,
                selectedCars,
                setSelectedCars,
                favorites,
                selectedCategory,
                setSelectedCategory,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
