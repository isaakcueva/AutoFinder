import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FeedbackScreen from "./DynamicMesaggeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditProfileScreen: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [email, setEmail] = useState(""); // Fijo, no editable
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [feedback, setFeedback] = useState({
    visible: false,
    title: "",
    message: "",
    iconName: "info",
    iconColor: "gray",
  });

  const backgroundImage =
    "https://img.freepik.com/fotos-premium/papel-tapiz-automoviles-vehiculo-negro_53876-213196.jpg?w=360";

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setUsername(user[0]?.usuario_nombre || "");
          setBirthDate(user[0]?.usuario_fec_nac || null);
          setEmail(user[0]?.usuario_email || "");
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    };

    loadUserData();
  }, []);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const confirmDate = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setBirthDate(formattedDate);
    setShowDatePicker(false); // Cierra el picker
  };

  const validateInputs = () => {
    if (!username.trim()) {
      showFeedback("Error", "El nombre de usuario no puede estar vacío.", "error", "red");
      return false;
    }

    if (password.length > 0 && password.length < 6) {
      showFeedback(
        "Error",
        "La contraseña debe tener al menos 6 caracteres si desea cambiarla.",
        "error",
        "red"
      );
      return false;
    }

    if (password !== confirmPassword) {
      showFeedback("Error", "Las contraseñas no coinciden.", "error", "red");
      return false;
    }

    if (!birthDate) {
      showFeedback("Error", "Por favor, selecciona tu fecha de nacimiento.", "error", "red");
      return false;
    }

    return true;
  };

  const showFeedback = (title: string, message: string, iconName: string, iconColor: string) => {
    setFeedback({
      visible: true,
      title,
      message,
      iconName,
      iconColor,
    });
  };

  const handleEdit = async () => {
    console.log("Editando usuario...");
    if (!validateInputs()) return;

    try {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      const response = await axios.post(
        "https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af005",
        {
          p_accion: "Modificar",
          p_usuario_id: user[0]?.usuario_id, // ID del usuario desde AsyncStorage
          p_usuario_nombre: username,
          p_usuario_fec_nac: birthDate,
          p_usuario_email: email, // Campo fijo
          p_usuario_contraseña: password || null, // Solo enviar si desea cambiarla
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

      const resultado = response.data.result || response.data[0]?.result;
      if (resultado  === "Se ha registrado los cambios exitosamente.") {
        showFeedback("Éxito", resultado, "check-circle", "green");

        setTimeout(async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("isLoggedIn");
          navigation.navigate("Login");
        }, 3000);
      } else {
        showFeedback("Error", resultado, "error", "red");
      }
    } catch (error: any) {
      console.error("Error al actualizar el usuario:", error);
      showFeedback("Error", "Error al actualizar el usuario. Intenta nuevamente.", "error", "red");
    }
  };

  const closeFeedbackModal = () => {
    setFeedback({ ...feedback, visible: false });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: backgroundImage }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Home")}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Información</Text>
          </ImageBackground>

          <View style={styles.registerCard}>
            <Text style={styles.registerTitle}>Editar Información</Text>

            {/* Username */}
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              placeholderTextColor="#555"
              value={username}
              onChangeText={setUsername}
            />

           {/* Birth Date */}
            <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={[styles.input, styles.dateInput]}>
                <Text style={{ color: birthDate ? "#000" : "#aaa", fontSize: 16 }}>
                    {birthDate || "Selecciona tu fecha de nacimiento"}
                </Text>
                </View>
            </TouchableOpacity>
            </View>

            {/* Email (no editable) */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Correo Electrónico</Text>
              <Text style={[styles.input, styles.readOnlyInput]}>{email}</Text>
            </View>

            {/* Password */}
            <TextInput
              style={styles.input}
              placeholder="Nueva Contraseña (opcional)"
              placeholderTextColor="#555"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Confirm Password */}
            <TextInput
              style={styles.input}
              placeholder="Confirmar Nueva Contraseña"
              placeholderTextColor="#555"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleEdit}>
              <Text style={styles.registerButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <Modal transparent animationType="slide">
                <View style={styles.modalContainer}>
                <View style={styles.datePickerContainer}>
                    <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                        if (date) {
                        setSelectedDate(date);
                        setBirthDate(date.toISOString().split("T")[0]); // Actualiza el estado con el formato correcto
                        setShowDatePicker(false); // Cierra el DatePicker
                        } else {
                        setShowDatePicker(false); // Cierra el DatePicker si se cancela
                        }
                    }}
                    />
                </View>
                </View>
            </Modal>
            )}

          <FeedbackScreen
            title={feedback.title}
            message={feedback.message}
            iconName={feedback.iconName as "check-circle" | "error"}
            iconColor={feedback.iconColor}
            visible={feedback.visible}
            onClose={closeFeedbackModal}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    imageBackground: {
      width: '100%',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      borderBottomLeftRadius: 75,
      borderBottomRightRadius: 75,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: -300,
    },
    registerCard: {
      flex: 1,
      marginTop: -380,
      backgroundColor: '#f9f9f9',
      borderRadius: 20,
      padding: 30,
      marginHorizontal: 20,
      elevation: 5,
      alignItems: 'center',
    },
    registerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
    },
    registerSubtitle: {
      fontSize: 14,
      color: '#555',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 20,
      fontSize: 16,
      color: '#000',
    },
    fieldContainer: {
      width: '100%',
      marginBottom: 15,
    },
    fieldLabel: {
      fontSize: 14,
      color: '#555',
      marginBottom: 5,
    },
    dateInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    registerButton: {
      backgroundColor: '#000',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginTop: 10,
    },
    readOnlyInput: {
      backgroundColor: '#e0e0e0',
      color: '#555',
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginLink: {
      color: '#555',
      fontSize: 14,
      marginTop: 20,
      textDecorationLine: 'underline',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    datePickerContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      color: '#000',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 10,
      padding: 10,
      borderRadius: 10,
    },
    
    
  });

export default EditProfileScreen;
