
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterMenuComponent from '../components/ButtomMenu';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';


type RootStackParamList = {
  Home: undefined;
  CarDetails: { carId: number };
};

const SearchView = () => {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Página actual
  const [hasMore, setHasMore] = useState(true); // Controla si hay más datos para cargar
  const [searchQuery, setSearchQuery] = useState('');
  const isInitialLoad = useRef(true); // Controla la primera carga
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false); // Controla el modal principal
  const [isPickerModalVisible, setIsPickerModalVisible] = useState(false); // Controla el modal de iOS
  const [selectedMarca, setSelectedMarca] = useState(''); // Marca seleccionada
  const [selectedTipoCarro, setSelectedTipoCarro] = useState(''); // Tipo de carro seleccionado
  const [isTipoCarroPickerModalVisible, setIsTipoCarroPickerModalVisible] = useState(false); // Controla el modal de Tipo de carro
  const [selectedConsumo, setSelectedConsumo] = useState('');
  const [isConsumoPickerModalVisible, setIsConsumoPickerModalVisible] = useState(false); // Solo para iOS
  const [minPrice, setMinPrice] = useState(10000); // Precio mínimo
  const [maxPrice, setMaxPrice] = useState(190000); // Precio máximo
  const [errorMin, setErrorMin] = useState(false); // Controla error en precio mínimo
  const [errorMax, setErrorMax] = useState(false); // Controla error en precio máximo
// Imagen de fondo
const backgroundImage =
'https://i.pinimg.com/736x/29/a8/e6/29a8e66fbe1c16bb09cd60b6086af514.jpg';
  const fetchCars = async (query = '', pageNumber = 1) => {
    if (!hasMore && pageNumber !== 1) return; // Detiene la carga si no hay más datos
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af004',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExOTkzMzAsImV4cCI6MjA0Njc3NTMzMH0.hVzKii86k6vBcLEe-pZJzHlD0q3KBwN0wyevBSM491s',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExOTkzMzAsImV4cCI6MjA0Njc3NTMzMH0.hVzKii86k6vBcLEe-pZJzHlD0q3KBwN0wyevBSM491s',
          },
          body: JSON.stringify({ inp_busqueda: query }),
        }
      );

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error('Error: La API no devolvió un arreglo válido.');
        return;
      }

      // Determina si hay más carros para cargar
      const newCars = data.slice((pageNumber - 1) * 10, pageNumber * 10);
      setHasMore(newCars.length === 10); // Si recibimos menos de 10, no hay más datos

      // Actualiza la lista de carros
      setCars((prevCars) => (pageNumber === 1 ? newCars : [...prevCars, ...newCars]));
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    if (isInitialLoad.current) {
      fetchCars('', 1);
      isInitialLoad.current = false;
    }
  }, []);

  // Maneja la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setHasMore(true); // Restablece el estado de carga
    fetchCars(query, 1);
  };

  // Maneja el scroll para cargar más datos
  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCars(searchQuery, nextPage);
    }
  };
  

 // Maneja la navegación en una función separada
const handleNavigate = (carId: number) => {
  navigation.navigate('CarDetails', { carId });
};

