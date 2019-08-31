import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const lightenTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('click', lightenTool.lightenToolHandler);
  },
  lightenToolHandler(e) {
    const lighten = document.getElementById('lighten');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');

    if (e.which === 1 && lighten.classList.contains('active')) {
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

      const targetColor = utilities.getPixel(pixelData, x, y);
      if (targetColor !== 0) {
        const temp1 = utilities.numberToHex(targetColor);
        let temp2;
        if (e.which === 1) {
          temp2 = utilities.shadeColor(temp1, 5);
        }
        if (e.which === 1 && e.ctrlKey) {
          temp2 = utilities.shadeColor(temp1, -5);
        }
        const temp3 = utilities.hexToNumber(temp2);
        pixelData.data[y * pixelData.width + x] = temp3;
        utilities.clearCanvas(canvas);
        ctx.putImageData(imageData, 0, 0);
        frameCtx.drawImage(canvas, 0, 0);
        layers.saveLayerData();
        layers.writeAllLayersFrames();
      }
    }
  },
};

export default lightenTool;
