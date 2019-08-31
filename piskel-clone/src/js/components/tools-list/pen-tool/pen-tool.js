import layers from '../../layers-list/layers-list';

const penTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    canvas.addEventListener('mousemove', penTool.penToolHandler, true);
    canvas.addEventListener('mousedown', penTool.penToolHandler, true);
  },
  penToolHandler(e) {
    const pen = document.getElementById('pen');
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor');
    const currentColour = document.getElementById('current-colour');
    const activePenSize = document.querySelector('.active-pen-size');
    const penSize = +activePenSize.getAttribute('data-size');

    if (e.which === 1 && pen.classList.contains('active')) {
      canvasCursor.style.display = 'none';
      const x = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
        / parseInt(getComputedStyle(canvas).width, 10));
      const y = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
        / parseInt(getComputedStyle(canvas).height, 10));
      ctx.beginPath();
      ctx.fillStyle = currentColour.style.backgroundColor;
      ctx.fillRect(x, y, penSize, penSize);
      frameCtx.drawImage(canvas, 0, 0);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
};

export default penTool;
