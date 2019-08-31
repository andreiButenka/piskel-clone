import utilities from '../../utilities-list/utilities-list';

const colorpickerTool = {
  setEvents() {
    const canvas = document.querySelector('.draw-canvas');
    canvas.addEventListener('mousedown', colorpickerTool.colorpickerToolHandler);
    canvas.addEventListener('contextmenu', colorpickerTool.colorpickerToolHandler);
  },
  colorpickerToolHandler(e) {
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const colorPickerTool = document.getElementById('colorpicker');
    const currentColour = document.getElementById('current-colour');
    const secondColour = document.getElementById('second-colour');
    if (colorPickerTool.classList.contains('active')) {
      e.preventDefault();
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
      };
      const x = Math.floor((e.x + window.pageXOffset - canvas.offsetLeft) * canvas.width
        / parseInt(getComputedStyle(canvas).width, 10));
      const y = Math.floor((e.y + window.pageYOffset - canvas.offsetTop) * canvas.height
        / parseInt(getComputedStyle(canvas).height, 10));
      let targetColor = utilities.getPixel(pixelData, x, y);
      if (targetColor === 0) {
        targetColor = 'rgba(0, 0, 0, 0)';
      } else {
        targetColor = `#${utilities.numberToHex(targetColor)}`;
        targetColor = utilities.hexToRgb(targetColor);
      }
      if (e.which === 1) {
        currentColour.style.backgroundColor = targetColor;
      }
      if (e.which === 3) {
        secondColour.style.backgroundColor = targetColor;
      }
    }
    canvas.onContextMenu = () => false;
  },
};

export default colorpickerTool;
