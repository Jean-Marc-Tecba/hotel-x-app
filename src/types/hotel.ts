import { ImageSourcePropType } from 'react-native';

export type EstadoHabitacion = 'disponible' | 'reservada' | 'ocupada';

export interface Habitacion {
  id: string;
  nombre: string;
  descripcion: string;
  precioPorNoche: number;
  capacidad: number;
  imagen: ImageSourcePropType;
  estado: EstadoHabitacion;
}

export type EstadoReserva = 'pendiente' | 'confirmada' | 'cancelada';

export interface Reserva {
  id: string;
  habitacionId: string;
  nombreCliente: string;
  telefono: string;
  fechaEntrada: string;
  fechaSalida: string;
  estado: EstadoReserva;
}