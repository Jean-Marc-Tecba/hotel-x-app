import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useHotel } from '../context/HotelContext';
import { Habitacion } from '../types/hotel';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Catalogo'>;

export default function CatalogoScreen({ navigation }: Props) {
  const { habitaciones } = useHotel();
  const renderItem = ({ item }: { item: Habitacion }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('DetalleHabitacion', { habitacionId: item.id })}
    >
      <Image source={item.imagen} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
        <View style={styles.filaInferior}>
          <Text style={styles.precio}>Bs {item.precioPorNoche} / noche</Text>
          <Text style={estadoStyle(item.estado)}>{etiquetaEstado(item.estado)}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={habitaciones}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.lista}
    />
  );
}

function etiquetaEstado(estado: Habitacion['estado']): string {
  if (estado === 'disponible') return 'Disponible';
  if (estado === 'reservada') return 'Reservada';
  return 'Ocupada';
}

function estadoStyle(estado: Habitacion['estado']) {
  const color = estado === 'disponible' ? '#2e7d32' : estado === 'reservada' ? '#ef6c00' : '#c62828';
  return { fontSize: 13, fontWeight: '600' as const, color };
}

const styles = StyleSheet.create({
  lista: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagen: { width: '100%', height: 160 },
  info: { padding: 12 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  descripcion: { fontSize: 14, color: '#666', marginTop: 4 },
  filaInferior: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
precio: { fontSize: 15, fontWeight: '700', color: '#c9a24b' },
});