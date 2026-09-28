import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminLogin'>;

const USUARIO_VALIDO = 'admin';
const CLAVE_VALIDA = 'admin123';

export default function AdminLoginScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

const ingresar = () => {
  const usuarioLimpio = usuario.trim().toLowerCase();
  const claveLimpia = clave.trim();

  if (!usuarioLimpio || !claveLimpia) {
    Alert.alert('Datos incompletos', 'Debes ingresar usuario y contraseña.');
    return;
  }

  if (usuarioLimpio === USUARIO_VALIDO && claveLimpia === CLAVE_VALIDA) {
    navigation.replace('AdminPanel');
  } else {
    Alert.alert('Acceso denegado', 'Usuario o contraseña incorrectos.');
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Acceso del personal</Text>
      <Text style={styles.subtitulo}>Ingresa tus credenciales para gestionar HOTEL X.</Text>

      <Text style={styles.etiqueta}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
        placeholder="admin"
      />

      <Text style={styles.etiqueta}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={clave}
        onChangeText={setClave}
        secureTextEntry
        autoCapitalize="none"
        placeholder="••••••••"
      />

      <Pressable style={styles.boton} onPress={ingresar}>
        <Text style={styles.botonTexto}>Ingresar</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subtitulo: { fontSize: 14, color: '#666', marginTop: 6, marginBottom: 24 },
  etiqueta: { fontSize: 13, color: '#555', marginBottom: 4, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  boton: { backgroundColor: '#0f2f3c', padding: 14, borderRadius: 8, marginTop: 24, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});