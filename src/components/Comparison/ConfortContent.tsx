import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const ConfortContent = () => {
  const { autos } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({ auto1: '', auto2: '' });

  // Asegura que haya al menos dos autos para comparar
  if (autos.length < 2) {
    return <Text>No hay suficientes autos para comparar.</Text>;
  }

  // Función para mostrar el detalle específico de una característica de confort seleccionada
  const showDetail = (detailAuto1: string, detailAuto2: string) => {
    setSelectedDetail({ auto1: detailAuto1, auto2: detailAuto2 });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conforte</Text>

      {/* Card para Aire Acondicionado */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aire Acondicionado</Text>
        <Text style={styles.description}>Tipo de aire acondicionado del vehículo.</Text>
        <View style={styles.chartContainer}>

            <View style={styles.row}>
        <Text style={styles.bullet}>{'\u2022'}</Text>
        <Text style={[styles.barLabel, { color: 'purple' }]}>
          {autos[0].confort.aire.detalle || 'Sin detalles'}
        </Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.bullet}>{'\u2022'}</Text>
        <Text style={[styles.barLabel, { color: 'red' }]}>
          {autos[1].confort.aire.detalle || 'Sin detalles'}
        </Text>
    </View>
        </View>
        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.aire.detalle || 'Sin detalles',
              autos[1].confort.aire.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>

      {/* Card para Asientos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Asientos</Text>
        <Text style={styles.description}>Tipo de asientos del vehículo.</Text>
        <View style={styles.chartContainer}>
  
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'purple' }]}>
      {autos[0].confort.asientos.detalle || 'Sin detalles'}
    </Text>
  </View>
  
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'red' }]}>
      {autos[1].confort.asientos.detalle || 'Sin detalles'}
    </Text>
  </View>
</View>

        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.asientos?.detalle || 'Sin detalles',
              autos[1].confort.asientos?.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>

      {/* Card para Iluminación */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Iluminación</Text>
        <Text style={styles.description}>Tipo de iluminación interior del automóvil.</Text>
        <View style={styles.chartContainer}>
        <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'purple' }]}>
      {autos[0].confort.iluminacion.detalle || 'Sin detalles'}
    </Text>
  </View>
  {/* Detalle del segundo auto con punto */}
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'red' }]}>
      {autos[1].confort.iluminacion.detalle || 'Sin detalles'}
    </Text>
  </View>
        </View>
        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.iluminacion?.detalle || 'Sin detalles',
              autos[1].confort.iluminacion?.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>

      {/* Card para Climatización */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Climatización</Text>
        <Text style={styles.description}>Características de climatización del vehículo.</Text>
        <View style={styles.chartContainer}>
        <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'purple' }]}>
      {autos[0].confort.climatizacion.detalle || 'Sin detalles'}
    </Text>
  </View>
  {/* Detalle del segundo auto con punto */}
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'red' }]}>
      {autos[1].confort.climatizacion.detalle || 'Sin detalles'}
    </Text>
  </View>
        </View>
        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.climatizacion?.detalle || 'Sin detalles',
              autos[1].confort.climatizacion?.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>

      {/* Card para Techo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Techo</Text>
        <Text style={styles.description}>Características del techo del vehículo.</Text>
        <View style={styles.chartContainer}>
        <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'purple' }]}>
      {autos[0].confort.techo.detalle || 'Sin detalles'}
    </Text>
  </View>
  {/* Detalle del segundo auto con punto */}
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'red' }]}>
      {autos[1].confort.techo.detalle || 'Sin detalles'}
    </Text>
  </View>
        </View>
        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.techo?.detalle || 'Sin detalles',
              autos[1].confort.techo?.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>

      {/* Card para Sonido */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sistema de Sonido</Text>
        <Text style={styles.description}>Características del sistema de sonido.</Text>
        <View style={styles.chartContainer}>
        <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'purple' }]}>
      {autos[0].confort.sonido.detalle || 'Sin detalles'}
    </Text>
  </View>
  {/* Detalle del segundo auto con punto */}
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'red' }]}>
      {autos[1].confort.sonido.detalle || 'Sin detalles'}
    </Text>
  </View>
        </View>
        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.sonido?.detalle || 'Sin detalles',
              autos[1].confort.sonido?.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>
      {/* Card para Espacio para Piernas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Espacio para Piernas</Text>
        <Text style={styles.description}>Medida disponible para pasajeros y conductor.</Text>
        <View style={styles.chartContainer}>
        <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'purple' }]}>
      {autos[0].confort.espacio_piernas.tipo || 'Sin detalles'} cm
    </Text>
  </View>
  {/* Detalle del segundo auto con punto */}
  <View style={styles.row}>
    <Text style={styles.bullet}>{'\u2022'}</Text>
    <Text style={[styles.barLabel, { color: 'red' }]}>
      {autos[1].confort.espacio_piernas.tipo || 'Sin detalles'} cm
    </Text>
  </View>
        </View>
        {/* <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].confort.sonido?.detalle || 'Sin detalles',
              autos[1].confort.sonido?.detalle || 'Sin detalles'
            )
          }
        >
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity> */}
      </View>
      

      {/* Modal para mostrar detalles adicionales */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles de Confort</Text>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: 'purple' }]}>{autos[0].nombre}:</Text>
              <Text style={styles.detailText}>{selectedDetail.auto1}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: 'red' }]}>{autos[1].nombre}:</Text>
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
  barLabel: { fontSize: 14, fontWeight: 'bold' },
  moreDetailsButton: { marginTop: 10, paddingVertical: 10, backgroundColor: '#007BFF', borderRadius: 5, alignItems: 'center' },
  moreDetailsText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  detailRow: { flexDirection: 'row', marginBottom: 10 },
  detailLabel: { fontSize: 14, fontWeight: 'bold', marginRight: 10 },
  detailText: { fontSize: 14, color: '#555', flex: 1 },
  closeModalText: { color: 'blue', fontWeight: 'bold', fontSize: 14, marginTop: 20, alignSelf: 'center' },
  row: {
    flexDirection: 'row', // Coloca el punto y el texto en la misma línea
    alignItems: 'center', // Alinea verticalmente
    marginBottom: 8, // Espaciado entre líneas
  },
  bullet: {
    fontSize: 18, // Tamaño del punto
    marginRight: 8, // Espaciado entre el punto y el texto
    color: '#333', // Color del punto
  },
  chartContainerVertical: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100 },
  chartContainerHorizontal: { flexDirection: 'column', marginVertical: 10 },
  barContainer: { alignItems: 'center', width: '45%' },
  horizontalBarContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bar: { width: 30, borderRadius: 5 },
  horizontalBar: { height: 10, borderRadius: 5, marginRight: 5 }
  
});

export default ConfortContent;