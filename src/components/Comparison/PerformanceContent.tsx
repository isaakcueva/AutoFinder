import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const RendimientoCard = () => {
  const { autos } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({ title: '', detailAuto1: '', detailAuto2: '' });

  // Asegura que haya al menos dos autos para comparar
  if (autos.length < 2) {
    return <Text>No hay suficientes autos para comparar.</Text>;
  }

  // Función para mostrar detalles en el modal
  const showDetail = (title: string, detailAuto1: string, detailAuto2: string) => {
    setSelectedDetail({ title, detailAuto1, detailAuto2 });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Rendimiento</Text>

      {/* Card para Combustible */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Combustible</Text>
        <Text style={styles.description}>Tipo de combustible que usa el vehículo.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].rendimiento.combustible.tipo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].rendimiento.combustible.tipo}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles del Combustible',
              autos[0].rendimiento.combustible.detalle || 'Sin detalles',
              autos[1].rendimiento.combustible.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

        {/* Card para Cilindraje */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cilindraje</Text>
        <Text style={styles.description}>Volumen total de los cilindros del motor</Text>
        <View style={styles.chartContainerHorizontal}>
          <View style={styles.horizontalBarContainer}>
            <View style={[styles.horizontalBar, { width: `${autos[0].rendimiento.cilindraje.valor * 14}%`, backgroundColor: 'purple' }]} />
            <Text style={styles.barLabel}>{autos[0].rendimiento.cilindraje.valor} cc</Text>
          </View>
          <View style={styles.horizontalBarContainer}>
            <View style={[styles.horizontalBar, { width: `${autos[1].rendimiento.cilindraje.valor * 14}%`, backgroundColor: 'red' }]} />
            <Text style={styles.barLabel}>{autos[1].rendimiento.cilindraje.valor} cc</Text>
          </View>
        </View>
      </View>

        {/* Card para Potencia */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Potencia</Text>
            <Text style={styles.description}>Capacidad del motor para realizar trabajo.</Text>
            <View style={styles.chartContainerHorizontal}>
                <View style={styles.horizontalBarContainer}>
                    <View style={[styles.horizontalBar, { width: `${autos[0].rendimiento.potencia.valor * 0.15}%`, backgroundColor: 'purple' }]} />
                    <Text style={styles.barLabel}>{autos[0].rendimiento.potencia.valor} hp</Text>
                </View>
                <View style={styles.horizontalBarContainer}>
                    <View style={[styles.horizontalBar, { width: `${autos[1].rendimiento.potencia.valor * 0.15}%`, backgroundColor: 'red' }]} />
                    <Text style={styles.barLabel}>{autos[1].rendimiento.potencia.valor} hp</Text>
                </View>
            </View>
        </View>
        
          {/* Card para Velocidad máxima */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Velocidad Máxima</Text>
        <Text style={styles.description}>La velocidad máxima que puede alcanzar el vehículo en condiciones ideales.</Text>
        <View style={styles.chartContainerVertical}>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: `${autos[0].rendimiento.velocidad_maxima.valor * 0.5}%`, backgroundColor: 'purple' }]} />
            <Text style={styles.barLabel}>{autos[0].rendimiento.velocidad_maxima.valor} km/h</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: `${autos[1].rendimiento.velocidad_maxima.valor * 0.5}%`, backgroundColor: 'red' }]} />
            <Text style={styles.barLabel}>{autos[1].rendimiento.velocidad_maxima.valor} km/h</Text>
          </View>
        </View>
      </View>
      {/* Modal para mostrar detalles adicionales */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedDetail.title}</Text>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: 'purple' }]}>{autos[0].nombre}</Text>
              <Text style={styles.detailText}>{selectedDetail.detailAuto1}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: 'red' }]}>{autos[1].nombre}</Text>
              <Text style={styles.detailText}>{selectedDetail.detailAuto2}</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333', textAlign: 'center' },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    description: { fontSize: 14, marginBottom: 10 },
    chartContainerVertical: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, marginTop: 15 },
    chartContainerHorizontal: { flexDirection: 'column', marginVertical: 10 },
    barContainer: { alignItems: 'center', width: '45%' },
    chartContainer: {
      marginVertical: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    horizontalBarContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    bar: { width: 30, borderRadius: 5 },
    horizontalBar: { height: 10, borderRadius: 5, marginRight: 5 },
    barLabel: { fontSize: 14, fontWeight: 'bold' },
    bullet: { fontSize: 18, marginRight: 8 },
    moreDetailsButton: { marginTop: 10, paddingVertical: 10, backgroundColor: '#007BFF', borderRadius: 5, alignItems: 'center' },
    moreDetailsText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    detailRow: { marginBottom: 15 },
    detailLabel: { fontSize: 16, fontWeight: 'bold' },
    detailText: { fontSize: 14, color: '#555', marginTop: 10, marginBottom: 5 },
    closeModalText: { color: 'blue', fontWeight: 'bold', fontSize: 14, marginTop: 20, textAlign: 'center' },
  });

export default RendimientoCard;