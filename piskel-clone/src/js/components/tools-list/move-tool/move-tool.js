import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const moveTool = {
  drawMove: false,
  insideCanvas: false,
  startPos: {
    x: undefined,
    y: undefined,
  },
  finalPos: {
    x: undefined,
    y: undefined,
  },
  curImage: undefined,
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('mousedown', moveTool.moveToolHandler);
    window.addEventListener('mousemove', moveTool.moveToolMove);
    window.addEventListener('mouseup', moveTool.moveToolMouseUp);
  },
  moveToolHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');
    const move = document.getElementById('move');

    if (e.which === 1 && move.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      moveTool.drawMove = true;
      moveTool.insideCanvas = true;
      moveTool.startPos = {
        x: Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
          / parseInt(getComputedStyle(canvas).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
          / parseInt(getComputedStyle(canvas).height, 10)),
      };
      moveTool.curImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  },
  moveToolMove(e) {
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');

    if (moveTool.drawMove === true) {
      moveTool.finalPos = {
        x: Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
          / parseInt(getComputedStyle(canvas).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
          / parseInt(getComputedStyle(canvas).height, 10)),
      };
      utilities.clearCanvas(canvas);
      utilities.moveContent(ctx, moveTool.curImage,
        0 + (moveTool.finalPos.x - moveTool.startPos.x),
        0 + (moveTool.finalPos.y - moveTool.startPos.y));
    }
  },
  moveToolMouseUp() {
    const canvas = document.querySelector('.draw-canvas');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const frameCanvasAll = frameCanvas.children[0];
    const move = document.getElementById('move');
    if (move.classList.contains('active')) {
      moveTool.drawMove = false;
      moveTool.finalPos = { x: 0, y: 0 };
      moveTool.startPos = { x: 0, y: 0 };
      utilities.clearCanvas(frameCanvas);
      utilities.clearCanvas(frameCanvasAll);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },

};

export default moveTool;
