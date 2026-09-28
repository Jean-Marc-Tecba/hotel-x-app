import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habitacion, Reserva, EstadoHabitacion, EstadoReserva } from '../types/hotel';
import { habitaciones as habitacionesIniciales } from '../data/habitaciones';

const CLAVE_HABITACIONES = '@hotelx_habitaciones';
const CLAVE_RESERVAS = '@hotelx_reservas';

interface HotelContextType {
  habitaciones: Habitacion[];
  reservas: Reserva[];
  cargando: boolean;
  agregarReserva: (reserva: Reserva) => Promise<void>;
  actualizarEstadoReserva: (id: string, estado: EstadoReserva) => Promise<void>;
  actualizarEstadoHabitacion: (id: string, estado: EstadoHabitacion) => Promise<void>;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export function HotelProvider({ children }: { children: ReactNode }) {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>(habitacionesIniciales);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const habGuardadas = await AsyncStorage.getItem(CLAVE_HABITACIONES);
        const resGuardadas = await AsyncStorage.getItem(CLAVE_RESERVAS);
        if (habGuardadas) setHabitaciones(JSON.parse(habGuardadas));
        if (resGuardadas) setReservas(JSON.parse(resGuardadas));
      } catch (error) {
        console.log('Error cargando datos guardados:', error);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const guardarHabitaciones = async (nuevas: Habitacion[]) => {
    setHabitaciones(nuevas);
    await AsyncStorage.setItem(CLAVE_HABITACIONES, JSON.stringify(nuevas));
  };

  const guardarReservas = async (nuevas: Reserva[]) => {
    setReservas(nuevas);
    await AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(nuevas));
  };

  const agregarReserva = async (reserva: Reserva) => {
    await guardarReservas([reserva, ...reservas]);
  };

  const actualizarEstadoReserva = async (id: string, estado: EstadoReserva) => {
    const actualizadas = reservas.map((r) => (r.id === id ? { ...r, estado } : r));
    await guardarReservas(actualizadas);

    if (estado === 'confirmada') {
      const reserva = reservas.find((r) => r.id === id);
      if (reserva) {
        await actualizarEstadoHabitacion(reserva.habitacionId, 'reservada');
      }
    }
  };

  const actualizarEstadoHabitacion = async (id: string, estado: EstadoHabitacion) => {
    const actualizadas = habitaciones.map((h) => (h.id === id ? { ...h, estado } : h));
    await guardarHabitaciones(actualizadas);
  };

  return (
    <HotelContext.Provider
      value={{ habitaciones, reservas, cargando, agregarReserva, actualizarEstadoReserva, actualizarEstadoHabitacion }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const contexto = useContext(HotelContext);
  if (!contexto) throw new Error('useHotel debe usarse dentro de un HotelProvider');
  return contexto;
}