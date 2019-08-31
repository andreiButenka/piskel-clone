import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const strokeTool = {
  drawLine: false,
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

    canvas.addEventListener('mousedown', strokeTool.strokeToolHandler);
    window.addEventListener('mousemove', strokeTool.strokeToolMove);
    window.addEventListener('mouseup', strokeTool.strokeToolMouseUp);
    window.addEventListener('click', strokeTool.checkInsideCanvas);
  },
  strokeToolHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const canvasCursor = document.getElementById('canvas-cursor');
    const canvasTemp = document.getElementById('canvas-temp');
    const stroke = document.getElementById('stroke');
    canvasTemp.width = canvas.width;
    canvasTemp.height = canvas.height;
    canvasTemp.style.width = getComputedStyle(canvas).width;
    canvasTemp.style.height = getComputedStyle(canvas).height;
    canvasTemp.style.top = canvas.getBoundingClientRect().top;
    canvasTemp.style.left = canvas.getBoundingClientRect().left;
    if (e.which === 1 && stroke.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      strokeTool.drawLine = true;
      strokeTool.insideCanvas = true;
      strokeTool.startPos = {
        x: Math.floor((e.x + window.pageXOffset - canvasTemp.offsetLeft) * canvasTemp.width
          / parseInt(getComputedStyle(canvasTemp).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvasTemp.offsetTop) * canvasTemp.height
          / parseInt(getComputedStyle(canvasTemp).height, 10)),
      };
    }
  },
  pixelArtLine(ctx, x1, y1, x2, y2) {
    const activePenSize = document.querySelector('.active-pen-size');
    const penSize = +activePenSize.getAttribute('data-size');
    const currentColour = document.getElementById('current-colour');
    let startX = x1;
    let startY = y1;

    const dx = Math.abs(x2 - startX);
    const sx = startX < x2 ? 1 : -1;
    const dy = -Math.abs(y2 - startY);
    const sy = startY < y2 ? 1 : -1;
    let e2;
    let er = dx + dy;
    let end = false;
    ctx.beginPath();
    ctx.fillStyle = getComputedStyle(currentColour).backgroundColor;
    while (!end) {
      ctx.rect(startX, startY, penSize, penSize);
      if (startX === x2 && startY === y2) {
        end = true;
      } else {
        e2 = 2 * er;
        if (e2 > dy) {
          er += dy;
          startX += sx;
        }
        if (e2 < dx) {
          er += dx;
          startY += sy;
        }
      }
    }
    ctx.fill();
  },
  strokeToolMove(e) {
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');

    if (strokeTool.drawLine === true) {
      strokeTool.finalPos = {
        x: Math.floor((e.x + window.pageXOffset - canvasTemp.offsetLeft) * canvasTemp.width
          / parseInt(getComputedStyle(canvasTemp).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvasTemp.offsetTop) * canvasTemp.height
          / parseInt(getComputedStyle(canvasTemp).height, 10)),
      };
      utilities.clearCanvas(canvasTemp);
      strokeTool.pixelArtLine(ctxTemp, strokeTool.startPos.x, strokeTool.startPos.y,
        strokeTool.finalPos.x, strokeTool.finalPos.y);
    }
  },
  strokeToolMouseUp() {
    const stroke = document.getElementById('stroke');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');

    if (stroke.classList.contains('active') && strokeTool.insideCanvas === true) {
      strokeTool.drawLine = false;
      strokeTool.finalPos = { x: 0, y: 0 };
      strokeTool.startPos = { x: 0, y: 0 };

      ctx.drawImage(canvasTemp, 0, 0);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
  checkInsideCanvas() {
    strokeTool.insideCanvas = false;
  },

};

export default strokeTool;
