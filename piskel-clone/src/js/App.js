export default class App {
  constructor(screens, components) {
    this.screens = screens;
    this.components = components;
  }

  start() {
    this.screens.forEach((i) => {
      if (i.render) {
        i.render();
      }
      if (i.setEvents) {
        i.setEvents();
      }
    });
    this.components.forEach((i) => {
      if (i.setEvents) {
        i.setEvents();
      }
    });
  }
}
