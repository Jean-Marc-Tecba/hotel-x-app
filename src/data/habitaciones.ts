import { Habitacion } from '../types/hotel';

export const habitaciones: Habitacion[] = [
  {
    id: '1',
    nombre: 'Habitación Simple',
    descripcion: 'Habitación individual con cama de una plaza, escritorio y baño privado.',
    precioPorNoche: 150,
    capacidad: 1,
    imagen: require('../../assets/rooms/simple.jpg'),
    estado: 'disponible',
  },
  {
    id: '2',
    nombre: 'Habitación Doble',
    descripcion: 'Habitación con dos camas, ideal para viajeros que comparten estadía.',
    precioPorNoche: 220,
    capacidad: 2,
    imagen: require('../../assets/rooms/doble.jpg'),
    estado: 'disponible',
  },
  {
    id: '3',
    nombre: 'Suite Familiar',
    descripcion: 'Amplia suite con sala de estar, ideal para familias.',
    precioPorNoche: 350,
    capacidad: 4,
    imagen: require('../../assets/rooms/suite.jpg'),
    estado: 'reservada',
  },
];