// Renderiza cada auto
const renderItem = ({ item }: any) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.url || 'https://via.placeholder.com/150' }}
      style={styles.carImage}
      resizeMode="contain"
    />
    <Text style={styles.carName}>{item.nombrecarro}</Text>
    <Text style={styles.carPrice}>${item.preciocarro.toLocaleString()}</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleNavigate(item.idcarro)}
    >
      <Text style={styles.buttonText}>Ver más</Text>
    </TouchableOpacity>
  </View>
);
  const fetchFilteredCars = async () => {
    setIsLoading(true); // Indicar que está cargando
    try {
      const body = {
        marca_nombre: selectedMarca || null, // Si no se selecciona nada, enviar null
        carro_tipo: selectedTipoCarro || null,
        tipo_consumo_id: selectedConsumo || null,
        precio_desde: minPrice || null,
        precio_hasta: maxPrice || null,
      };
  
      const response = await fetch(
        'https://kemhvojycwssbzfbochm.supabase.co/rest/v1/rpc/sp_af003',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExOTkzMzAsImV4cCI6MjA0Njc3NTMzMH0.hVzKii86k6vBcLEe-pZJzHlD0q3KBwN0wyevBSM491s',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbWh2b2p5Y3dzc2J6ZmJvY2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExOTkzMzAsImV4cCI6MjA0Njc3NTMzMH0.hVzKii86k6vBcLEe-pZJzHlD0q3KBwN0wyevBSM491s',
          },
          body: JSON.stringify(body),
        }
      );
  
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        console.error('Error: La API no devolvió un arreglo válido.');
        return;
      }
  
      // Actualizar el estado de los carros con los datos devueltos
      const formattedData = data.map((item) => ({
        idcarro: item.id_carro,
        nombrecarro: item.nombre,
        marcacarro: item.marca,
        preciocarro: item.precio,
        tipocarro: item.tipo,
        url: item.img,
      }));
  
      setCars(formattedData); // Actualizar el estado con los resultados filtrados
      setHasMore(false); // No cargar más porque esta es una búsqueda específica
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Renderiza un indicador de carga al final de la lista
  const renderFooter = () => {
    if (!isLoading) return null;
    return <Text style={styles.loadingText}>Cargando más carros...</Text>;
  };

  return (

    <ImageBackground source={{ uri: backgroundImage }}
    style={styles.backgroundImage}>
       <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        {/* Icono de filtros */}
        <TouchableOpacity 
          style={styles.iconContainer}
          onPress={() => setIsFilterModalVisible(true)} // Abre el modal
           >
           <FontAwesome name="sliders" size={20} color="#555" />
        </TouchableOpacity>
        {/* Input de búsqueda */}
        <TextInput
          style={styles.searchInput}
          placeholder="Auto a Buscar"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />

        {/* Icono de búsqueda */}
        <TouchableOpacity style={styles.iconContainer} onPress={() => handleSearch(searchQuery)}>
          <FontAwesome name="search" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Lista de carros con lazy loading */}
      <FlatList
  data={cars}
  keyExtractor={(item) => item.idcarro.toString()}
  renderItem={renderItem}
  numColumns={2}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  ListEmptyComponent={
    !isLoading && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No se encontraron resultados.</Text>
      </View>
    )
  }
  ListFooterComponent={renderFooter}
  contentContainerStyle={styles.listContainer}
/>
 {/* Menú inferior */}
 <View style={styles.footerWrapper}>
      <FooterMenuComponent />
    </View>
    <Modal
  visible={isFilterModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsFilterModalVisible(false)} // Cierra el modal
