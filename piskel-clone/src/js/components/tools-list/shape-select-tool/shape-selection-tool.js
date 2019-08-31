import layers from '../../layers-list/layers-list';
import utilities from '../../utilities-list/utilities-list';

const shapeSelectionTool = {
  marker: true,
  moveShape: false,
  insideCanvas: false,
  beginMoveSelectedShape: false,
  coordsMoveOrNot: {
    x: undefined,
    y: undefined,
  },
  posToMove: [],
  posToCopy: [],
  colorsToCopy: {},
  finalPos: {
    x: 0,
    y: 0,
  },
  startPos: {
    x: 0,
    y: 0,
  },
  tempX: 0,
  tempY: 0,
  curImage: {},
  curImageCopy: {},
  colorToCopy: undefined,
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('click', shapeSelectionTool.shapeSelectionToolHandler);
    canvas.addEventListener('mousedown', shapeSelectionTool.moveSelectedShape);
    window.addEventListener('mousemove', shapeSelectionTool.mouseMoveHandler);
    window.addEventListener('mouseup', shapeSelectionTool.mouseUpHandler);
  },
  shapeSelectionToolHandler(e) {
    const selectColor = 0x8CFFFF99;

    const shapeSelectTool = document.getElementById('shape');
    const canvas = document.querySelector('.draw-canvas');
    const ctxDraw = canvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const canvasCopy = document.getElementById('canvas-copy');
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');

    if (shapeSelectionTool.marker === true && e.which === 1
      && shapeSelectTool.classList.contains('active')) {
      utilities.clearCanvas(canvasCopy);

      canvasCursor.style.display = 'none';
      const xDraw = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
        / parseInt(getComputedStyle(canvas).width, 10));
      const yDraw = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
        / parseInt(getComputedStyle(canvas).height, 10));

      const getShape = (ctx, x, y) => {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const pixelData = {
          width: imageData.width,
          height: imageData.height,
          data: new Uint32Array(imageData.data.buffer),
        };

        const targetColor = utilities.getPixel(pixelData, x, y);
        shapeSelectionTool.colorToCopy = targetColor;

        if (targetColor !== selectColor) {
          const pixelsToCheck = [x, y];
          while (pixelsToCheck.length > 0) {
            const yTarget = pixelsToCheck.pop();
            const xTarget = pixelsToCheck.pop();

            const currentColor = utilities.getPixel(pixelData, xTarget, yTarget);
            if (currentColor === targetColor) {
              pixelData.data[yTarget * pixelData.width + xTarget] = selectColor;
              shapeSelectionTool.posToMove.push(yTarget * pixelData.width + xTarget);
              pixelsToCheck.push(xTarget + 1, yTarget);
              pixelsToCheck.push(xTarget - 1, yTarget);
              pixelsToCheck.push(xTarget, yTarget + 1);
              pixelsToCheck.push(xTarget, yTarget - 1);
            }
          }

          for (let i = 0; i < pixelData.data.length; i += 1) {
            if (pixelData.data[i] !== selectColor) {
              pixelData.data[i] = 0;
            }
          }
          ctxTemp.putImageData(imageData, 0, 0);
        }
      };
      if (shapeSelectTool.classList.contains('active')) {
        utilities.clearCanvas(canvasTemp);
        getShape(ctxDraw, xDraw, yDraw);
      }
    }
  },
  moveSelectedShape(e) {
    const shapeSelectTool = document.getElementById('shape');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const canvasCopy = document.getElementById('canvas-copy');
    const ctxCopy = canvasCopy.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');

    if (e.which === 1 && shapeSelectTool.classList.contains('active')) {
      shapeSelectionTool.coordsMoveOrNot.x = e.clientX;
      shapeSelectionTool.coordsMoveOrNot.y = e.clientY;
      canvasCursor.style.display = 'none';
      if (e.shiftKey) {
        utilities.clearCanvas(canvasCopy);
        shapeSelectionTool.beginMoveSelectedShape = true;
      }

      shapeSelectionTool.marker = true;
      shapeSelectionTool.moveShape = true;
      shapeSelectionTool.insideCanvas = true;

      shapeSelectionTool.startPos = {
        x: Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
          / parseInt(getComputedStyle(canvas).width, 10)),
        y: Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
          / parseInt(getComputedStyle(canvas).height, 10)),
      };
      shapeSelectionTool.curImage = ctxTemp.getImageData(0, 0, canvas.width, canvas.height);
      shapeSelectionTool.curImageCopy = ctxCopy.getImageData(0, 0, canvas.width, canvas.height);

      if (e.shiftKey) {
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const pixelData = {
          width: imageData.width,
          height: imageData.height,
          data: new Uint32Array(imageData.data.buffer),
        };
        for (let i = 0; i < pixelData.data.length; i += 1) {
          if (shapeSelectionTool.posToMove.includes(i)) {
            pixelData.data[i] = 0;
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }
    }
  },
  mouseMoveHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const canvasCopy = document.getElementById('canvas-copy');
    const ctxCopy = canvasCopy.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    if (e.clientX !== shapeSelectionTool.coordsMoveOrNot.x
      || e.clientY !== shapeSelectionTool.coordsMoveOrNot.y) {
      if (shapeSelectionTool.moveShape === true) {
        shapeSelectionTool.posToMove.length = 0;
        shapeSelectionTool.marker = false;
        shapeSelectionTool.tempX = shapeSelectionTool.finalPos.x - shapeSelectionTool.startPos.x;
        shapeSelectionTool.tempY = shapeSelectionTool.finalPos.y - shapeSelectionTool.startPos.y;
        shapeSelectionTool.finalPos = {
          x: Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
            / parseInt(getComputedStyle(canvas).width, 10)),
          y: Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
            / parseInt(getComputedStyle(canvas).height, 10)),
        };
        utilities.clearCanvas(canvasTemp);
        utilities.clearCanvas(canvasCopy);
        utilities.moveContent(ctxCopy, shapeSelectionTool.curImageCopy,
          shapeSelectionTool.finalPos.x - shapeSelectionTool.startPos.x,
          shapeSelectionTool.finalPos.y - shapeSelectionTool.startPos.y);
        utilities.moveContent(ctxTemp, shapeSelectionTool.curImage,
          shapeSelectionTool.finalPos.x - shapeSelectionTool.startPos.x,
          shapeSelectionTool.finalPos.y - shapeSelectionTool.startPos.y);
      }
    }
  },
  mouseUpHandler() {
    const selectColor = 0x8CFFFF99;
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    const shapeSelectTool = document.getElementById('shape');
    if (shapeSelectTool.classList.contains('active')) {
      const frameCanvas = document.querySelector('.active-frame').children[0];
      const frameCtx = frameCanvas.getContext('2d');
      const frameCanvasAll = frameCanvas.children[0];
      if (shapeSelectionTool.beginMoveSelectedShape) {
        const imageData = ctxTemp.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const pixelData = {
          width: imageData.width,
          height: imageData.height,
          data: new Uint32Array(imageData.data.buffer),
        };
        for (let i = 0; i < pixelData.data.length; i += 1) {
          if (pixelData.data[i] === selectColor) {
            pixelData.data[i] = shapeSelectionTool.colorToCopy;
          }
        }

        ctxTemp.putImageData(imageData, 0, 0);
        ctx.drawImage(canvasTemp, 0, 0);
        utilities.clearCanvas(canvasTemp);
        utilities.clearCanvas(frameCanvas);
        utilities.clearCanvas(frameCanvasAll);
        frameCtx.drawImage(canvas, 0, 0);
        layers.saveLayerData();
        layers.writeAllLayersFrames();
        shapeSelectionTool.beginMoveSelectedShape = false;
      }
      shapeSelectionTool.moveShape = false;

      shapeSelectionTool.finalPos = { x: 0, y: 0 };
      shapeSelectionTool.startPos = { x: 0, y: 0 };
    }
  },
};

export default shapeSelectionTool;
