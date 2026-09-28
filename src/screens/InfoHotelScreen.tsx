import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, Pressable } from 'react-native';

const SERVICIOS = [
  'Wi-Fi gratuito en todas las áreas',
  'Desayuno incluido',
  'Recepción las 24 horas',
  'Estacionamiento privado',
  'Servicio de lavandería',
];

export default function InfoHotelScreen() {
  const abrirMapa = () => {
    Linking.openURL('https://maps.google.com/?q=Sucre,Bolivia');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://picsum.photos/seed/hotelxinfo/800/400' }} style={styles.imagen} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Sobre HOTEL X</Text>
        <Text style={styles.parrafo}>
          Ubicado a pocos minutos del centro histórico de Sucre, HOTEL X ofrece un espacio
          cómodo y accesible tanto para viajeros de negocio como para turistas.
        </Text>

        <Text style={styles.subtitulo}>Servicios</Text>
        {SERVICIOS.map((servicio) => (
          <Text key={servicio} style={styles.itemServicio}>• {servicio}</Text>
        ))}

        <Text style={styles.subtitulo}>Ubicación</Text>
        <Text style={styles.parrafo}>Calle Ejemplo N.º 123, Sucre, Bolivia</Text>
        <Pressable style={styles.boton} onPress={abrirMapa}>
          <Text style={styles.botonTexto}>Ver en el mapa</Text>
        </Pressable>

        <Text style={styles.subtitulo}>Contacto</Text>
        <Text style={styles.parrafo}>Teléfono: (591) 4-0000000</Text>
        <Text style={styles.parrafo}>Correo: contacto@hotelx.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imagen: { width: '100%', height: 200 },
  contenido: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subtitulo: { fontSize: 17, fontWeight: 'bold', color: '#1a1a1a', marginTop: 20, marginBottom: 8 },
  parrafo: { fontSize: 15, color: '#444', lineHeight: 21 },
  itemServicio: { fontSize: 15, color: '#444', marginBottom: 4 },
  boton: { backgroundColor: '#1a1a1a', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 15, fontWeight: '600' },
});