>
  {/* Envolver todo el contenido */}
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filtros</Text>

 {/* Campo de Marca */}
 <Text style={styles.label}>Marca</Text>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            style={styles.iosPickerContainer}
            onPress={() => setIsPickerModalVisible(true)} // Abre el modal personalizado
          >
            <Text style={styles.pickerText}>
              {selectedMarca || "Seleccionar"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            selectedValue={selectedMarca}
            onValueChange={(value) => setSelectedMarca(value)}
            style={styles.androidPicker}
            mode="dropdown"
          >
            <Picker.Item label="Seleccionar" value="" />
            <Picker.Item label="Chevrolet" value="Chevrolet" />
            <Picker.Item label="Kia" value="Kia" />
            <Picker.Item label="Toyota" value="Toyota" /> 
            <Picker.Item label="Hyundai" value="Hyundai" />
            <Picker.Item label="Chery" value="Chery" />
            <Picker.Item label="Suzuki" value="Suzuki" />
            <Picker.Item label="Renault" value="Renault" />
            <Picker.Item label="Volkswagen" value="Volkswagen" />
            <Picker.Item label="Nissan" value="Nissan" />
            <Picker.Item label="Great Wall" value="Great Wall" />           
          </Picker>
        )}

        {/* Campo de Tipo de carro */}
        <Text style={styles.label}>Tipo de carro</Text>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            style={styles.iosPickerContainer}
            onPress={() => setIsTipoCarroPickerModalVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedTipoCarro || "Seleccionar"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            selectedValue={selectedTipoCarro}
            onValueChange={(value) => setSelectedTipoCarro(value)}
            style={styles.androidPicker}
            mode="dropdown"
          >
            <Picker.Item label="Seleccionar" value="" />
            <Picker.Item label="Sedán" value="Sedán" />
            <Picker.Item label="HatchBack" value="HatchBack" />
            <Picker.Item label="Suv" value="SUV" />
            <Picker.Item label="Camioneta" value="Camioneta" />

          </Picker>
        )}

        {/* Campo de Tipo de Consumo */}
        <Text style={styles.label}>Tipo de consumo</Text>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            style={styles.iosPickerContainer}
            onPress={() => setIsConsumoPickerModalVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedConsumo || "Seleccionar"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            selectedValue={selectedConsumo}
            onValueChange={(value) => setSelectedConsumo(value)}
            style={styles.androidPicker}
            mode="dropdown"
          >
            <Picker.Item label="Seleccionar" value="" />
            <Picker.Item label="Alto" value="Alto" />
            <Picker.Item label="Medio" value="Medio" />
            <Picker.Item label="Bajo" value="Bajo" />
          </Picker>
        )}

          {/* Campo de Rango de Precio */}
          <Text style={styles.label}>Rango de Precio</Text>
          <View style={styles.priceRangeRow}>
  {/* Campo de precio mínimo */}
  <View style={styles.inputWrapper}>
    <TextInput
      style={[
        styles.priceInput,
        errorMin ? styles.inputError : null, // Estilo en caso de error
      ]}
      value={minPrice !== null ? minPrice.toString() : ""}
      keyboardType="numeric"
      onChangeText={(value) => {
        if (value.length <= 8) { // Limitar a 8 dígitos
          const numericValue = parseInt(value, 10);
          setMinPrice(isNaN(numericValue) ? null : numericValue);

          // Validar en tiempo real
          if (
            numericValue !== null &&
            maxPrice !== null &&
            numericValue > maxPrice
          ) {
            setErrorMin(true);
            setErrorMax(false); // Desactivar el error opuesto
          } else {
            setErrorMin(false); // Eliminar error cuando es válido
          }
        }
      }}
      placeholder="Mínimo"
      placeholderTextColor="#ccc"
    />
  </View>

  <Text style={styles.rangeSeparator}>-</Text>

  {/* Campo de precio máximo */}
  <View style={styles.inputWrapper}>
    <TextInput
      style={[
        styles.priceInput,
        errorMax ? styles.inputError : null, // Estilo en caso de error
      ]}
      value={maxPrice !== null ? maxPrice.toString() : ""}
      keyboardType="numeric"
      onChangeText={(value) => {
        if (value.length <= 8) { // Limitar a 8 dígitos
          const numericValue = parseInt(value, 10);
          setMaxPrice(isNaN(numericValue) ? null : numericValue);

          // Validar en tiempo real
          if (
            numericValue !== null &&
            minPrice !== null &&
            numericValue < minPrice
          ) {
            setErrorMax(true);
            setErrorMin(false); // Desactivar el error opuesto
          } else {
            setErrorMax(false); // Eliminar error cuando es válido
          }
        }
      }}
      placeholder="Máximo"
      placeholderTextColor="#ccc"
    />
  </View>
</View>

