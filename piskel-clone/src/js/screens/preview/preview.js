const preview = {
  index: 0,
  fpsRate: 5,
  setEvents() {
    const frameRateInput = document.getElementById('frame-rate');
    const fullScreenButton = document.getElementById('full-screen');
    frameRateInput.addEventListener('input', preview.frameRateInputHandler);
    fullScreenButton.addEventListener('click', preview.fullScreenButtonHandler);
    window.addEventListener('DOMContentLoaded', preview.setDefaultFps);
    window.addEventListener('DOMContentLoaded', preview.previewHandler);
  },
  setDefaultFps() {
    const frameRateInput = document.getElementById('frame-rate');
    const frameRateInputLabel = document.getElementById('frame-rate-label');
    frameRateInputLabel.innerHTML = `${frameRateInput.value} fps`;
  },
  frameRateInputHandler() {
    const frameRateInput = document.getElementById('frame-rate');
    const frameRateInputLabel = document.getElementById('frame-rate-label');
    preview.fpsRate = frameRateInput.value;
    frameRateInputLabel.innerHTML = `${frameRateInput.value} fps`;
  },
  previewHandler() {
    let realFps;
    if (preview.fpsRate === 0) {
      realFps = 0;
    } else {
      realFps = 1000 / preview.fpsRate;
    }
    const framesSection = document.getElementById('frames-section');
    const perviewWindow = document.getElementById('preview-window');
    setTimeout(() => {
      if (!framesSection.children[preview.index].classList.contains('add-frame')
        && preview.fpsRate !== '0') {
        const canvas = framesSection.children[preview.index].children[0].children[0];
        perviewWindow.style.background = `url('${canvas.toDataURL()}') 0 0 no-repeat`;
        perviewWindow.style.backgroundSize = 'cover';
      }
      preview.index += 1;
      if ((preview.index < framesSection.children.length - 1)
        && preview.fpsRate !== 0) {
        preview.previewHandler();
      } else {
        preview.index = 0;
        preview.previewHandler();
      }
    }, realFps);
  },
  fullScreenButtonHandler() {
    const fullScreenButton = document.getElementById('full-screen');
    const previewTool = document.getElementById('preview-tool');
    fullScreenButton.classList.toggle('full-screen-mode');
    if (fullScreenButton.classList.contains('full-screen-mode')) {
      previewTool.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  },
  stopAnimation() {
    if (preview.fpsRate === 0) {
      window.removeEventListener(preview.previewHandler);
    }
  },

};

export default preview;
