import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const DimensionesContent = () => {
  const { autos } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({ auto1: '', auto2: '' });

  // Asegura que haya al menos dos autos para comparar
  if (autos.length < 2) {
    return <Text>No hay suficientes autos para comparar.</Text>;
  }

  // Función para mostrar detalles en el modal
  const showDetail = (detailAuto1: string, detailAuto2: string) => {
    setSelectedDetail({ auto1: detailAuto1, auto2: detailAuto2 });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dimensiones y Capacidad</Text>

      {/* Card para Altura */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Altura</Text>
        <Text style={styles.description}>Dimensión vertical del automóvil.</Text>
        <View style={styles.chartContainerVertical}>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: `${autos[0].dimension.alto * 50}%`, backgroundColor: 'purple' }]} />
            <Text style={styles.barLabel}>{autos[0].dimension.alto} m</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { height: `${autos[1].dimension.alto * 50}%`, backgroundColor: 'red' }]} />
            <Text style={styles.barLabel}>{autos[1].dimension.alto} m</Text>
          </View>
        </View>
      </View>

      {/* Card para Ancho */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ancho</Text>
        <Text style={styles.description}>Dimensión horizontal del automóvil.</Text>
        <View style={styles.chartContainerHorizontal}>
          <View style={styles.horizontalBarContainer}>
            <View style={[styles.horizontalBar, { width: `${autos[0].dimension.ancho * 40}%`, backgroundColor: 'purple' }]} />
            <Text style={styles.barLabel}>{autos[0].dimension.ancho} m</Text>
          </View>
          <View style={styles.horizontalBarContainer}>
            <View style={[styles.horizontalBar, { width: `${autos[1].dimension.ancho * 40}%`, backgroundColor: 'red' }]} />
            <Text style={styles.barLabel}>{autos[1].dimension.ancho} m</Text>
          </View>
        </View>
      </View>

      {/* Card para Largo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Largo</Text>
        <Text style={styles.description}>Dimensión longitudinal del automóvil.</Text>
        <View style={styles.chartContainerHorizontal}>
          <View style={styles.horizontalBarContainer}>
            <View style={[styles.horizontalBar, { width: `${autos[0].dimension.largo * 12}%`, backgroundColor: 'purple' }]} />
            <Text style={styles.barLabel}>{autos[0].dimension.largo} m</Text>
          </View>
          <View style={styles.horizontalBarContainer}>
            <View style={[styles.horizontalBar, { width: `${autos[1].dimension.largo * 12}%`, backgroundColor: 'red' }]} />
            <Text style={styles.barLabel}>{autos[1].dimension.largo} m</Text>
          </View>
        </View>
      </View>

      {/* Card para Capacidad de Cajuela */}
<View style={styles.card}>
  <Text style={styles.cardTitle}>Capacidad de Cajuela</Text>
  <Text style={styles.description}>Volumen disponible en la cajuela.</Text>
  <View style={styles.chartContainerHorizontal}>
    {/* Obtener el valor máximo para normalizar */}
    {(() => {
      const maxCapacity = Math.max(autos[0].dimension.capacidad_cajuela, autos[1].dimension.capacidad_cajuela);

      return (
        <>
          {/* Barra del Auto 1 */}
          <View style={styles.horizontalBarContainer}>
            <View
              style={[
                styles.horizontalBar,
                {
                  width: `${(autos[0].dimension.capacidad_cajuela / maxCapacity) * 80}%`,
                  backgroundColor: 'purple',
                },
              ]}
            />
            <Text style={styles.barLabel}>{autos[0].dimension.capacidad_cajuela} L</Text>
          </View>

          {/* Barra del Auto 2 */}
          <View style={styles.horizontalBarContainer}>
            <View
              style={[
                styles.horizontalBar,
                {
                  width: `${(autos[1].dimension.capacidad_cajuela / maxCapacity) *80}%`,
                  backgroundColor: 'red',
                },
              ]}
            />
            <Text style={styles.barLabel}>{autos[1].dimension.capacidad_cajuela} L</Text>
          </View>
        </>
      );
    })()}
  </View>
</View>


      {/* Card para Peso */}
<View style={styles.card}>
  <Text style={styles.cardTitle}>Peso</Text>
  <Text style={styles.description}>Peso total del vehículo.</Text>
  <View style={styles.chartContainerHorizontal}>
    {/* Calcular el valor máximo de peso */}
    {(() => {
      const maxWeight = Math.max(autos[0].dimension.peso, autos[1].dimension.peso);

      return (
        <>
          {/* Barra del Auto 1 */}
          <View style={styles.horizontalBarContainer}>
            <View
              style={[
                styles.horizontalBar,
                {
                  width: `${(autos[0].dimension.peso / maxWeight) * 75}%`, // Escalado al 80%
                  backgroundColor: 'purple',
                },
              ]}
            />
            <Text style={styles.barLabel}>{autos[0].dimension.peso} kg</Text>
          </View>

          {/* Barra del Auto 2 */}
          <View style={styles.horizontalBarContainer}>
            <View
              style={[
                styles.horizontalBar,
                {
                  width: `${(autos[1].dimension.peso / maxWeight) * 75}%`, // Escalado al 80%
                  backgroundColor: 'red',
                },
              ]}
            />
            <Text style={styles.barLabel}>{autos[1].dimension.peso} kg</Text>
          </View>
        </>
      );
    })()}
  </View>
</View>


      {/* Card para Neumáticos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Neumáticos</Text>
        <Text style={styles.description}>Información básica sobre los neumáticos.</Text>
        <View style={styles.chartContainer}>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'purple' }]}>{autos[0].dimension.neumaticos.valor} mm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[styles.barLabel, { color: 'red' }]}>{autos[1].dimension.neumaticos.valor} mm</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() =>
            showDetail(
              autos[0].dimension.neumaticos.detalle || 'Sin detalles',
              autos[1].dimension.neumaticos.detalle || 'Sin detalles'
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
            <Text style={styles.modalTitle}>Detalles de los Neumáticos</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, marginBottom: 10 },
  chartContainerVertical: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, marginTop: 10 },
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

export default DimensionesContent;