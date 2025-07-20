import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

const MenuComponent = () => {
    const { selectedCategory, setSelectedCategory } = useAppContext();
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const categories = [
        { name: 'Dimensiones', icon: <FontAwesome5 name="car" size={24} color="black" /> },
        { name: 'Confort', icon: <MaterialIcons name="weekend" size={24} color="black" /> },
        { name: 'Tecnología', icon: <FontAwesome5 name="microchip" size={24} color="black" /> },
        { name: 'Rendimiento', icon: <FontAwesome5 name="tachometer-alt" size={24} color="black" /> },
        { name: 'Motor', icon: <MaterialCommunityIcons name="engine" size={24} color="black" /> },
        { name: 'Seguridad', icon: <Entypo name="shield" size={24} color="black" /> },
    ];

    const handlePressCategory = (name: string, event: any) => {
        // Cambiar la categoría seleccionada
        setSelectedCategory(name);

        // Mostrar el tooltip
        setTooltipText(name);
        const { pageX, pageY } = event.nativeEvent;
        setTooltipPosition({ top: pageY - 30, left: pageX + 10 });
        setTooltipVisible(true);

        // Ocultar el tooltip después de un breve periodo (para que no bloquee la interfaz)
        setTimeout(() => setTooltipVisible(false), 500); // Tiempo en milisegundos
    };

    return (
        <View style={styles.menuContainer}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.menuItem,
                        selectedCategory === category.name && styles.selectedMenuItem,
                    ]}
                    onPress={(event) => handlePressCategory(category.name, event)} // Llama a la función `handlePressCategory` en `onPress`
                >
                    <View style={styles.icon}>
                        {React.cloneElement(category.icon, {
                            color: selectedCategory === category.name ? 'blue' : 'black',
                        })}
                    </View>
                </TouchableOpacity>
            ))}
            {tooltipVisible && (
                <Modal
                    transparent
                    animationType="fade"
                    visible={tooltipVisible}
                    onRequestClose={() => setTooltipVisible(false)}
                >
                    <View style={[styles.tooltipContainer, tooltipPosition]}>
                        <Text style={styles.tooltipText}>{tooltipText}</Text>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        left: 20,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    selectedMenuItem: {
        backgroundColor: '#e0e0e0',
    },
    icon: {
        marginRight: 10,
    },
    tooltipContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 8,
        borderRadius: 5,
    },
    tooltipText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default MenuComponent;
