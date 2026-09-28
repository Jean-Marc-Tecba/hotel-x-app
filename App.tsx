import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HotelProvider, useHotel } from './src/context/HotelContext';
import { colores } from './src/theme/colors';
import InicioScreen from './src/screens/InicioScreen';
import CatalogoScreen from './src/screens/CatalogoScreen';
import DetalleHabitacionScreen from './src/screens/DetalleHabitacionScreen';
import InfoHotelScreen from './src/screens/InfoHotelScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminPanelScreen from './src/screens/AdminPanelScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navegacion() {
  const { cargando } = useHotel();

  if (cargando) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color={colores.primario} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colores.primario },
          headerTintColor: colores.blanco,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'Habitaciones' }} />
        <Stack.Screen name="DetalleHabitacion" component={DetalleHabitacionScreen} options={{ title: 'Detalle' }} />
        <Stack.Screen name="InfoHotel" component={InfoHotelScreen} options={{ title: 'Sobre el Hotel' }} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ title: 'Acceso Administrativo' }} />
        <Stack.Screen name="AdminPanel" component={AdminPanelScreen} options={{ title: 'Panel Administrativo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <HotelProvider>
      <Navegacion />
    </HotelProvider>
  );
}

const styles = StyleSheet.create({
  cargandoContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
});