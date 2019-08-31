import canvases from './canvas';
import 'jest-canvas-mock';

describe('canvases.render', () => {
  it('Should create service canvases', () => {
    document.body.innerHTML = '<div id="working-area"><canvas class="draw-canvas"></canvas></div>';
    const workingArea = document.getElementById('working-area');

    canvases.render();

    const numberOfCanvases = workingArea.children.length;

    expect(numberOfCanvases).toEqual(4);
  });
});

describe('canvases.showCursorMouseUp', () => {
  it('Should reveal cursor', () => {
    document.body.innerHTML = '<div id="canvas-cursor" style="display:none"></div>';

    const canvasCursor = document.getElementById('canvas-cursor');
    canvases.showCursorMouseUp();

    const result = getComputedStyle(canvasCursor).display;

    expect(result).toEqual('block');
  });
});

describe('canvases.showCursorMouseMove', () => {
  it('Should show cursor when mouse is moved', () => {
    document.body.innerHTML = '<div id="canvas-cursor" style="display:none"></div>'
    + '<div id="stroke"></div><div id="rectangle"></div><div id="circle"></div>'
    + '<div id="move"></div><div id="shape"></div>';

    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');

    canvases.showCursorMouseMove();

    const result = getComputedStyle(canvasCursor).display;

    expect(result).toEqual('block');
  });
});
