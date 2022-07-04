(function () {
  const px = (val) => `${val}px`;

  class View {
    #dimensions;
    constructor(dimensions) {
      this.#dimensions = dimensions;
    }

    get dimensions() {
      const { left, top, right, bottom } = this.#dimensions;
      return { left, top, right, bottom };
    }

    get randomPoint() {
      const { left, top, right, bottom } = this.#dimensions;
      const x = Math.ceil(Math.random() * right - left);
      const y = Math.ceil(Math.random() * bottom - top);
      return { x, y };
    }
  }

  class Player {
    #src;
    #position;
    #speed;
    constructor(src, position, speed) {
      this.#src = src;
      this.#position = position;
      this.#speed = speed;
    }

    getCoordinates() {
      const { x, y } = this.#position;
      return { x, y };
    }

    moveUp() {
      this.#position.y -= this.#speed.dy;
    }

    moveDown() {
      this.#position.y += this.#speed.dy;
    }

    moveLeft() {
      this.#position.x -= this.#speed.dx;
    }

    moveRight() {
      this.#position.x += this.#speed.dx;
    }
  }

  const createScreen = (view) => {
    const { left, top, right, bottom } = view.dimensions;
    const screen = document.createElement('screen');
    screen.id = 'screen';
    screen.style.left = px(left);
    screen.style.top = px(top);
    screen.style.width = px(right - left);
    screen.style.height = px(bottom - top);
    document.body.appendChild(screen);
    return screen;
  };

  const updatePlayerPos = (event, player) => {
    const { key } = event;
    if (key === 'ArrowUp') {
      player.moveUp();
    }

    if (key === 'ArrowDown') {
      player.moveDown();
    }

    if (key === 'ArrowLeft') {
      player.moveLeft();
    }

    if (key === 'ArrowRight') {
      player.moveRight();
    }
  };

  const drawPlayer = (screen, player) => {
    const { x, y } = player.getCoordinates();
    const playerSprite = document.createElement('img');
    playerSprite.id = 'player';
    playerSprite.style.left = x;
    playerSprite.style.top = y;
    screen.appendChild(playerSprite);
  };

  const createPlayer = () => {
    const player = new Player('_', { x: 250, y: 100 }, { dx: 3, dy: 3 });
    return player;
  };

  const removeAllChildren = (screen) => {
    const children = screen.children;
    for (const child of children) {
      screen.removeChild(child);
    }
  };

  const redrawScreen = (screen, player) => {
    if (screen.children) {
      removeAllChildren(screen);
    }
    drawPlayer(screen, player);
  };

  const startGame = () => {
    const view = new View({ left: 80, top: 80, right: 1800, bottom: 800 });
    const screen = createScreen(view);
    const player = createPlayer();
    drawPlayer(screen, player);

    window.onkeydown = (event) => {
      updatePlayerPos(event, player);
      redrawScreen(screen, player);
    };
  };

  window.onload = startGame;
})();
