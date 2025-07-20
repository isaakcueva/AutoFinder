import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const TecnologiaContent = () => {
  const { autos } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({ modalTitle: '', auto1: '', auto2: '' });

  // Asegura que haya al menos dos autos para comparar
  if (autos.length < 2) {
    return <Text>No hay suficientes autos para comparar.</Text>;
  }

  // Función para mostrar el detalle específico de una característica tecnológica seleccionada
  const showDetail = (modalTitle: string, detailAuto1: string, detailAuto2: string) => {
    setSelectedDetail({ modalTitle, auto1: detailAuto1, auto2: detailAuto2 });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tecnología</Text>

      {/* Card para Pantalla */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pantalla</Text>
        <Text style={styles.description}>Tipo de pantalla integrada en el vehículo.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.pantalla.tipo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.pantalla.tipo}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles de la Pantalla',
              autos[0].tecnologia.pantalla.detalle || 'Sin detalles',
              autos[1].tecnologia.pantalla.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Card para Sonido */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sonido</Text>
        <Text style={styles.description}>Tipo de tecnología de sonido en el vehículo.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.sonido.tipo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.sonido.tipo}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles del Sonido',
              autos[0].tecnologia.sonido.detalle || 'Sin detalles',
              autos[1].tecnologia.sonido.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Card para Cargador Inalámbrico */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cargador Inalámbrico</Text>
        <Text style={styles.description}>Incluye cargador inalámbrico para dispositivos móviles.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.cargador_inalambrico.incluye}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.cargador_inalambrico.incluye}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles Cargador Inalámbrico',
              autos[0].tecnologia.cargador_inalambrico.detalle || 'Sin detalles',
              autos[1].tecnologia.cargador_inalambrico.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>
      
      {/* Card para Asistencia de Estacionamiento */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Asistencia de Estacionamiento</Text>
        <Text style={styles.description}>Incluye asistencia para estacionarse.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.asistencia_estacionamiento.incluye}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.asistencia_estacionamiento.incluye}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles de Asistencia de Estacionamiento',
              autos[0].tecnologia.asistencia_estacionamiento.detalle || 'Sin detalles',
              autos[1].tecnologia.asistencia_estacionamiento.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Card para Conectividad */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conectividad</Text>
        <Text style={styles.description}>Tipo de conectividad disponible en el vehículo.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.conectividad.tipo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.conectividad.tipo}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles de Conectividad',
              autos[0].tecnologia.conectividad.detalle || 'Sin detalles',
              autos[1].tecnologia.conectividad.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Card para Entrada sin Llave */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrada sin Llave</Text>
        <Text style={styles.description}>Incluye sistema de entrada sin llave.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.entrada_sin_llave.incluye}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.entrada_sin_llave.incluye}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles de Entrada sin Llave',
              autos[0].tecnologia.entrada_sin_llave.detalle || 'Sin detalles',
              autos[1].tecnologia.entrada_sin_llave.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Card para Asistencia de Conducción */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Asistencia de Conducción</Text>
        <Text style={styles.description}>Tipo de asistencia de conducción disponible en el vehículo.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.asistencia_conduccion.tipo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.asistencia_conduccion.tipo}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles de Asistencia de Conducción',
              autos[0].tecnologia.asistencia_conduccion.detalle || 'Sin detalles',
              autos[1].tecnologia.asistencia_conduccion.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Card para Control Remoto */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Control Remoto</Text>
        <Text style={styles.description}>Incluye control remoto para funciones del vehículo.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].tecnologia.control_remoto.incluye}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].tecnologia.control_remoto.incluye}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              'Detalles de Control Remoto',
              autos[0].tecnologia.control_remoto.detalle || 'Sin detalles',
              autos[1].tecnologia.control_remoto.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para mostrar detalles adicionales */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedDetail.modalTitle}</Text>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: 'purple' }]}>{autos[0].nombre}</Text>
              <Text style={styles.detailText}>{selectedDetail.auto1}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: 'red' }]}>{autos[1].nombre}</Text>
              <Text style={styles.detailText}>{selectedDetail.auto2}</Text>
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
  chartContainer: { marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: { fontSize: 18, marginRight: 8 },
  barLabel: { fontSize: 14, fontWeight: 'bold' },
  
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

export default TecnologiaContent;