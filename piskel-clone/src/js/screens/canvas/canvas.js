import utilities from '../../components/utilities-list/utilities-list';

const canvases = {
  render() {
    const canvas = document.querySelector('.draw-canvas');

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    canvas.width = 32;
    canvas.height = 32;

    const workingArea = document.getElementById('working-area');

    const canvasCopy = document.createElement('canvas');
    canvasCopy.width = canvas.width;
    canvasCopy.height = canvas.height;
    canvasCopy.id = 'canvas-copy';
    canvasCopy.className = 'canvas-copy';

    workingArea.appendChild(canvasCopy);

    const canvasTemp = document.createElement('canvas');
    canvasTemp.width = canvas.width;
    canvasTemp.height = canvas.height;
    canvasTemp.id = 'canvas-temp';
    canvasTemp.className = 'canvas-temp';

    workingArea.appendChild(canvasTemp);

    const canvasCursor = document.createElement('canvas');
    canvasCursor.width = canvas.width;
    canvasCursor.height = canvas.height;
    canvasCursor.id = 'canvas-cursor';
    canvasCursor.className = 'canvas-cursor';

    workingArea.appendChild(canvasCursor);
  },
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');
    const toolsSection = document.getElementById('tools-section-left-wrapper');

    window.addEventListener('mousemove', canvases.drawCursor);
    window.addEventListener('mouseup', canvases.showCursorMouseUp);
    canvas.addEventListener('mousemove', canvases.showCursorMouseMove);
    toolsSection.addEventListener('click', canvases.clearTempCanvases);
  },
  drawCursor(e) {
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const canvasCursorCtx = canvasCursor.getContext('2d');
    const activePenSize = document.querySelector('.active-pen-size');
    const penSize = +activePenSize.getAttribute('data-size');
    const x = Math.floor((e.x + window.pageXOffset - canvasCursor.offsetLeft) * canvasCursor.width
      / parseInt(getComputedStyle(canvasCursor).width, 10));
    const y = Math.floor((e.y + window.pageYOffset - canvasCursor.offsetTop) * canvasCursor.height
      / parseInt(getComputedStyle(canvasCursor).height, 10));
    canvases.clearCanvasCursor();
    canvasCursorCtx.fillStyle = 'rgba(255,255,255, 0.4)';
    canvasCursorCtx.fillRect(x, y, penSize, penSize);
  },
  showCursorMouseUp() {
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    canvasCursor.style.display = 'block';
  },
  showCursorMouseMove() {
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const stroke = document.getElementById('stroke');
    const rectangleTool = document.getElementById('rectangle');
    const circleTool = document.getElementById('circle');
    const move = document.getElementById('move');
    const shapeSelectTool = document.getElementById('shape');

    if (getComputedStyle(canvasCursor).display === 'none'
      && !stroke.classList.contains('active')
      && !rectangleTool.classList.contains('active')
      && !circleTool.classList.contains('active')
      && !move.classList.contains('active')
      && !shapeSelectTool.classList.contains('active')) {
      canvasCursor.style.display = 'block';
    }
  },
  clearTempCanvases(e) {
    const canvasCopy = document.getElementById('canvas-copy');
    const canvasTemp = document.getElementById('canvas-temp');
    if (!e.target.classList.contains('shape')) {
      utilities.clearCanvas(canvasTemp);
      utilities.clearCanvas(canvasCopy);
    }
  },
  clearCanvasCursor() {
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    utilities.clearCanvas(canvasCursor);
  },
};

export default canvases;
