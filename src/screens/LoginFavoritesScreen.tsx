import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FooterMenuComponent from "../components/ButtomMenu";
import { useNavigation } from "@react-navigation/native";

const backgroundImage =
  "https://i.pinimg.com/736x/29/a8/e6/29a8e66fbe1c16bb09cd60b6086af514.jpg";

const LoginView: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(true);

  // Nueva función para verificar favoritos
  const checkFavorites = async (userId: string) => {
    try {
      // Realiza la petición a la API
      const response = await axios.post(
        "https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af002",
        {
          p_accion: "Ver",
          p_usuario_id: userId,
          p_carro_id: null,
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
      await AsyncStorage.setItem('FavoritesCars', JSON.stringify(response.data));
      // Si hay datos en la respuesta, redirigir a la pantalla de favoritos
      if (response.data && response.data.length > 0) {
        navigation.navigate("ShowFavorites");
        console.log (response.data);
      } else {
        // Si no hay datos, redirigir a la pantalla de favoritos vacíos
        navigation.navigate("EmptyFavorites");
      }
    } catch (error) {
      console.error("Error al verificar favoritos:", error);
      navigation.navigate("EmptyFavorites"); // Redirigir a favoritos vacíos en caso de error
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Obtener el estado de inicio de sesión desde AsyncStorage
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        const userData = await AsyncStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;

        if (loggedIn === "true" && user && user[0]?.usuario_id) {
          // Verificar si tiene favoritos
          await checkFavorites(user[0].usuario_id);
        } else {
          // Si no está logueado, mostrar la pantalla de inicio de sesión
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al verificar el estado de sesión:", error);
        setIsLoading(false); // Mostrar la pantalla de inicio de sesión en caso de error
      }
    };

    checkLoginStatus();
  }, [navigation]);

  if (isLoading) {
    // Mientras se verifica el estado de sesión, mostrar un indicador de carga
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        {/* Botón de retroceso */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo.png")} style={styles.logoImage} />
        </View>

        {/* Texto de bienvenida */}
        <Text style={styles.welcomeText}>
          Inicia sesión para visualizar tus vehículos favoritos
        </Text>

        {/* Botón de inicio de sesión */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Menú inferior */}
      <View style={styles.menuContainer}>
        <FooterMenuComponent />
      </View>
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
  logoContainer: {
    marginTop: -100,
    marginBottom: 20,
    alignItems: "center",
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  loginButton: {
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
  loginButtonText: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
});

export default LoginView;
