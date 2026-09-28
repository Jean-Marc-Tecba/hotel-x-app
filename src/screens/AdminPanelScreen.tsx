import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useHotel } from '../context/HotelContext';
import { EstadoHabitacion } from '../types/hotel';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminPanel'>;

export default function AdminPanelScreen({ navigation }: Props) {
  const { habitaciones, reservas, actualizarEstadoReserva, actualizarEstadoHabitacion } = useHotel();
  const [seccion, setSeccion] = useState<'reservas' | 'habitaciones'>('reservas');

  const cerrarSesion = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.tituloPanel}>Panel Administrativo</Text>
        <Pressable onPress={cerrarSesion}>
          <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
        </Pressable>
      </View>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, seccion === 'reservas' && styles.tabActivo]}
          onPress={() => setSeccion('reservas')}
        >
          <Text style={[styles.tabTexto, seccion === 'reservas' && styles.tabTextoActivo]}>
            Reservas ({reservas.length})
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, seccion === 'habitaciones' && styles.tabActivo]}
          onPress={() => setSeccion('habitaciones')}
        >
          <Text style={[styles.tabTexto, seccion === 'habitaciones' && styles.tabTextoActivo]}>
            Habitaciones
          </Text>
        </Pressable>
      </View>

      {seccion === 'reservas' ? (
        reservas.length === 0 ? (
          <View style={styles.vacio}>
            <Text style={styles.vacioTexto}>Aún no hay solicitudes de reserva.</Text>
          </View>
        ) : (
          reservas.map((reserva) => {
            const habitacion = habitaciones.find((h) => h.id === reserva.habitacionId);
            return (
              <View key={reserva.id} style={styles.card}>
                <Text style={styles.cardTitulo}>{habitacion?.nombre ?? 'Habitación no encontrada'}</Text>
                <Text style={styles.cardTexto}>Cliente: {reserva.nombreCliente}</Text>
                <Text style={styles.cardTexto}>Teléfono: {reserva.telefono}</Text>
                <Text style={styles.cardTexto}>
                  {reserva.fechaEntrada} → {reserva.fechaSalida}
                </Text>
                <Text style={estadoReservaStyle(reserva.estado)}>Estado: {reserva.estado}</Text>

                {reserva.estado === 'pendiente' && (
                  <View style={styles.accionesFila}>
                    <Pressable
                      style={[styles.accionBoton, styles.confirmar]}
                      onPress={() => actualizarEstadoReserva(reserva.id, 'confirmada')}
                    >
                      <Text style={styles.accionTexto}>Confirmar</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.accionBoton, styles.cancelar]}
                      onPress={() => actualizarEstadoReserva(reserva.id, 'cancelada')}
                    >
                      <Text style={styles.accionTexto}>Cancelar</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            );
          })
        )
      ) : (
        habitaciones.map((habitacion) => (
          <View key={habitacion.id} style={styles.card}>
            <Text style={styles.cardTitulo}>{habitacion.nombre}</Text>
            <Text style={styles.cardTexto}>Estado actual: {habitacion.estado}</Text>
            <View style={styles.accionesFila}>
              {(['disponible', 'reservada', 'ocupada'] as EstadoHabitacion[]).map((estado) => (
                <Pressable
                  key={estado}
                  style={[
                    styles.accionBoton,
                    habitacion.estado === estado ? styles.accionSeleccionada : styles.accionNormal,
                  ]}
                  onPress={() => actualizarEstadoHabitacion(habitacion.id, estado)}
                >
                  <Text style={habitacion.estado === estado ? styles.accionTexto : styles.accionTextoNormal}>
                    {estado}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  );
}

function estadoReservaStyle(estado: string) {
  const color = estado === 'confirmada' ? '#2e7d32' : estado === 'cancelada' ? '#c62828' : '#ef6c00';
  return { fontSize: 13, fontWeight: '600' as const, color, marginTop: 6 };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  encabezado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tituloPanel: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  cerrarSesion: { color: '#c62828', fontSize: 14, fontWeight: '600' },
  tabs: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#eee', borderRadius: 8, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  tabActivo: { backgroundColor: '#0f2f3c' },
  tabTexto: { color: '#444', fontWeight: '600' },
  tabTextoActivo: { color: '#fff' },
  vacio: { alignItems: 'center', marginTop: 40 },
  vacioTexto: { color: '#888' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12 },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', color: '#1a1a1a' },
  cardTexto: { fontSize: 14, color: '#555', marginTop: 2 },
  accionesFila: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  accionBoton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  confirmar: { backgroundColor: '#2e7d32' },
  cancelar: { backgroundColor: '#c62828' },
  accionSeleccionada: { backgroundColor: '#0f2f3c' },
  accionNormal: { backgroundColor: '#ddd' },
  accionTexto: { color: '#fff', fontWeight: '600', fontSize: 13 },
  accionTextoNormal: { color: '#333', fontWeight: '600', fontSize: 13 },
});