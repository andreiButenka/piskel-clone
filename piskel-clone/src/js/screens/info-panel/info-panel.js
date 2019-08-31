const infoPanel = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');

    window.addEventListener('DOMContentLoaded', infoPanel.infoPanelCanvasSizeHandler);
    canvas.addEventListener('mousemove', infoPanel.infoPanelCoordinatesHandler);
    canvas.addEventListener('mouseenter', infoPanel.showInfoPanelCoordinates);
    canvas.addEventListener('mouseleave', infoPanel.hideInfoPanelCoordinates);
  },
  infoPanelCanvasSizeHandler() {
    const canvas = document.querySelector('.draw-canvas');
    const canvasWidth = document.getElementById('canvas-width');
    const canvasHeight = document.getElementById('canvas-height');

    canvasWidth.innerHTML = canvas.width;
    canvasHeight.innerHTML = canvas.height;
  },
  infoPanelCoordinatesHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const coordinateX = document.getElementById('coords-x');
    const coordinateY = document.getElementById('coords-y');
    const x = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
      / parseInt(getComputedStyle(canvas).width, 10));
    const y = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
      / parseInt(getComputedStyle(canvas).height, 10));
    coordinateX.innerHTML = x;
    coordinateY.innerHTML = y;
  },
  showInfoPanelCoordinates() {
    const infoPanelCoordinates = document.getElementById('info-panel__cursor-coords');
    infoPanelCoordinates.style.display = 'block';
  },
  hideInfoPanelCoordinates() {
    const infoPanelCoordinates = document.getElementById('info-panel__cursor-coords');
    infoPanelCoordinates.style.display = 'none';
  },
};

export default infoPanel;
