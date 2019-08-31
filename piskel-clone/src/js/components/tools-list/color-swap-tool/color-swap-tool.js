import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const colorSwapTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('click', colorSwapTool.colorSwapToolHandler);
  },
  colorSwapToolHandler(e) {
    const bucketSameColor = document.getElementById('magicbucket');
    const canvas = document.querySelector('.draw-canvas');
    const ctxDraw = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');
    const currentColour = document.getElementById('current-colour');
    const xCoord = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
      / parseInt(getComputedStyle(canvas).width, 10));
    const yCoord = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
      / parseInt(getComputedStyle(canvas).height, 10));

    const floodFillSameColor = (ctx, x, y, fillColor) => {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
      };
      const sameColor = utilities.getPixel(pixelData, x, y);

      for (let i = 0; i < pixelData.data.length; i += 1) {
        const targetColor = pixelData.data[i];
        if (targetColor === sameColor) {
          pixelData.data[i] = fillColor;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
    if (bucketSameColor.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      floodFillSameColor(ctxDraw, xCoord, yCoord,
        utilities.colourToNumber(getComputedStyle(currentColour).backgroundColor));
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default colorSwapTool;
