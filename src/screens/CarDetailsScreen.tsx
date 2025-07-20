import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { height, width } = Dimensions.get("window"); // Obtener dimensiones de la pantalla

type RouteParams = {
  params: {
    carId: string;
  };
};

const CarDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const navigation = useNavigation<any>();
  const { carId } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);


  const [carDetails, setCarDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState({
    features: false,
    dimensions: false,
    performance: false,
    safety: false,
  });

  const toggleSection = (section: string) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Función para obtener los detalles del auto
  const fetchCarDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af001?car_id1=${carId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
          },
        }
      );
  
      if (response.data && response.data.length > 0) {
        setCarDetails(response.data[0]);
  
        // Verifica si este coche ya está en favoritos
        const storedFavorites = await AsyncStorage.getItem("FavoritesCars");
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites);
          const isFavoriteCar = favorites.some(
            (favorite: any) => favorite.carro_id === carId
          );
          setIsFavorite(isFavoriteCar);
        } else {
          setIsFavorite(false);
        }
      } else {
        setError("No se encontraron detalles para este auto.");
      }
    } catch (err) {
      setError("Ocurrió un error al obtener los detalles del auto.");
      console.error("Error fetching car details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFavorite = async (carId: number) => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const userId = user[0]?.usuario_id;
  
      if (!userId) {
        Alert.alert("Error", "No se pudo obtener el ID del usuario.");
        return;
      }
  
      await axios.post(
        "https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af002",
        {
          p_accion: "Crear",
          p_usuario_id: userId,
          p_carro_id: carId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
          },
        }
      );
  
      Alert.alert("Éxito", "Auto añadido a favoritos con éxito.");
    } catch (error) {
      console.error("Error añadiendo favorito:", error);
      Alert.alert("Error", "No se pudo añadir el auto a favoritos.");
    }
  };
  
  const handleFavoritePress = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  
      if (isLoggedIn === "true") {
        // Aquí solo gestionamos la parte de agregar el auto a favoritos
        await handleAddFavorite(carDetails.carro_id); 
        setIsFavorite(true); // Marcamos como favorito
        
      } else {
        Alert.alert("Error", "Debes iniciar sesión para agregar a favoritos.");
      }
    } catch (error) {
      console.error("Error manejando el favorito:", error);
    }
  };
  
  

  useEffect(() => {
    fetchCarDetails(); // Llama a la función cuando el componente se monta
  }, [carId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando detalles del auto...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }}
    contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require("../../assets/Background/DetailsBack.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ resizeMode: "cover", opacity: 0.5 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, marginTop: 65 }}>
              <TouchableOpacity
            style={{ position: 'absolute', left: 10 }}
            onPress={() => navigation.goBack()} // Implementación del goBack
          >
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{carDetails.carro_nombre}</Text>
        </View>

        {/* Imagen del auto */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={{ uri: carDetails.carro_img }} style={{ width: 225, height: 225, borderRadius: 20, borderWidth: 5, borderColor: '#fff', backgroundColor: '#fff' }} resizeMode="contain" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff', marginRight: 20 }}>${carDetails.carro_precio.toLocaleString()}</Text>
          <TouchableOpacity onPress={handleFavoritePress}>
  <Ionicons name="heart" size={32} color={isFavorite ? "red" : "gray"} />
</TouchableOpacity>

        </View>

        {/* NUEVA SECCIÓN: Dimensiones */}
        <View style={[styles.section, sections.dimensions && styles.sectionExpanded]}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('dimensions')}>
            <Text style={styles.sectionTitle}>Dimensiones</Text>
            <Ionicons name={sections.dimensions ? 'chevron-up' : 'chevron-down'} size={24} color="#fff" />
          </TouchableOpacity>

          {/* Línea que aparece solo cuando el cajón está abierto */}
          {sections.dimensions && <View style={styles.sectionUnderline} />}

          {sections.dimensions && (
            <View style={styles.sectionContent}>
              <View style={styles.row}>
                {/* Recuadro 1: Altura */}
                <View style={styles.subSection}>
                  <Text style={styles.subSectionTitle}>Altura</Text>
                  <MaterialCommunityIcons name="ruler" size={45} color="#fff" style={{ marginBottom: 8 }} />
                  <Text style={styles.subSectionText}>{carDetails.dimension_alto} m</Text>
                </View>

                {/* Recuadro 2: Peso */}
                <View style={styles.subSection}>
                  <Text style={styles.subSectionTitle}>Peso</Text>
                  <MaterialCommunityIcons name="weight-pound" size={45} color="#fff" style={{ marginBottom: 8 }} />
                  <Text style={styles.subSectionText}>{carDetails.dimension_peso} kg</Text>
                </View>
              </View>

              <View style={styles.row}>
                {/* Recuadro 3: Capacidad de la cajuela */}
                <View style={styles.subSection}>
                  <Text style={styles.subSectionTitle}>Cajuela</Text>
                  <MaterialCommunityIcons name="car-estate" size={45} color="#fff" style={{ marginBottom: 8 }} />
                  <Text style={styles.subSectionText}>{carDetails.dimension_capacidad_cajuela} L</Text>
                </View>

                {/* Recuadro 4: Neumáticos */}
                <View style={styles.subSection}>
                  <Text style={styles.subSectionTitle}>Neumáticos</Text>
                  <MaterialCommunityIcons name="circle-double" size={45} color="#fff" style={{ marginBottom: 8 }} />
                  <Text style={styles.subSectionText}>{carDetails.dimension_neumaticos} mm</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Sección Características */}
    <View style={[styles.section, sections.features && styles.sectionExpanded]}>
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('features')}>
        <Text style={styles.sectionTitle}>Características Internas</Text>
        <Ionicons name={sections.features ? 'chevron-up' : 'chevron-down'} size={24} color="#fff" />
      </TouchableOpacity>

      {/* Línea que aparece solo cuando el cajón está abierto */}
      {sections.features && <View style={styles.sectionUnderline} />}

      {sections.features && (
        <View style={styles.sectionContent}>
          <View style={styles.row}>
            {/* Recuadro 1: Aire Acondicionado */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>A/C</Text>
              <MaterialCommunityIcons name="car-defrost-front" size={45} color="#fff" style={{ marginBottom: 8 }} />
              <Text style={styles.subSectionText}>{carDetails.confort_aire_des || 'No disponible'}</Text>
            </View>

            {/* Recuadro 2: Pantalla */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>Pantalla</Text>
              <MaterialCommunityIcons name="tablet" size={45} color="#fff" style={{ marginBottom: 8 }} />
              <Text style={styles.subSectionText}>{carDetails.tecnologia_pantalla || 'No disponible'}</Text>
            </View>
          </View>
        
          {/* NUEVA FILA PARA LOS NUEVOS RECUADROS */}
          <View style={styles.row}>
            {/* Recuadro 3: Climatización */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>Asst. Parqueo</Text>
              <Ionicons name="videocam" size={45} color="#fff" style={{ marginBottom: 8 }} />
              <Text style={styles.subSectionText}>{carDetails.tecnologia_asistencia_estacionamiento || 'No disponible'}</Text>
            </View>

            {/* Recuadro 4: Sonido */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>Sonido</Text>
              <Ionicons name="musical-notes" size={45} color="#fff" style={{ marginBottom: 8 }} />
              <Text style={styles.subSectionText}>{carDetails.tecnologia_sonido || 'No disponible'}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
        {/* Sección Rendimiento */}
<View style={[styles.section, sections.performance && styles.sectionExpanded]}>
  <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('performance')}>
    <Text style={styles.sectionTitle}>Rendimiento</Text>
    <Ionicons name={sections.performance ? 'chevron-up' : 'chevron-down'} size={24} color="#fff" />
  </TouchableOpacity>

  {/* Línea que aparece solo cuando el cajón está abierto */}
  {sections.performance && <View style={styles.sectionUnderline} />}

  {sections.performance && (
    <View style={styles.sectionContent}>
      <View style={styles.row}>
        {/* Recuadro 1: Combustible */}
        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Combustible</Text>
          <MaterialCommunityIcons name="fuel" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.rendimiento_combustible|| 'No disponible'}</Text>
        </View>

        {/* Recuadro 2: Cilindraje */}
        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Cilindraje</Text>
          <MaterialCommunityIcons name="engine" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.rendimiento_cilindraje} cc</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Recuadro 3: Potencia */}
        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Potencia</Text>
          <MaterialCommunityIcons name="horse-variant-fast" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.rendimiento_potencia} HP</Text>
        </View>

        {/* Recuadro 4: Velocidad Máxima */}
        <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Velocidad Máxima</Text>
          <Ionicons name="speedometer" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.rendimiento_vel_max} km/h</Text>
        </View>
      </View>
    </View>
  )}
</View>

<View style={[styles.section, sections.safety && styles.sectionExpanded]}>
  <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('safety')}>
    <Text style={styles.sectionTitle}>Seguridad</Text>
    <Ionicons name={sections.safety ? 'chevron-up' : 'chevron-down'} size={24} color="#fff" />
  </TouchableOpacity>

  {/* Línea que aparece solo cuando el cajón está abierto */}
  {sections.safety && <View style={styles.sectionUnderline} />}

  {sections.safety && (
    <View style={styles.sectionContent}>
      <View style={styles.row}>
        {/* Recuadro 1: Airbag */}
        <View style={styles.securitySubSection}>
          <Text style={styles.subSectionTitle}>Airbag</Text>
          <MaterialCommunityIcons name="airbag" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.seguridad_airbag || 'No disponible'}</Text>
        </View>

        {/* Recuadro 2: Frenos */}
        <View style={styles.securitySubSection}>
          <Text style={styles.subSectionTitle}>Frenos</Text>
          <MaterialCommunityIcons name="car-brake-abs" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.seguridad_frenos || 'No disponible'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Recuadro 3: Cinturones */}
        <View style={styles.securitySubSection}>
          <Text style={styles.subSectionTitle}>Cinturones</Text>
          <Ionicons name="shield-checkmark" size={45} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={styles.subSectionText}>{carDetails.seguridad_cinturones || 'No disponible'}</Text>
        </View>
      </View>
    </View>
  )}
</View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 65,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  carImage: {
    width: 225,
    height: 225,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    marginVertical: 14,
    backgroundColor: "transparent",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 23,
  },
  sectionExpanded: {
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionContent: {
    padding: 16,
  },
  sectionUnderline: {
    borderBottomWidth: 2, // Grosor de la línea
    borderBottomColor: '#555', // Color de la línea
    marginHorizontal: 16, // Alinear con el contenido
    borderRadius: 4, // Bordes redondeados
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  subSection: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    width: '48%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  subSectionTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    
  },
  subSectionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  securitySubSection: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    width: '45%', // Dos recuadros por fila
    height: 200, // Ajusta si necesitas más espacio
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2, // Espaciado vertical uniforme
    marginHorizontal: 8, // Espaciado horizontal entre recuadros
  },
  sectionText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  sectionLabel: {
    fontWeight: "bold",
  },
});

export default CarDetailsScreen;
