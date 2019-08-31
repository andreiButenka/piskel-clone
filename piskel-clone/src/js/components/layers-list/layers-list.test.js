import layers from './layers-list';
import 'jest-canvas-mock';

describe('layers.createLayer', () => {
  it('Should should create new layer', () => {
    document.body.innerHTML = '<canvas id="canvas-temp" class="canvas-temp">'
    + '<canvas id="canvas-copy" class="canvas-copy">'
    + '</canvas><canvas id="draw-canvas" class="draw-canvas" data-canvas-number="1"></canvas>'
    + '<ul id="layers-section" class="layers-section"></ul>';
    const canvas = document.getElementById('draw-canvas');
    canvas.width = 32;
    canvas.height = 32;

    const layersSection = document.getElementById('layers-section');


    const layersSectionLengthBefore = layersSection.children.length;

    layers.createLayer();

    const layersSectionLengthAfter = layersSection.children.length;

    expect(layersSectionLengthAfter).toEqual(layersSectionLengthBefore + 1);
  });
});

describe('layers.removeLayerActiveState', () => {
  it('Should remove layers active state', () => {
    document.body.innerHTML = '<ul id="layers-section" class="layers-section">'
    + '<div class="layers-section__item layers-section__item_current"></div></ul>';

    const numberOfAtiveLayers = document.querySelectorAll('.layers-section__item_current').length;

    layers.removeLayerActiveState();

    const numberOfAtiveLayersAfter = document.querySelectorAll('.layers-section__item_current').length;

    expect(numberOfAtiveLayersAfter).toEqual(numberOfAtiveLayers - 1);
  });
});

describe('layers.removeDrawCanvasCurrentState', () => {
  it('Should remove canvases current state', () => {
    document.body.innerHTML = '<div class="draw-canvas current-canvas"></div>';

    const numberOfCurrentCanvases = document.querySelectorAll('.draw-canvas').length;

    layers.removeDrawCanvasCurrentState();

    const numberOfCurrentCanvasesAfter = document.querySelectorAll('.current-canvas').length;

    expect(numberOfCurrentCanvasesAfter).toEqual(numberOfCurrentCanvases - 1);
  });
});

describe('layers.layerUp', () => {
  it('Should move target layer up', () => {
    document.body.innerHTML = '<ul id="layers-section" class="layers-section">'
    + '<div id="layer-2" class="layers-section__item"></div>'
    + '<div id="layer-1" class="layers-section__item layers-section__item_current"></div></ul>';

    const layersSection = document.getElementById('layers-section');

    layers.layerUp();

    const layersSectionFirst = layersSection.children[0].id;

    expect(layersSectionFirst).toEqual('layer-1');
  });
});

describe('layers.layerDown', () => {
  it('Should move target layer up', () => {
    document.body.innerHTML = '<ul id="layers-section" class="layers-section">'
    + '<div id="layer-1" class="layers-section__item layers-section__item_current"></div>'
    + '<div id="layer-2" class="layers-section__item"></div></ul>';

    const layersSection = document.getElementById('layers-section');


    layers.layerDown();

    const layersSectionFirst = layersSection.children[1].id;

    expect(layersSectionFirst).toEqual('layer-1');
  });
});
