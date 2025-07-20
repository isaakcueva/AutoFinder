import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FeedbackScreen from './DynamicMesaggeScreen';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [feedback, setFeedback] = useState({
    visible: false,
    title: '',
    message: '',
    iconName: 'info',
    iconColor: 'gray',
  });

  const backgroundImage =
    'https://img.freepik.com/fotos-premium/papel-tapiz-automoviles-vehiculo-negro_53876-213196.jpg?w=360';

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const confirmDate = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Convierte a formato "YYYY-MM-DD"
    setBirthDate(formattedDate);
    setShowDatePicker(false); // Cierra el picker
  };
  

  const validateInputs = () => {
    if (!username.trim()) {
      showFeedback('Error', 'El nombre de usuario no puede estar vacío.', 'error', 'red');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Error', 'Por favor, ingresa un correo electrónico válido.', 'error', 'red');
      return false;
    }

    if (password.length < 6) {
      showFeedback('Error', 'La contraseña debe tener al menos 6 caracteres.', 'error', 'red');
      return false;
    }

    if (password !== confirmPassword) {
      showFeedback('Error', 'Las contraseñas no coinciden.', 'error', 'red');
      return false;
    }

    if (!birthDate) {
      showFeedback('Error', 'Por favor, selecciona tu fecha de nacimiento.', 'error', 'red');
      return false;
    }
    const currentDate = new Date();
    const year2020 = new Date('2020-12-31');

    if (selectedDate > currentDate) {
      showFeedback('Error', 'La fecha de nacimiento no puede ser mayor a la fecha actual.', 'error', 'red');
      return false;
    }

    if (selectedDate > year2020) {
      showFeedback('Error', 'La fecha de nacimiento no puede ser mayor al año 2020.', 'error', 'red');
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

  const handleRegister = async () => {
    console.log('Registrando usuario...');
    if (!validateInputs()) return; // Validación previa
    console.log('Imputs Validados...');
    console.log("Valores:" + username+" " + email + " "+password + " "+birthDate);
    try {
      const response = await axios.post(
        'https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af005',
        {
          p_accion: 'Crear',
          p_usuario_id: null,
          p_usuario_nombre: username,
          p_usuario_fec_nac: birthDate,
          p_usuario_email: email,
          p_usuario_contraseña: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M',
        },
        }
      );
  
      // Manejo de la respuesta del servidor

      console.log('Response data:', response.data);

      console.log('Response completa:', JSON.stringify(response, null, 2));
      console.log('Response data:', JSON.stringify(response.data, null, 2));

      const resultado = response.data.result || response.data[0]?.result;
      console.log('Resultado del registro:', resultado);

      if (resultado === 'Usuario creado correctamente.') {
        // Mostrar mensaje de éxito
        showFeedback('Éxito', resultado, 'check-circle', 'green');
  
        // Redirigir al Login después de 3 segundos
        setTimeout(() => {
          setFeedback({ ...feedback, visible: false });
          navigation.navigate('Login'); // Redirige al LoginScreen
        }, 3000);
      } else {
        // Mostrar mensaje de error si el correo ya existe
        showFeedback('Error', resultado, 'error', 'red');
      }
    } catch (error: any) {
      console.error('Error en el registro:', error);
  
      // Mensaje genérico en caso de fallo en la conexión o error inesperado
      showFeedback(
        'Error',
        'Error en el registro. Intenta nuevamente.',
        'error',
        'red'
      );
    }
  };
  

  const closeFeedbackModal = () => {
    setFeedback({ ...feedback, visible: false });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Background Image */}
          <ImageBackground
            source={{ uri: backgroundImage }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>AutoFinder</Text>
          </ImageBackground>

          {/* Main Content */}
          <View style={styles.registerCard}>
            <Text style={styles.registerTitle}>Regístrate</Text>
            <Text style={styles.registerSubtitle}>Ingresa los siguientes campos:</Text>

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
                  <Text style={{ color: birthDate ? '#000' : '#aaa', fontSize: 16 }}>
                    {birthDate || 'Selecciona tu fecha de nacimiento'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#555"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Confirm Password */}
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#555"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>¿Ya tienes una cuenta?</Text>
            </TouchableOpacity>
          </View>

          {/* Modal for DatePicker */}
          {showDatePicker && (
            <Modal transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      if (event.type === 'set' && date) {
                        const formattedDate = date.toISOString().split('T')[0]; // Formatea la fecha a "YYYY-MM-DD"
                        setBirthDate(formattedDate);
                        setSelectedDate(date);
                        setShowDatePicker(false); // Cierra el modal automáticamente
                      } else if (event.type === 'dismissed') {
                        setShowDatePicker(false); // Cierra el modal si se cancela
                      }
                    }}
                    themeVariant="light"
                  />
                </View>
              </View>
            </Modal>
          )}


          {/* FeedbackScreen Modal */}
          <FeedbackScreen
            title={feedback.title}
            message={feedback.message}
            iconName={feedback.iconName as 'check-circle' | 'error'}
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

export default RegisterScreen;
