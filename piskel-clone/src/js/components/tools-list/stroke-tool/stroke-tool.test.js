import strokeTool from './stroke-tool';

describe('strokeTool.checkInsideCanvas()', () => {
  it('Should set inside-canvas flag to false', () => {
    strokeTool.insideCanvas = true;
    strokeTool.checkInsideCanvas();

    expect(strokeTool.insideCanvas).toEqual(false);
  });
});
