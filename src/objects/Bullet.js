import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

/**
 * Clase Bullet
 * Proyectil disparado por el jugador en dirección al cursor del ratón.
 */
export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCircle(GAME_CONFIG.BULLET_RADIUS);
  }

  /**
   * Dispara la bala desde una posición inicial hacia un objetivo
   * @param {number} x Posición X de origen
   * @param {number} y Posición Y de origen
   * @param {number} targetX Coordenada X objetivo
   * @param {number} targetY Coordenada Y objetivo
   */
  fire(x, y, targetX, targetY) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);

    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    this.setRotation(angle);

    // Calcular componentes de velocidad según el ángulo
    const vx = Math.cos(angle) * GAME_CONFIG.BULLET_SPEED;
    const vy = Math.sin(angle) * GAME_CONFIG.BULLET_SPEED;
    this.setVelocity(vx, vy);
  }

  update() {
    // Si la bala sale de los límites de la pantalla, se destruye
    if (
      this.x < -20 ||
      this.x > GAME_CONFIG.WIDTH + 20 ||
      this.y < -20 ||
      this.y > GAME_CONFIG.HEIGHT + 20
    ) {
      this.destroy();
    }
  }
}
