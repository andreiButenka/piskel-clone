import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const rectangleTool = {
  drawRectangle: false,
  insideCanvas: false,
  startPos: {
    x: undefined,
    y: undefined,
  },
  finalPos: {
    x: undefined,
    y: undefined,
  },
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');
    canvas.addEventListener('mousedown', rectangleTool.rectangleToolHandler);
    window.addEventListener('mousemove', rectangleTool.rectangleToolMove);
    window.addEventListener('mouseup', rectangleTool.rectangleToolMouseUp);
  },
  rectangleToolHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const canvasCursor = document.getElementById('canvas-cursor');
    const canvasTemp = document.getElementById('canvas-temp');

    const rectangle = document.getElementById('rectangle');
    canvasTemp.width = canvas.width;
    canvasTemp.height = canvas.height;
    canvasTemp.style.width = getComputedStyle(canvas).width;
    canvasTemp.style.height = getComputedStyle(canvas).height;
    canvasTemp.style.top = canvas.getBoundingClientRect().top;
    canvasTemp.style.left = canvas.getBoundingClientRect().left;
    if (e.which === 1 && rectangle.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      rectangleTool.drawRectangle = true;
      rectangleTool.insideCanvas = true;
      rectangleTool.startPos = {
        x: Math.floor((e.x + window.pageXOffset - canvasTemp.offsetLeft) * canvasTemp.width
          / parseInt(getComputedStyle(canvasTemp).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvasTemp.offsetTop) * canvasTemp.height
          / parseInt(getComputedStyle(canvasTemp).height, 10)),
      };
    }
  },
  pixelArtRectangle(ctx, x1, y1, x2, y2) {
    const currentColour = document.getElementById('current-colour');
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(currentColour).backgroundColor;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  },
  rectangleToolMove(e) {
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    if (rectangleTool.drawRectangle === true) {
      rectangleTool.finalPos = {
        x: Math.floor((e.x + window.pageXOffset - canvasTemp.offsetLeft) * canvasTemp.width
          / parseInt(getComputedStyle(canvasTemp).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvasTemp.offsetTop) * canvasTemp.height
          / parseInt(getComputedStyle(canvasTemp).height, 10)),
      };
      utilities.clearCanvas(canvasTemp);
      rectangleTool.pixelArtRectangle(ctxTemp,
        rectangleTool.startPos.x + 0.5, rectangleTool.startPos.y + 0.5,
        rectangleTool.finalPos.x + 0.5, rectangleTool.finalPos.y + 0.5);
    }
  },
  rectangleToolMouseUp() {
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const rectangle = document.getElementById('rectangle');

    if (rectangle.classList.contains('active')) {
      rectangleTool.drawRectangle = false;
      rectangleTool.finalPos = { x: 0, y: 0 };
      rectangleTool.startPos = { x: 0, y: 0 };
      ctx.drawImage(canvasTemp, 0, 0);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default rectangleTool;
