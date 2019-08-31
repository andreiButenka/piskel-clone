const canvasZoom = {
  setEvents() {
    const workingArea = document.getElementById('working-area');
    const canvas = document.querySelector('.draw-canvas');

    workingArea.addEventListener('wheel', canvasZoom.resizeCanvasWithWheel);
    canvas.addEventListener('wheel', canvasZoom.showCanvasScaleValue);
  },
  resizeCanvasWithWheel(e) {
    const canvas = document.querySelector('.draw-canvas');
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const canvasCopy = document.getElementById('canvas-copy');
    const canvasTemp = document.getElementById('canvas-temp');

    const widthDif = `${parseInt(getComputedStyle(canvas).width, 10) + e.deltaY / 10}px`;

    canvas.style.width = widthDif;
    canvas.style.height = widthDif;
    canvasTemp.style.width = widthDif;
    canvasTemp.style.height = widthDif;
    canvasCopy.style.width = widthDif;
    canvasCopy.style.height = widthDif;
    canvasCursor.style.width = widthDif;
    canvasCursor.style.height = widthDif;
  },
  showCanvasScaleValue() {
    const canvas = document.querySelector('.draw-canvas');
    const scaleValue = document.getElementById('scale-value');
    const width = parseInt(getComputedStyle(canvas).width, 10);
    scaleValue.innerHTML = (width / canvas.width).toFixed(2);
  },
};

export default canvasZoom;