{/* Mensaje de error, solo muestra uno a la vez */}
{errorMin ? (
  <Text style={styles.errorText}>
    Precio inicio no puede ser mayor a precio fin
  </Text>
) : errorMax ? (
  <Text style={styles.errorText}>
    Precio fin no puede ser menor a precio inicio
  </Text>
) : null}
{/* Modal para seleccionar Marca en iOS */}
<Modal
  visible={isPickerModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setIsPickerModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <FlatList
        data={[
          { label: "Seleccionar", value: "" },
          { label: "Chevrolet", value: "Chevrolet" },
          { label: "Kia", value: "Kia" },
          { label: "Toyota", value: "Toyota" },
          { label: "Hyundai", value: "Hyundai" },
          { label: "Chery", value: "Chery" },
          { label: "Suzuki", value: "Suzuki" },
          { label: "Renault", value: "Renault" },
          { label: "Volkswagen", value: "Volkswagen" },
          { label: "Nissan", value: "Nissan" },
          { label: "Great Wall", value: "Great Wall" },
        ]}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setSelectedMarca(item.value);
              setIsPickerModalVisible(false);
            }}
          >
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsPickerModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
{/* Modal para seleccionar Tipo de Carro en iOS */}
<Modal
  visible={isTipoCarroPickerModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setIsTipoCarroPickerModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <FlatList
        data={[
          { label: "Seleccionar", value: "" },
          { label: "Sedán", value: "Sedán" },
          { label: "HatchBack", value: "HatchBack" },
          { label: "SUV", value: "SUV" },
          { label: "Camioneta", value: "Camioneta" },
          { label: "Otros", value: "Otros" },
        ]}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setSelectedTipoCarro(item.value);
              setIsTipoCarroPickerModalVisible(false);
            }}
          >
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsTipoCarroPickerModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
{/* Modal para seleccionar Tipo de Consumo en iOS */}
<Modal
  visible={isConsumoPickerModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setIsConsumoPickerModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <FlatList
        data={[
          { label: "Seleccionar", value: "" },
          { label: "Alto", value: "Alto" },
          { label: "Medio", value: "Medio" },
          { label: "Bajo", value: "Bajo" },
        ]}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setSelectedConsumo(item.value);
              setIsConsumoPickerModalVisible(false);
            }}
          >
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsConsumoPickerModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>




          {/* Botones */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsFilterModalVisible(false)}
            >
              <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
  style={styles.applyButton}
  onPress={() => {
    fetchFilteredCars(); // Llamar a la API con los filtros
    setIsFilterModalVisible(false); // Cerrar el modal
  }}
>
              <Text style={styles.buttonText}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
</Modal>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 80, // Espaciado superior para evitar superposición con la barra de estado
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 30, // Más espacio en la parte inferior
  },

  label: {
    fontSize: 16,
    marginBottom: 10, // Espaciado con el campo siguiente
    marginTop: 10, // Espaciado con el campo anterior
    color: "#333",
  },

  iosPickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15, // Ajusta el padding interno
    marginBottom: 15, // Espaciado entre campos
    backgroundColor: "#fff",
  },

  androidPicker: {
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 15, // Espaciado entre campos
  },

  priceRangeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20, // Espaciado inferior
    marginTop: 10, // Espaciado superior
  },

  inputWrapper: {
    flex: 1, // Permitir que los campos tengan un ancho dinámico
    marginHorizontal: 5, // Espaciado entre los campos
  },

  priceInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000", // Color del texto ingresado
  },

  rangeSeparator: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 5,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30, // Espaciado con los campos superiores
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#ff4d4d",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  applyButton: {
    flex: 1,
    backgroundColor: "#4caf50",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginTop: -5, // Ajusta el espacio superior
    marginBottom: 15, // Espaciado con el siguiente campo
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  pickerText: {
    color: "#333",
  },
 
  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerWrapper: {
    position: "absolute",
    bottom: 70,
    width: "85%",
    alignItems: "center",
    marginLeft: 30,
    backgroundColor: 'black',

  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: '60%',
    height: 100, // Altura adecuada para el logo
    marginTop: 60, // Espacio arriba del logo
    marginBottom: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    height: 45,
    marginBottom: 20, // Espaciado entre la barra de búsqueda y los autos
  },

  pickerWrapper: {
    marginBottom: 20, // Espacio inferior
    borderWidth: 0, // Elimina bordes del contenedor
    width: '100%', // Asegura el ancho total
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  iconContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Espaciado inferior para que el último elemento no quede pegado
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  carImage: {
    width: 120,
    height: 90,
    resizeMode: 'contain',
  },
  carName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  carPrice: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  button: {
    marginTop: 5,
    backgroundColor: '#072430',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },

 
  

  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },


  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  
  inputError: {
    borderColor: "red",
  },
});

export default SearchView;