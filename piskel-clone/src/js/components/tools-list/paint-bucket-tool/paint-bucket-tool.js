import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const paintBucketTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('click', paintBucketTool.paintBucketToolHandler);
  },
  paintBucketToolHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const ctxDraw = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');
    const bucket = document.getElementById('bucket');

    const currentColour = document.getElementById('current-colour');
    const xDraw = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
      / parseInt(getComputedStyle(canvas).width, 10));
    const yDraw = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
      / parseInt(getComputedStyle(canvas).height, 10));

    const floodFill = (ctx, x, y, fillColor) => {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
      };

      const targetColor = utilities.getPixel(pixelData, x, y);
      if (targetColor !== fillColor) {
        const pixelsToCheck = [x, y];
        while (pixelsToCheck.length > 0) {
          const yTarget = pixelsToCheck.pop();
          const xTarget = pixelsToCheck.pop();
          const currentColor = utilities.getPixel(pixelData, xTarget, yTarget);
          if (currentColor === targetColor) {
            pixelData.data[yTarget * pixelData.width + xTarget] = fillColor;
            pixelsToCheck.push(xTarget + 1, yTarget);
            pixelsToCheck.push(xTarget - 1, yTarget);
            pixelsToCheck.push(xTarget, yTarget + 1);
            pixelsToCheck.push(xTarget, yTarget - 1);
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
    };
    if (bucket.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      floodFill(ctxDraw, xDraw, yDraw,
        utilities.colourToNumber(getComputedStyle(currentColour).backgroundColor));
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default paintBucketTool;
