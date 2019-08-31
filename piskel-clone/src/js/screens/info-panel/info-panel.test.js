import infoPanel from './info-panel';
import 'jest-canvas-mock';

describe('infoPanel.infoPanelCanvasSizeHandler', () => {
  it('Should show canvas size', () => {
    document.body.innerHTML = '<canvas id="draw-canvas" class="draw-canvas" data-canvas-number="1"></canvas>'
    + '<div id="canvas-width">old</div><div id="canvas-height">old</div>';
    const canvas = document.querySelector('.draw-canvas');
    const canvasWidth = document.getElementById('canvas-width');

    canvas.width = 32;
    canvas.height = 32;

    infoPanel.infoPanelCanvasSizeHandler();

    const newCanvasSize = canvasWidth.innerHTML;

    expect(newCanvasSize).toEqual('32');
  });
});

describe('infoPanel.showInfoPanelCoordinates', () => {
  it('Should show panel coords', () => {
    document.body.innerHTML = '<div id="info-panel__cursor-coords" style="display:none"></div>';
    const infoPanelCoordinates = document.getElementById('info-panel__cursor-coords');

    infoPanel.showInfoPanelCoordinates();

    const result = getComputedStyle(infoPanelCoordinates).display;

    expect(result).toEqual('block');
  });
});

describe('infoPanel.hideInfoPanelCoordinates', () => {
  it('Should hide panel coords', () => {
    document.body.innerHTML = '<div id="info-panel__cursor-coords" style="display:block"></div>';
    const infoPanelCoordinates = document.getElementById('info-panel__cursor-coords');

    infoPanel.hideInfoPanelCoordinates();

    const result = getComputedStyle(infoPanelCoordinates).display;

    expect(result).toEqual('none');
  });
});
