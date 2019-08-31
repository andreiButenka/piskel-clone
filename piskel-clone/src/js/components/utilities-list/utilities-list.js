const utilities = {
  getPixel(pixelData, x, y) {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
      return -1;
    }
    return pixelData.data[y * pixelData.width + x];
  },
  numberToHex(number) {
    const hex = number.toString(16);
    const r = hex[6] + hex[7];
    const g = hex[4] + hex[5];
    const b = hex[2] + hex[4];
    const newHex = r + g + b;
    return newHex.toUpperCase();
  },
  shadeColor(color, percent) {
    const num = parseInt(color, 16);
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt; // eslint-disable-line no-bitwise
    let B = ((num >> 8) & 0x00FF) + amt; // eslint-disable-line no-bitwise
    let G = (num & 0x0000FF) + amt; // eslint-disable-line no-bitwise
    if (R < 255) {
      if (R < 1) {
        R = 0;
      }
    } else {
      R = 255;
    }
    if (B < 255) {
      if (B < 1) {
        B = 0;
      }
    } else {
      B = 255;
    }
    if (G < 255) {
      if (G < 1) {
        G = 0;
      }
    } else {
      G = 255;
    }
    const result = (0x1000000 + R * 0x10000 + B * 0x100 + G)
      .toString(16).slice(1);
    return `FF${result.toUpperCase()}`;
  },
  hexToNumber(string) {
    const newString = `FF${string[6]}${string[7]}${string[4]}${string[5]}${string[2]}${string[3]}`;
    return parseInt(newString, 16);
  },
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
  },
  colourToNumber(string) {
    let a = string.split('(')[1].split(')')[0];
    a = a.split(',').reverse();
    const b = a.map((x) => {
      const result = parseInt(x, 10).toString(16);
      return (result.length === 1) ? `0${result}` : result;
    });
    const hexColor = `FF${b.join('').toUpperCase()}`;
    return parseInt(hexColor, 16);
  },
  clearCanvas(x) {
    const ctx = x.getContext('2d');
    ctx.clearRect(0, 0, x.width, x.height);
  },
  moveContent(ctx, imageData, x, y) {
    ctx.putImageData(imageData, x, y);
  },
  setPixel(canvas, x, y) {
    const currentColour = document.getElementById('current-colour');
    const targetCanvas = canvas;
    targetCanvas.fillStyle = getComputedStyle(currentColour).backgroundColor;
    targetCanvas.fillRect(x, y, 1, 1);
  },
};

export default utilities;
