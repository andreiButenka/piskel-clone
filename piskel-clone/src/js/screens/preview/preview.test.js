import preview from './preview';

describe('preview.setDefaultFps', () => {
  it('Should set default FPS value', () => {
    document.body.innerHTML = '<input id="frame-rate" value="3"/>'
    + '<div id="frame-rate-label">old</div>';

    const frameRateInputLabel = document.getElementById('frame-rate-label');

    preview.setDefaultFps();

    const result = frameRateInputLabel.innerHTML;

    expect(result).toEqual('3 fps');
  });
});

describe('preview.frameRateInputHandler', () => {
  it('Should set input label with FPS value', () => {
    document.body.innerHTML = '<input id="frame-rate" value="5"/>'
    + '<div id="frame-rate-label">old</div>';

    preview.fpsRate = 0;
    preview.frameRateInputHandler();

    const result = preview.fpsRate;

    expect(result).toEqual('5');
  });
});

describe('preview.fullScreenButtonHandler', () => {
  it('Should toogle fullScreenButton "full-screen-mode"', () => {
    document.body.innerHTML = '<div id="full-screen" class="full-screen-mode"></div>'
    + '<div id="preview-tool"></div>';

    document.exitFullscreen = () => {
      const fullScreenButton = document.getElementById('full-screen');
      fullScreenButton.innerHTML = 'full-screen';
    };

    preview.fullScreenButtonHandler();

    const result = document.querySelectorAll('.full-screen-mode').length;

    expect(result).toEqual(0);
  });
});
