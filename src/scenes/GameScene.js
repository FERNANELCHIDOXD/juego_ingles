import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';
import { Player } from '../objects/Player.js';
import { Bullet } from '../objects/Bullet.js';
import { Zombie } from '../objects/Zombie.js';

/**
 * Escena principal del juego (GameScene)
 * Contiene la lógica central: aparición de zombis, disparos,
 * colisiones, puntuación y control de vidas.
 */
export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.score = 0;
    this.lastFiredTime = 0;

    // Crear al jugador en el centro de la pantalla
    const centerX = GAME_CONFIG.WIDTH / 2;
    const centerY = GAME_CONFIG.HEIGHT / 2;
    this.player = new Player(this, centerX, centerY);

    // Grupos de físicas para balas y zombis
    this.bullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });

    this.zombies = this.physics.add.group({
      classType: Zombie,
      runChildUpdate: true,
    });

    // Colisiones: Bala impacta a Zombi
    this.physics.add.overlap(
      this.bullets,
      this.zombies,
      this.handleBulletHitZombie,
      null,
      this
    );

    // Colisiones: Zombi impacta al Jugador
    this.physics.add.overlap(
      this.player,
      this.zombies,
      this.handleZombieHitPlayer,
      null,
      this
    );

    // Temporizador para aparición continua de zombis
    this.spawnTimer = this.time.addEvent({
      delay: GAME_CONFIG.ZOMBIE_SPAWN_INTERVAL,
      callback: this.spawnZombie,
      callbackScope: this,
      loop: true,
    });

    // Crear elementos de la interfaz de usuario (HUD)
    this.createHUD();
  }

  update(time, delta) {
    if (!this.player || !this.player.active) {
      return;
    }

    // Actualizar jugador (movimiento WASD y rotación al ratón)
    this.player.update();

    // Disparar si el botón del ratón está presionado y pasó el cooldown
    if (this.input.activePointer.isDown && time > this.lastFiredTime + GAME_CONFIG.FIRE_RATE) {
      this.shootBullet();
      this.lastFiredTime = time;
    }
  }

  /**
   * Dispara una bala desde la posición del jugador hacia el puntero del ratón
   */
  shootBullet() {
    const pointer = this.input.activePointer;
    const bullet = new Bullet(this, this.player.x, this.player.y);
    this.bullets.add(bullet);
    bullet.fire(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
  }

  /**
   * Genera un zombi aleatoriamente desde uno de los cuatro bordes de la pantalla
   */
  spawnZombie() {
    let x;
    let y;
    const offset = 30; // Posición justo fuera de la vista
    const edge = Phaser.Math.Between(0, 3);

    switch (edge) {
      case 0: // Borde superior
        x = Phaser.Math.Between(0, GAME_CONFIG.WIDTH);
        y = -offset;
        break;
      case 1: // Borde derecho
        x = GAME_CONFIG.WIDTH + offset;
        y = Phaser.Math.Between(0, GAME_CONFIG.HEIGHT);
        break;
      case 2: // Borde inferior
        x = Phaser.Math.Between(0, GAME_CONFIG.WIDTH);
        y = GAME_CONFIG.HEIGHT + offset;
        break;
      case 3: // Borde izquierdo
      default:
        x = -offset;
        y = Phaser.Math.Between(0, GAME_CONFIG.HEIGHT);
        break;
    }

    const zombie = new Zombie(this, x, y);
    this.zombies.add(zombie);
  }

  /**
   * Resuelve el impacto de una bala con un zombi
   */
  handleBulletHitZombie(bullet, zombie) {
    bullet.destroy();
    zombie.destroy();

    // Sumar puntos y actualizar texto
    this.score += GAME_CONFIG.ZOMBIE_POINTS;
    this.scoreText.setText(`Puntos: ${this.score}`);
  }

  /**
   * Resuelve el contacto de un zombi con el jugador
   */
  handleZombieHitPlayer(player, zombie) {
    // Si el jugador recibe daño efectivo
    if (player.takeDamage()) {
      zombie.destroy();
      this.cameras.main.shake(120, 0.01);
      this.updateHeartsHUD();

      // Verificar si las vidas se agotaron
      if (player.lives <= 0) {
        this.gameOver();
      }
    }
  }

  /**
   * Construye el marcador de puntos y los iconos de vida
   */
  createHUD() {
    // Corazones de vida en la esquina superior izquierda
    this.heartIcons = [];
    for (let i = 0; i < GAME_CONFIG.PLAYER_LIVES; i++) {
      const heart = this.add.image(30 + i * 28, 30, 'heart');
      heart.setScrollFactor(0);
      this.heartIcons.push(heart);
    }

    // Texto de puntuación en la esquina superior derecha
    this.scoreText = this.add.text(GAME_CONFIG.WIDTH - 25, 25, `Puntos: ${this.score}`, {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    });
    this.scoreText.setOrigin(1, 0);
  }

  /**
   * Actualiza la visualización de los corazones según las vidas actuales
   */
  updateHeartsHUD() {
    for (let i = 0; i < this.heartIcons.length; i++) {
      this.heartIcons[i].setVisible(i < this.player.lives);
    }
  }

  /**
   * Finaliza la partida y cambia a la escena de Game Over
   */
  gameOver() {
    if (this.spawnTimer) {
      this.spawnTimer.remove();
    }
    this.scene.start('GameOverScene', { score: this.score });
  }
}
