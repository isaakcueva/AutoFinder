import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FeedbackProps {
  title: string;
  message: string;
  iconName: 'home' | 'settings' | 'info' | 'error' | 'check-circle'; // Add all valid icon names here
  iconColor: string; // Icon color (e.g., green for success, red for error)
  visible: boolean; // Controls modal visibility
  onClose: () => void; // Callback to close the modal
}

const FeedbackScreen: React.FC<FeedbackProps> = ({
  title,
  message,
  iconName,
  iconColor,
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose} // Close modal on back button (Android)
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Feedback Title */}
          <Text style={styles.header}>{title}</Text>

          {/* Feedback Icon and Message */}
          <MaterialIcons name={iconName} size={60} color={iconColor} />
          <Text style={styles.message}>{message}</Text>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeedbackScreen;
