import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

/**
 * Clase Player
 * Representa al jugador: círculo azul controlado mediante teclado WASD
 * y que rota apuntando a la posición del cursor del ratón.
 */
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    // Añadir a la escena y al sistema de físicas Arcade
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Ajustar cuerpo físico circular y límites del mundo
    this.setCircle(GAME_CONFIG.PLAYER_RADIUS);
    this.setCollideWorldBounds(true);

    // Vidas e invulnerabilidad temporal tras recibir daño
    this.lives = GAME_CONFIG.PLAYER_LIVES;
    this.isInvulnerable = false;

    // Configurar teclas WASD
    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.handleMovement();
    this.handleAiming();
  }

  /**
   * Maneja el movimiento bidireccional con teclas WASD
   */
  handleMovement() {
    let vx = 0;
    let vy = 0;

    if (this.keys.left.isDown) {
      vx -= 1;
    }
    if (this.keys.right.isDown) {
      vx += 1;
    }
    if (this.keys.up.isDown) {
      vy -= 1;
    }
    if (this.keys.down.isDown) {
      vy += 1;
    }

    // Normalizar vector para evitar que el movimiento en diagonal sea más veloz
    if (vx !== 0 || vy !== 0) {
      const direction = new Phaser.Math.Vector2(vx, vy).normalize();
      this.setVelocity(
        direction.x * GAME_CONFIG.PLAYER_SPEED,
        direction.y * GAME_CONFIG.PLAYER_SPEED
      );
    } else {
      this.setVelocity(0, 0);
    }
  }

  /**
   * Rota el jugador hacia la posición del cursor del ratón
   */
  handleAiming() {
    const pointer = this.scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
    this.setRotation(angle);
  }

  /**
   * Aplica daño al jugador si no está en periodo de invulnerabilidad
   * @returns {boolean} Retorna true si recibió daño
   */
  takeDamage() {
    if (this.isInvulnerable || this.lives <= 0) {
      return false;
    }

    this.lives -= 1;
    this.isInvulnerable = true;

    // Efecto visual de parpadeo temporal
    this.scene.tweens.add({
      targets: this,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 4,
      onComplete: () => {
        this.setAlpha(1);
        this.isInvulnerable = false;
      },
    });

    return true;
  }
}
