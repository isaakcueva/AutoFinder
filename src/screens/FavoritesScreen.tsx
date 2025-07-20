import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FooterMenuComponent from "../components/ButtomMenu";
import FeedbackScreen from "./DynamicMesaggeScreen";


const backgroundImage =
  "https://i.pinimg.com/736x/29/a8/e6/29a8e66fbe1c16bb09cd60b6086af514.jpg";

const FavoritesView: React.FC = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState({
    visible: false,
    title: "",
    message: "",
    iconName: "check-circle",
    iconColor: "green",
  });
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("FavoritesCars");
      if (storedFavorites) {
        const favoritesData = JSON.parse(storedFavorites);

        const carsPromises = favoritesData.map(async (car: any) => {
            const response = await axios.get(
                `https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af001?car_id1=${car.carro_id}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M",
                  },
                }
              );

          return {
            id: car.carro_id,
            name: response.data[0].carro_nombre,
            image: response.data[0].carro_img,
          };
        });

        const cars = await Promise.all(carsPromises);
        setFavorites(cars);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRemoveFavorite = async (carId: number) => {
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
          p_accion: "Eliminar",
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

      Alert.alert("Éxito", "Auto eliminado de favoritos con éxito.");
      navigation.navigate("Favorites");
      await fetchFavorites(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "No se pudo eliminar el auto de favoritos.");
    }
  };

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleModifyInfo = () => {
    setModalVisible(false);
    navigation.navigate("EditProfile");
  };
  const closeFeedbackModal = () => {
    setFeedback({ ...feedback, visible: false });
  };

  const handleLogout = async () => {
    try {
      setModalVisible(false);

      // Eliminar datos de AsyncStorage
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("isLoggedIn");

      // Mostrar mensaje dinámico
      setFeedback({
        visible: true,
        title: "Cierre de Sesión",
        message: "Sesión cerrada con éxito.",
        iconName: "check-circle",
        iconColor: "green",
      });

      // Redirigir a la pantalla de inicio de sesión después de 3 segundos
      setTimeout(() => {
        setFeedback({ ...feedback, visible: false });
        navigation.navigate("Login");
      }, 3000);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      // Mostrar mensaje de error en caso de fallo
      setFeedback({
        visible: true,
        title: "Error",
        message: "Hubo un problema al cerrar la sesión.",
        iconName: "error",
        iconColor: "red",
      });
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/menu.png",
            }}
            style={styles.optionsIcon}
          />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <Text style={styles.title}>Vehículos Favoritos</Text>

        {favorites.length > 0 ? (
          <ScrollView contentContainerStyle={styles.carGrid}>
            {favorites.map((car) => (
              <View
                key={car.id}
                style={[
                  styles.carCard,
                  favorites.length === 1 && styles.singleCarCard, // Adjust style for a single car
                ]}
              >
                <Image source={{ uri: car.image }} style={styles.carImage} />
                <Text style={styles.carName}>{car.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveFavorite(car.id)}
                >
                  <Text style={styles.deleteButtonText}>Eliminar favorito</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noFavoritesText}>
            No tienes favoritos aún. ¡Explora y añade tus favoritos!
          </Text>
        )}
      </ImageBackground>

      <View style={styles.footerContainer}>
        <FooterMenuComponent />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Opciones</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModifyInfo}>
              <Text style={styles.modalButtonText}>Modificar información</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Feedback Modal */}
      <FeedbackScreen
        title={feedback.title}
        message={feedback.message}
        iconName={feedback.iconName as "check-circle" | "error"}
        iconColor={feedback.iconColor}
        visible={feedback.visible}
        onClose={closeFeedbackModal}
      />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  optionsButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
  },
  optionsIcon: {
    width: 24,
    height: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  carGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  carCard: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: "45%",
    alignItems: "center",
    elevation: 5,
  },
  carImage: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    elevation: 2,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerContainer: {
    position: "absolute",
    bottom: 70,
    width: "85%",
    alignItems: "center",
    marginLeft: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeModalButton: {
    marginTop: 10,
  },
  closeModalButtonText: {
    color: "#000",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  noFavoritesText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
  },
  singleCarCard: {
    width: "70%", // Expand to fill more space if there's only one car
    height:"90%"
  }
});

export default FavoritesView;
