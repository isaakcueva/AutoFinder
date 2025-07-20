import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CarProvider } from './src/context/CarContext'; // Importar el CarProvider
import { AppProvider } from './src/context/AppContext'; // Mantener AppProvider si es necesario
import HomeScreen from './src/screens/HomeScreen';
import ComparisonScreen from './src/screens/ComparisonScrenn';
import SearchScreen from './src/screens/SearchScreen';
import SelectCarScreen from './src/screens/SelectCarScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/MainLoginScreen';
import FavoritesScreen from './src/screens/LoginFavoritesScreen';
import EmptyFavoritesView from './src/screens/EmmptyFavoriteScreen';
import ShowFavoritesScreen from './src/screens/FavoritesScreen';
import CarDetailsScreen from './src/screens/CarDetailsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';


// Define route parameters
type RootStackParamList = {
  Home: undefined;
  Comparison: undefined;
  Search: undefined;
  Register: undefined;
  Login: undefined;
  Favorites: undefined;
  EmptyFavorites: undefined;
  ShowFavorites: undefined;
  CarDetails: undefined;
  EditProfile: undefined;
  SelectCar: { selectedCarIndex: number }; // Parámetro para indicar qué marco se está actualizando
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
      <CarProvider>
        <NavigationContainer
        >
          <View style={styles.container}>
            <Stack.Navigator initialRouteName="Home" id={undefined}>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}  
              />
              <Stack.Screen
                name="Comparison"
                component={ComparisonScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}  
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}  
              />
              <Stack.Screen
                name="SelectCar"
                component={SelectCarScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}  
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}                
                />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}            
                />
             <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}            
              />
              <Stack.Screen
                name="EmptyFavorites"
                component={EmptyFavoritesView}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}            
              />

              <Stack.Screen
                name="ShowFavorites"
                component={ShowFavoritesScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}            
              />

              <Stack.Screen
                name="CarDetails"
                component={CarDetailsScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}
              />

              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                  detachPreviousScreen: true, // Detach the screen to force unmounting
                  headerShown: false, // Hide the header if needed
                }}
              />


            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </CarProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});