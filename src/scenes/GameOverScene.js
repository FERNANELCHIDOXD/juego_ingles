import Phaser from 'phaser';
import { GAME_CONFIG } from '../config.js';

/**
 * Escena de Fin de Partida (GameOverScene)
 * Muestra el puntaje obtenido y permite reiniciar el juego con la tecla ESPACIO o haciendo clic.
 */
export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    const centerX = GAME_CONFIG.WIDTH / 2;
    const centerY = GAME_CONFIG.HEIGHT / 2;

    // Título "GAME OVER"
    const titleText = this.add.text(centerX, centerY - 90, 'GAME OVER', {
      fontSize: '52px',
      color: '#ef4444',
      fontStyle: 'bold',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    });
    titleText.setOrigin(0.5);

    // Puntaje final alcanzado
    const scoreText = this.add.text(
      centerX,
      centerY - 15,
      `Puntaje final: ${this.finalScore}`,
      {
        fontSize: '26px',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }
    );
    scoreText.setOrigin(0.5);

    // Mensaje de reinicio interactivo
    const restartText = this.add.text(
      centerX,
      centerY + 70,
      'Presiona ESPACIO o haz clic para reiniciar',
      {
        fontSize: '18px',
        color: '#94a3b8',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }
    );
    restartText.setOrigin(0.5);

    // Animación suave de parpadeo para invitar a la acción
    this.tweens.add({
      targets: restartText,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    // Reinicio al presionar ESPACIO
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spaceKey.once('down', () => this.restartGame());

    // Reinicio al hacer clic con el ratón
    this.input.once('pointerdown', () => this.restartGame());
  }

  /**
   * Reinicia la escena principal del juego
   */
  restartGame() {
    this.scene.start('GameScene');
  }
}
