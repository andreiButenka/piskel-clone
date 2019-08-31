import frames from './frames-list';
import 'jest-canvas-mock';

describe('frames.createFrame', () => {
  it('Should should create new frame', () => {
    document.body.innerHTML = '<canvas id="canvas-temp" class="canvas-temp">'
    + '<canvas id="canvas-copy" class="canvas-copy">'
    + '</canvas><canvas id="draw-canvas" class="draw-canvas" data-canvas-number="1"></canvas>'
    + '<ul id="frames-section" class="frames-section"></ul>';
    const canvas = document.getElementById('draw-canvas');
    canvas.width = 32;
    canvas.height = 32;

    const framesSection = document.getElementById('frames-section');

    const framesSectionLengthBefore = framesSection.children.length;

    frames.createFrame();

    const framesSectionLengthAfter = framesSection.children.length;

    expect(framesSectionLengthAfter).toEqual(framesSectionLengthBefore + 1);
  });
});

describe('frames.removeFrameActiveState', () => {
  it('Should remove frames active state', () => {
    document.body.innerHTML = '<ul id="frames-section" class="frames-section"><div class="active-frame"></div></ul>';

    const numberOfAtiveFrames = document.querySelectorAll('.active-frame').length;

    frames.removeFrameActiveState();

    const numberOfAtiveFramesAfter = document.querySelectorAll('.active-frame').length;

    expect(numberOfAtiveFramesAfter).toEqual(numberOfAtiveFrames - 1);
  });
});

describe('frames.swapElements(obj1, obj2)', () => {
  it('Should swap to DOM elements', () => {
    document.body.innerHTML = '<ul id="frames-section" class="frames-section"><div id="frame-1">'
    + '</div><div id="frame-2"></div></ul>';

    const frameSection = document.getElementById('frames-section');
    const elementOne = document.getElementById('frame-1');
    const elementTwo = document.getElementById('frame-2');

    frames.swapElements(elementOne, elementTwo);

    const newFirstElement = frameSection.children[0].id;

    expect(newFirstElement).toEqual('frame-2');
  });
});

describe('frames.reindexFramesSection', () => {
  it('Should reindex frames', () => {
    document.body.innerHTML = '<ul id="frames-section"><div><div></div><div><div id="target"></div></div>'
+ '</div><div><div></div><div><div></div></div></div></ul>';

    const target = document.getElementById('target');
    frames.reindexFramesSection();
    const result = target.innerHTML;

    expect(result).toEqual('1');
  });
});

describe('frames.handleDragLeave', () => {
  it('Should remove class "over"', () => {
    document.body.innerHTML = '<div id="target" class="over"></div>';

    const target = document.getElementById('target');

    target.handleDragLeave = frames.handleDragLeave;

    target.handleDragLeave();

    const result = document.querySelectorAll('.over').length;

    expect(result).toEqual(0);
  });
});

describe('frames.handleDragEnd', () => {
  it('Should remove all frames class "over"', () => {
    document.body.innerHTML = '<ul id="frames-section" class="frames-section"><div id="frame-1" class="over">'
    + '</div><div id="frame-2" class="over"></div></ul>';

    frames.handleDragEnd();

    const result = document.querySelectorAll('.over').length;

    expect(result).toEqual(0);
  });
});
