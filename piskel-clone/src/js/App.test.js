import App from './App';

describe('App', () => {
  it('Should have method start', () => {
    const piskelScreens = [1, 2, 3];
    const piskelComponents = [1, 2, 3];

    const app = new App(piskelScreens, piskelComponents);

    let result;
    if (app.start) {
      result = true;
    } else {
      result = false;
    }
    expect(result).toEqual(true);
  });
});
