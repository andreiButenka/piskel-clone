import utilities from '../utilities-list/utilities-list';
import layers from '../layers-list/layers-list';

const transforms = {
  setEvents() {
    const flipVertButton = document.getElementById('flipvert');
    flipVertButton.addEventListener('click', transforms.flipVert);
  },
  flipVert() {
    const canvas = document.getElementById('draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const frameCanvasAll = frameCanvas.children[0];
    ctxTemp.translate(canvas.width, 0);
    ctxTemp.scale(-1, 1);
    ctxTemp.drawImage(canvas, 0, 0);
    utilities.clearCanvas(canvas);
    ctx.drawImage(canvasTemp, 0, 0);
    utilities.clearCanvas(canvasTemp);
    ctxTemp.translate(canvas.width, 0);
    ctxTemp.scale(-1, 1);
    utilities.clearCanvas(frameCanvas);
    frameCtx.drawImage(canvas, 0, 0);
    utilities.clearCanvas(frameCanvasAll);
    layers.saveLayerData();
    layers.writeAllLayersFrames();
  },
};

export default transforms;
