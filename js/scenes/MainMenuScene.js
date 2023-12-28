class Loader extends Phaser.GameObjects.Container {
  constructor (scene, value) {
    super(scene);

    scene.add.rectangle(
      0,
      0,
      scene.cameras.main.width,
      scene.cameras.main.height,
      COLORS.black
    ).setOrigin(0);

    scene.add.text(
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2,
      `Loading... ${Math.floor(value * 100)}%`,
      { ...FONT_STYLE }
    ).setOrigin(0.5);
  }
}

const createMainButton = (scene, x, y, text, callback) => {
  const btnWidth = 400;
  const btnHeight = 120;

  // const btn = scene.add.rectangle(x, y, btnWidth, btnHeight, colors.black);
  const btn = scene.add.sprite(x, y, 'button');
  // btn.setScale(0.8);
  btn.setInteractive({ cursor: 'pointer' });
  btn.on('pointerdown', () => {
    scene.tweens.add({
      targets: btn,
      scale: 0.8,
      duration: 150,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: callback
    });
  });
  // btn.on('pointerup', callback);

  scene.add.text(
    x,
    y - 5,
    text,
    { ...FONT_STYLE, fill: '#fff' }
  ).setOrigin(0.5);
};

class MainMenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MainMenuScene' });
  }

  preload () {
    // historyData = [];
    // this.logs = localStorage.getItem('game-log');
    // if (this.logs) {
    //   this.historyList = JSON.parse(this.logs);
    //   this.historyList.map((list, i) => {
    //     historyData.push(list);
    //   });
    // }
    this.load.image('background', './img/main-bg.jpg');
    this.load.image('close', './img/icons/close-btn.png');
    this.load.image('button', './img/icons/button.png');
    this.load.image('pick-menu', './img/menu-bg.png');
    this.load.image('forest-board', './img/Board1.png');
    this.load.image('space-board', './img/Board2.png');
    this.load.image('forest-img', './img/board-img1.png');
    this.load.image('space-img', './img/board-img2.png');
    this.load.on('progress', (value) => {
      this.loader = new Loader(this, value);
    });
  }

  create () {
    this.load.on('complete', () => {
      this.children.remove(this.loader);
    });

    const bg = this.add.sprite(0, 0, 'background').setOrigin(0);
    // const bg = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0xdddddd).setOrigin(0);

    const title = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 4,
      'SnadderMath',
      { ...FONT_STYLE, fontSize: '60px' }
    ).setOrigin(0.5).setStroke(0x000000, 5);

    this.tweens.add({
      targets: title,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const btnX = bg.width / 2;
    const initBtnY = bg.height / 2;
    createMainButton(this, btnX, initBtnY - 100, "Play Game", () => {
      this.scene.pause(this);
      this.scene.launch('PickPlayerMenu');
    });
    // createMainButton(this, btnX, initBtnY + 200, "Win History", () => {
    //   this.scene.start('HistoryScene', historyData);
    // });
    createMainButton(this, btnX, initBtnY + 100, "How to Play", () => {
      this.scene.pause(this);
      this.scene.launch('HowtoPlayMenu');
    });

    this.add.text(20, this.game.config.height - 40, gameId, { fontSize: '20px', fill: '#fff', fontStyle: 'bold' });
  }
}
