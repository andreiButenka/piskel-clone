import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const ditheringTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('click', ditheringTool.ditheringToolHandler);
    canvas.addEventListener('mousemove', ditheringTool.ditheringToolHandler);
  },
  ditheringToolHandler(e) {
    const dithering = document.getElementById('dithering');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');
    const currentColour = document.getElementById('current-colour');
    const secondColour = document.getElementById('second-colour');

    if (e.which === 1 && dithering.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      const x = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
        / parseInt(getComputedStyle(canvas).width, 10));
      const y = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
        / parseInt(getComputedStyle(canvas).height, 10));
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
      };

      if (y % 2 !== 0 && y >= 0) {
        if (x % 2 === 0 && x >= 0) {
          pixelData.data[y * pixelData.width + x] = utilities
            .colourToNumber(getComputedStyle(currentColour).backgroundColor);
        }
        if (x % 2 !== 0 && x >= 0) {
          pixelData.data[y * pixelData.width + x] = utilities
            .colourToNumber(getComputedStyle(secondColour).backgroundColor);
        }
      } else {
        if (x % 2 !== 0 && x >= 0) {
          pixelData.data[y * pixelData.width + x] = utilities
            .colourToNumber(getComputedStyle(currentColour).backgroundColor);
        }
        if (x % 2 === 0 && x >= 0) {
          pixelData.data[y * pixelData.width + x] = utilities
            .colourToNumber(getComputedStyle(secondColour).backgroundColor);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      utilities.clearCanvas(frameCanvas);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default ditheringTool;
