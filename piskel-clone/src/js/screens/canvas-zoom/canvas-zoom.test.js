import canvasZoom from './canvas-zoom';
import 'jest-canvas-mock';

describe('canvasZoom.showCanvasScaleValue', () => {
  it('Should show canvas scale value', () => {
    document.body.innerHTML = '<canvas class="draw-canvas" style="width:32px"></canvas>'
    + '<div id="scale-value">old</div>';
    const canvas = document.querySelector('.draw-canvas');
    // canvas.style.width = 32;
    canvas.width = 32;
    const scaleValue = document.getElementById('scale-value');

    canvasZoom.showCanvasScaleValue();

    const result = scaleValue.innerHTML;

    expect(result).toEqual('1.00');
  });
});
