import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const circleTool = {
  drawCircle: false,
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
    canvas.addEventListener('mousedown', circleTool.circleToolHandler);
    window.addEventListener('mousemove', circleTool.circleToolMove);
    window.addEventListener('mouseup', circleTool.circleToolMouseUp);
  },
  circleToolHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const canvasCursor = document.getElementById('canvas-cursor');
    const canvasTemp = document.getElementById('canvas-temp');
    const circle = document.getElementById('circle');

    canvasTemp.width = canvas.width;
    canvasTemp.height = canvas.height;
    canvasTemp.style.width = getComputedStyle(canvas).width;
    canvasTemp.style.height = getComputedStyle(canvas).height;
    canvasTemp.style.top = canvas.getBoundingClientRect().top;
    canvasTemp.style.left = canvas.getBoundingClientRect().left;
    if (e.which === 1 && circle.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      circleTool.drawCircle = true;
      circleTool.insideCanvas = true;
      circleTool.startPos = {
        x: Math.floor((e.x + window.pageXOffset - canvasTemp.offsetLeft) * canvasTemp.width
          / parseInt(getComputedStyle(canvasTemp).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvasTemp.offsetTop) * canvasTemp.height
          / parseInt(getComputedStyle(canvasTemp).height, 10)),
      };
    }
  },
  pixelAtrCircle(x0, y0, x1, y1, ctx) {
    let startX = x0;
    let startY = y0;
    let finalX = x1;
    let finalY = y1;
    let a = Math.abs(finalX - startX);
    const b = Math.abs(finalY - startY);
    let b1 = b & 1; // eslint-disable-line no-bitwise
    let dx = 4 * (1.0 - a) * b * b;
    let dy = 4 * (b1 + 1) * a * a;
    let err = dx + dy + b1 * a * a;
    let e2;

    if (startX > finalX) { startX = finalX; finalX += a; }
    if (startY > finalY) startY = finalY;
    startY += (b + 1) >> 1; finalY = startY - b1; // eslint-disable-line no-bitwise
    a = 8 * (a ** 2); b1 = 8 * (b ** 2);

    do {
      utilities.setPixel(ctx, finalX, startY);
      utilities.setPixel(ctx, startX, startY);
      utilities.setPixel(ctx, startX, finalY);
      utilities.setPixel(ctx, finalX, finalY);
      e2 = 2 * err;
      if (e2 <= dy) {
        startY += 1;
        finalY -= 1;
        dy += a;
        err += dy;
      }
      if (e2 >= dx || 2 * err > dy) {
        startX += 1;
        finalX -= 1;
        dx += b1;
        err += dx;
      }
    } while (startX <= finalX);

    while (startY - finalY <= b) {
      utilities.setPixel(ctx, startX - 1, startY);
      utilities.setPixel(ctx, finalX + 1, startY);
      startY += 1;
      utilities.setPixel(ctx, startX - 1, finalY);
      utilities.setPixel(ctx, finalX + 1, finalY);
      finalY -= 1;
    }
  },
  circleToolMove(e) {
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');

    if (circleTool.drawCircle === true) {
      circleTool.finalPos = {
        x: Math.floor((e.x + window.pageXOffset - canvasTemp.offsetLeft) * canvasTemp.width
          / parseInt(getComputedStyle(canvasTemp).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvasTemp.offsetTop) * canvasTemp.height
          / parseInt(getComputedStyle(canvasTemp).height, 10)),
      };
      utilities.clearCanvas(canvasTemp);
      circleTool.pixelAtrCircle(circleTool.startPos.x, circleTool.startPos.y,
        circleTool.finalPos.x, circleTool.finalPos.y, ctxTemp);
    }
  },
  circleToolMouseUp() {
    const circle = document.getElementById('circle');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    if (circle.classList.contains('active') && circleTool.insideCanvas === true) {
      circleTool.drawCircle = false;
      circleTool.finalPos = { x: 0, y: 0 };
      circleTool.startPos = { x: 0, y: 0 };
      ctx.drawImage(canvasTemp, 0, 0);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },

};

export default circleTool;
