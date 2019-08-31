import utilities from './utilities-list';

describe('utilities.numberToHex', () => {
  it('Should convert decimal color to hex color', () => {
    const result = '47BE0B';
    expect(utilities.numberToHex(4278369863)).toEqual(result);
  });
});

describe('utilities.shadeColor', () => {
  it('Should convert given rgb color to shaded hex color', () => {
    const result = 'FF1A1A1A';
    expect(utilities.shadeColor('rgb(2, 190, 71)', 10)).toEqual(result);
  });
});

describe('utilities.hexToNumber', () => {
  it('Should convert hex color to decimal color', () => {
    const result = 4292006642;
    expect(utilities.hexToNumber('#FF2D2D2D')).toEqual(result);
  });
});

describe('utilities.hexToRgb', () => {
  it('Should convert hex color to rgb color', () => {
    const result = 'rgb(45, 45, 45)';
    expect(utilities.hexToRgb('#2D2D2D')).toEqual(result);
  });
});

describe('utilities.colourToNumber', () => {
  it('Should convert rgb color to decimal color', () => {
    const result = 4281150765;
    expect(utilities.colourToNumber('rgb(45, 45, 45)')).toEqual(result);
  });
});

describe('utilities.getPixel', () => {
  it('Should return clicked pixel', () => {
    const pixelData = {};
    pixelData.data = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2,
      3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    pixelData.width = 32;
    pixelData.height = 32;

    const result = utilities.getPixel(pixelData, 1, 1);

    expect(result).toEqual(4);
  });
});
