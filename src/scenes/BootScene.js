import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

/**
 * Escena de arranque (BootScene)
 * Se encarga de generar texturas procedimentales mediante Phaser Graphics
 * sin necesidad de cargar assets externos en esta fase.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    // Generar texturas necesarias
    this.createPlayerTexture();
    this.createBulletTexture();
    this.createZombieTexture();
    this.createHeartTexture();

    // Iniciar la escena principal de juego
    this.scene.start('GameScene');
  }

  /**
   * Genera la textura del jugador: círculo azul con un indicador frontal de dirección.
   */
  createPlayerTexture() {
    const size = GAME_CONFIG.PLAYER_RADIUS * 2;
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    // Cuerpo circular azul
    g.fillStyle(GAME_CONFIG.PLAYER_COLOR, 1);
    g.fillCircle(GAME_CONFIG.PLAYER_RADIUS, GAME_CONFIG.PLAYER_RADIUS, GAME_CONFIG.PLAYER_RADIUS);

    // Indicador frontal (hacia la derecha en rotación 0 rad)
    g.fillStyle(GAME_CONFIG.PLAYER_CANNON_COLOR, 1);
    g.fillCircle(size - 4, GAME_CONFIG.PLAYER_RADIUS, 4);

    g.generateTexture('player', size, size);
    g.destroy();
  }

  /**
   * Genera la textura de la bala: círculo amarillo pequeño.
   */
  createBulletTexture() {
    const size = GAME_CONFIG.BULLET_RADIUS * 2;
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    g.fillStyle(GAME_CONFIG.BULLET_COLOR, 1);
    g.fillCircle(GAME_CONFIG.BULLET_RADIUS, GAME_CONFIG.BULLET_RADIUS, GAME_CONFIG.BULLET_RADIUS);

    g.generateTexture('bullet', size, size);
    g.destroy();
  }

  /**
   * Genera la textura del zombi: círculo verde.
   */
  createZombieTexture() {
    const size = GAME_CONFIG.ZOMBIE_RADIUS * 2;
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    // Cuerpo circular verde
    g.fillStyle(GAME_CONFIG.ZOMBIE_COLOR, 1);
    g.fillCircle(GAME_CONFIG.ZOMBIE_RADIUS, GAME_CONFIG.ZOMBIE_RADIUS, GAME_CONFIG.ZOMBIE_RADIUS);

    // Ojos oscuros de zombi
    g.fillStyle(0x14532d, 1);
    g.fillCircle(GAME_CONFIG.ZOMBIE_RADIUS + 3, GAME_CONFIG.ZOMBIE_RADIUS - 4, 2.5);
    g.fillCircle(GAME_CONFIG.ZOMBIE_RADIUS + 3, GAME_CONFIG.ZOMBIE_RADIUS + 4, 2.5);

    g.generateTexture('zombie', size, size);
    g.destroy();
  }

  /**
   * Genera la textura del corazón para el indicador de vidas.
   */
  createHeartTexture() {
    const size = GAME_CONFIG.HEART_SIZE;
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    g.fillStyle(GAME_CONFIG.HEART_COLOR, 1);
    const r = size * 0.28;
    g.fillCircle(size * 0.32, size * 0.32, r);
    g.fillCircle(size * 0.68, size * 0.32, r);

    g.beginPath();
    g.moveTo(size * 0.04, size * 0.35);
    g.lineTo(size * 0.5, size * 0.95);
    g.lineTo(size * 0.96, size * 0.35);
    g.closePath();
    g.fillPath();

    g.generateTexture('heart', size, size);
    g.destroy();
  }
}
