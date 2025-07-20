import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeedbackScreen from './DynamicMesaggeScreen';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({
    visible: false,
    title: '',
    message: '',
    iconName: 'info',
    iconColor: 'gray',
  });

  const backgroundImage =
    'https://img.freepik.com/fotos-premium/papel-tapiz-automoviles-vehiculo-negro_53876-213196.jpg?w=360';

  const handleLogin = async () => {
    console.log(username, password);

    try {
      const response = await axios.post(
        'https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af005',
        {
          p_accion: 'Validar',
          p_usuario_id: null,
          p_usuario_nombre: null,
          p_usuario_fec_nac: null,
          p_usuario_email: username,
          p_usuario_contraseña: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTE5OTMzMCwiZXhwIjoyMDQ2Nzc1MzMwfQ.r_vFEZsQkkKT8dCAkDzuusN_CxesMkEs2KRzlxx-Z4M',
          },
        }
      );

      if (response.data[0].result === 'Credenciales válidas.') {
        const userData = response.data;

        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');

        setFeedback({
          visible: true,
          title: 'AutoFinder',
          message: 'Sesión Iniciada con éxito',
          iconName: 'check-circle',
          iconColor: 'green',
        });

        setTimeout(() => {
          setFeedback({ ...feedback, visible: false });
          navigation.navigate('Home');
        }, 3000);
      } else if (username === '' || password === '') {
        setFeedback({
          visible: true,
          title: 'AutoFinder',
          message: 'No se ha ingresado Usuario ni Contraseña',
          iconName: 'error',
          iconColor: 'red',
        });
      } else {
        setFeedback({
          visible: true,
          title: 'AutoFinder',
          message: 'Usuario o Contraseña Incorrecta',
          iconName: 'error',
          iconColor: 'red',
        });
      }
    } catch (error: any) {
      console.error('Error durante el login:', error);

      setFeedback({
        visible: true,
        title: 'AutoFinder',
        message:
          error.response?.data?.message ||
          'Hubo un error de conexión. Intenta de nuevo.',
        iconName: 'error',
        iconColor: 'red',
      });
    }
  };

  const closeModal = () => {
    setFeedback({ ...feedback, visible: false });
  };

  const handleGoBack = () => {
    navigation.navigate('Home'); // Redirect to Home screen
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>AutoFinder</Text>
      </ImageBackground>

      <View style={styles.loginCard}>
        <Text style={styles.welcomeText}>Bienvenido</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo registrado"
          placeholderTextColor="#555"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>

      <FeedbackScreen
        title={feedback.title}
        message={feedback.message}
        iconName={feedback.iconName as 'check-circle' | 'error'}
        iconColor={feedback.iconColor}
        visible={feedback.visible}
        onClose={closeModal}
      />
    </View>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -250,
  },
  loginCard: {
    flex: 1,
    marginTop: -275,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    elevation: 5,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#555',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
