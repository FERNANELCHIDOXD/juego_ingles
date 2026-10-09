/**
 * Configuración global del juego: constantes y ajustes de balance.
 * Todas las velocidades, vidas y valores numéricos son editables aquí.
 */

export const GAME_CONFIG = {
  // Dimensiones del lienzo de juego (800x600 según requisitos)
  WIDTH: 800,
  HEIGHT: 600,

  // Configuración del jugador
  PLAYER_SPEED: 220,             // Velocidad de movimiento con teclas WASD
  PLAYER_LIVES: 3,               // Vidas máximas iniciales (corazones)
  PLAYER_RADIUS: 16,             // Radio del círculo del jugador
  PLAYER_COLOR: 0x2563eb,        // Azul (cuerpo principal)
  PLAYER_CANNON_COLOR: 0x93c5fd, // Azul claro (indicador de apuntado)

  // Configuración de las balas
  BULLET_SPEED: 550,             // Velocidad de desplazamiento de la bala
  BULLET_RADIUS: 5,              // Radio del círculo de la bala
  BULLET_COLOR: 0xfacc15,        // Amarillo
  FIRE_RATE: 200,                // Milisegundos mínimos entre disparos

  // Configuración de los zombis
  ZOMBIE_SPEED_MIN: 70,          // Velocidad mínima de un zombi
  ZOMBIE_SPEED_MAX: 120,         // Velocidad máxima de un zombi
  ZOMBIE_RADIUS: 14,             // Radio del círculo del zombi
  ZOMBIE_COLOR: 0x22c55e,        // Verde
  ZOMBIE_SPAWN_INTERVAL: 1200,   // Intervalo de aparición de zombis en milisegundos
  ZOMBIE_POINTS: 10,             // Puntos otorgados al eliminar un zombi

  // Configuración visual de los corazones (vidas)
  HEART_COLOR: 0xef4444,         // Rojo
  HEART_SIZE: 20,                // Tamaño de la textura del corazón
};
