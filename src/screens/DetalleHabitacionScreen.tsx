import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Pressable, Alert, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useHotel } from '../context/HotelContext';
import { Reserva } from '../types/hotel';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalleHabitacion'>;

function generarId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function formatearFecha(fecha: Date): string {
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export default function DetalleHabitacionScreen({ route }: Props) {
  const { habitacionId } = route.params;
  const { habitaciones, agregarReserva } = useHotel();
  const habitacion = habitaciones.find((h) => h.id === habitacionId);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState<Date | null>(null);
  const [fechaSalida, setFechaSalida] = useState<Date | null>(null);
  const [mostrarPickerEntrada, setMostrarPickerEntrada] = useState(false);
  const [mostrarPickerSalida, setMostrarPickerSalida] = useState(false);

  if (!habitacion) {
    return (
      <View style={styles.centrado}>
        <Text>No se encontró la habitación seleccionada.</Text>
      </View>
    );
  }

  const puedeReservar = habitacion.estado === 'disponible';

  const onCambiarFechaEntrada = (event: DateTimePickerEvent, fecha?: Date) => {
    setMostrarPickerEntrada(Platform.OS === 'ios');
    if (event.type === 'set' && fecha) {
      setFechaEntrada(fecha);
    }
  };

  const onCambiarFechaSalida = (event: DateTimePickerEvent, fecha?: Date) => {
    setMostrarPickerSalida(Platform.OS === 'ios');
    if (event.type === 'set' && fecha) {
      setFechaSalida(fecha);
    }
  };

  const enviarSolicitud = async () => {
    if (!nombre.trim() || !telefono.trim() || !fechaEntrada || !fechaSalida) {
      Alert.alert('Datos incompletos', 'Por favor completa todos los campos antes de continuar.');
      return;
    }

    if (fechaSalida <= fechaEntrada) {
      Alert.alert('Fechas inválidas', 'La fecha de salida debe ser posterior a la fecha de entrada.');
      return;
    }

    const nuevaReserva: Reserva = {
      id: generarId(),
      habitacionId: habitacion.id,
      nombreCliente: nombre.trim(),
      telefono: telefono.trim(),
      fechaEntrada: formatearFecha(fechaEntrada),
      fechaSalida: formatearFecha(fechaSalida),
      estado: 'pendiente',
    };

    await agregarReserva(nuevaReserva);

    Alert.alert(
      'Solicitud enviada',
      `Gracias ${nombre}, tu solicitud para "${habitacion.nombre}" fue registrada. El hotel se pondrá en contacto contigo al ${telefono}.`
    );

    setNombre('');
    setTelefono('');
    setFechaEntrada(null);
    setFechaSalida(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={habitacion.imagen} style={styles.imagen} />
      <View style={styles.contenido}>
        <Text style={styles.nombre}>{habitacion.nombre}</Text>
        <Text style={styles.descripcion}>{habitacion.descripcion}</Text>
        <Text style={styles.detalle}>Capacidad: {habitacion.capacidad} persona(s)</Text>
        <Text style={styles.precio}>Bs {habitacion.precioPorNoche} / noche</Text>

        {puedeReservar ? (
          <View style={styles.formulario}>
            <Text style={styles.tituloForm}>Solicitar reserva</Text>

            <Text style={styles.etiqueta}>Nombre completo</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej. Juan Pérez" />

            <Text style={styles.etiqueta}>Teléfono de contacto</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Ej. 70000000"
              keyboardType="phone-pad"
            />

            <Text style={styles.etiqueta}>Fecha de entrada</Text>
            <Pressable style={styles.inputFecha} onPress={() => setMostrarPickerEntrada(true)}>
              <Text style={fechaEntrada ? styles.textoFecha : styles.textoFechaPlaceholder}>
                {fechaEntrada ? formatearFecha(fechaEntrada) : 'Selecciona una fecha'}
              </Text>
            </Pressable>
            {mostrarPickerEntrada && (
              <DateTimePicker
                value={fechaEntrada ?? new Date()}
                mode="date"
                minimumDate={new Date()}
                onChange={onCambiarFechaEntrada}
              />
            )}

            <Text style={styles.etiqueta}>Fecha de salida</Text>
            <Pressable style={styles.inputFecha} onPress={() => setMostrarPickerSalida(true)}>
              <Text style={fechaSalida ? styles.textoFecha : styles.textoFechaPlaceholder}>
                {fechaSalida ? formatearFecha(fechaSalida) : 'Selecciona una fecha'}
              </Text>
            </Pressable>
            {mostrarPickerSalida && (
              <DateTimePicker
                value={fechaSalida ?? fechaEntrada ?? new Date()}
                mode="date"
                minimumDate={fechaEntrada ?? new Date()}
                onChange={onCambiarFechaSalida}
              />
            )}

            <Pressable style={styles.boton} onPress={enviarSolicitud}>
              <Text style={styles.botonTexto}>Enviar solicitud</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.avisoNoDisponible}>
            <Text style={styles.avisoTexto}>Esta habitación no está disponible por el momento.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagen: { width: '100%', height: 220 },
  contenido: { padding: 20 },
  nombre: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  descripcion: { fontSize: 15, color: '#444', marginTop: 8, lineHeight: 21 },
  detalle: { fontSize: 14, color: '#666', marginTop: 10 },
  precio: { fontSize: 18, fontWeight: '700', color: '#c9a24b', marginTop: 6, marginBottom: 20 },
  formulario: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 16 },
  tituloForm: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1a1a1a' },
  etiqueta: { fontSize: 13, color: '#555', marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  inputFecha: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  textoFecha: { fontSize: 15, color: '#1a1a1a' },
  textoFechaPlaceholder: { fontSize: 15, color: '#999' },
  boton: { backgroundColor: '#0f2f3c', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  avisoNoDisponible: { backgroundColor: '#fdecea', padding: 14, borderRadius: 8 },
  avisoTexto: { color: '#c62828', fontSize: 14 },
});