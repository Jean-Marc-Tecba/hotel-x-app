import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

export default function InicioScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.marca}>
        <Text style={styles.marcaTexto}>HOTEL <Text style={{ color: '#c9a24b' }}>X</Text></Text>
      </View>
      <Image source={{ uri: 'https://picsum.photos/seed/hotelx/800/400' }} style={styles.banner} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>HOTEL X</Text>
        <Text style={styles.subtitulo}>Comodidad y atención cerca del centro de la ciudad.</Text>
        <Text style={styles.parrafo}>
          Descubre nuestras habitaciones, conoce los servicios que ofrecemos y realiza tu
          solicitud de reserva directamente desde la aplicación.
        </Text>
        <Pressable style={styles.boton} onPress={() => navigation.navigate('Catalogo')}>
          <Text style={styles.botonTexto}>Ver Habitaciones</Text>
        </Pressable>
        <Pressable style={styles.botonSecundario} onPress={() => navigation.navigate('InfoHotel')}>
          <Text style={styles.botonSecundarioTexto}>Sobre el Hotel y Ubicación</Text>
        </Pressable>

        <Pressable style={styles.enlaceAdmin} onPress={() => navigation.navigate('AdminLogin')}>
          <Text style={styles.enlaceAdminTexto}>Acceso para personal del hotel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 220 },
  contenido: { padding: 20 },
  titulo: { fontSize: 30, fontWeight: '800', color: '#0f2f3c', letterSpacing: 1 },
  subtitulo: { fontSize: 16, color: '#555', marginTop: 4, marginBottom: 12 },
  parrafo: { fontSize: 15, color: '#333', lineHeight: 22 },
  boton: { backgroundColor: '#0f2f3c', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  enlaceAdmin: { marginTop: 16, alignItems: 'center' },
  enlaceAdminTexto: { color: '#888', fontSize: 13, textDecorationLine: 'underline' },
  botonSecundario: { borderWidth: 1.5, borderColor: '#0f2f3c', padding: 14, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  botonSecundarioTexto: { color: '#0f2f3c', fontSize: 16, fontWeight: '600' },
  marca: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, backgroundColor: '#0f2f3c' },
  marcaTexto: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: 2 },
});