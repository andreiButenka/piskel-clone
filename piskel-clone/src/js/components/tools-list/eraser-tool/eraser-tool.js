import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const eraserTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('mousemove', eraserTool.eraserToolHandler, true);
    canvas.addEventListener('mousedown', eraserTool.eraserToolHandler, true);
  },
  eraserToolHandler(e) {
    const eraser = document.getElementById('eraser');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const frameCanvasAll = frameCanvas.children[0];
    const canvasCursor = document.getElementById('canvas-cursor');
    const activePenSize = document.querySelector('.active-pen-size');
    const penSize = +activePenSize.getAttribute('data-size');

    if (e.which === 1 && eraser.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      const x = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
        / parseInt(getComputedStyle(canvas).width, 10));
      const y = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
        / parseInt(getComputedStyle(canvas).height, 10));
      ctx.clearRect(x, y, penSize, penSize);
      utilities.clearCanvas(frameCanvas);
      utilities.clearCanvas(frameCanvasAll);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default eraserTool;
