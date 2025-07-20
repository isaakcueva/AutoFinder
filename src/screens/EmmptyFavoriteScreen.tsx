import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FooterMenuComponent from "../components/ButtomMenu";
import FeedbackScreen from "./DynamicMesaggeScreen";

const backgroundImage =
  "https://i.pinimg.com/736x/29/a8/e6/29a8e66fbe1c16bb09cd60b6086af514.jpg";

const EmptyFavoritesView: React.FC = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState({
    visible: false,
    title: "",
    message: "",
    iconName: "check-circle",
    iconColor: "green",
  });

  const handleExplorePress = () => {
    navigation.navigate("Search");
  };

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleModifyInfo = () => {
    setModalVisible(false);
    navigation.navigate("EditProfile");
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

  const closeFeedbackModal = () => {
    setFeedback({ ...feedback, visible: false });
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Top Right Options Icon */}
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

        {/* Logo */}
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoImage}
        />

        {/* Alert Message */}
        <View style={styles.messageContainer}>
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/error--v1.png",
            }}
            style={styles.alertIcon}
          />
          <Text style={styles.messageText}>
            Al momento no cuentas con autos favoritos 🚨
          </Text>
        </View>

        {/* Explore Button */}
        <TouchableOpacity style={styles.exploreButton} onPress={handleExplorePress}>
          <Text style={styles.exploreButtonText}>Explorar autos ahora</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Footer Menu */}
      <View style={styles.menuContainer}>
        <FooterMenuComponent />
      </View>

      {/* Options Modal */}
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
      </Modal>

      {/* Feedback Modal */}
      <FeedbackScreen
        title={feedback.title}
        message={feedback.message}
        iconName={feedback.iconName as "check-circle" | "error"}
        iconColor={feedback.iconColor}
        visible={feedback.visible}
        onClose={closeFeedbackModal}
      />
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
    justifyContent: "center",
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
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 30,
  },
  messageContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
  },
  alertIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  exploreButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  exploreButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  menuContainer: {
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
});

export default EmptyFavoritesView;
