import layers from '../../layers-list/layers-list';

const mirrorPenTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('mousemove', mirrorPenTool.mirrorPenToolHandler, true);
    canvas.addEventListener('mousedown', mirrorPenTool.mirrorPenToolHandler, true);
  },
  mirrorPenToolHandler(e) {
    const mirrorpen = document.getElementById('mirrorpen');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');
    const currentColour = document.getElementById('current-colour');
    const activePenSize = document.querySelector('.active-pen-size');
    const penSize = +activePenSize.getAttribute('data-size');

    if (e.which === 1 && mirrorpen.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      const x = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
        / parseInt(getComputedStyle(canvas).width, 10));
      const y = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
        / parseInt(getComputedStyle(canvas).height, 10));
      ctx.beginPath();
      ctx.fillStyle = currentColour.style.backgroundColor;

      if (x < canvas.width / 2) {
        ctx.fillRect(x, y, penSize, penSize);
        ctx.fillRect((canvas.width / 2 + (canvas.width / 2 - x)) - penSize, y, penSize, penSize);
      }
      if (x > canvas.width / 2 - 1) {
        ctx.fillRect(x, y, penSize, penSize);
        ctx.fillRect((canvas.width / 2 - (x - canvas.width / 2)) - penSize, y, penSize, penSize);
      }
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default mirrorPenTool;
