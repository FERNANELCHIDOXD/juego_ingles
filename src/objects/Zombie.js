import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

/**
 * Clase Zombie
 * Enemigo que persigue continuamente la posición del jugador.
 */
export class Zombie extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'zombie');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCircle(GAME_CONFIG.ZOMBIE_RADIUS);

    // Asignar una velocidad aleatoria dentro del rango configurado
    this.speed = Phaser.Math.Between(
      GAME_CONFIG.ZOMBIE_SPEED_MIN,
      GAME_CONFIG.ZOMBIE_SPEED_MAX
    );
  }

  update() {
    // Si el jugador existe y está activo, perseguirlo
    const player = this.scene.player;
    if (player && player.active) {
      this.scene.physics.moveToObject(this, player, this.speed);
      const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
      this.setRotation(angle);
    } else {
      this.setVelocity(0, 0);
    }
  }
}
