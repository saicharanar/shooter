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

  const drawScreen = (view) => {
    const { left, top, right, bottom } = view.dimensions;
    const screen = document.createElement('screen');
    screen.id = 'screen';
    screen.style.left = px(left);
    screen.style.top = px(top);
    screen.style.width = px(right - left);
    screen.style.height = px(bottom - top);
    document.body.appendChild(screen);
  };

  const startGame = () => {
    const view = new View({ left: 80, top: 80, right: 1800, bottom: 800 });
    drawScreen(view);
  };

  window.onload = startGame;
})();
