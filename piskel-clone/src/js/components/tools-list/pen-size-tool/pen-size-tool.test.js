import penSizeTool from './pen-size-tool';

describe('penSizeTool.removePenSizeActiveState', () => {
  it('Should remove current pen size active state', () => {
    document.body.innerHTML = '<div id="pen-size-panel"><div class="active-pen-size"></div></div>';

    const numberOfAtiveSizes = document.querySelectorAll('.active-pen-size').length;

    penSizeTool.removePenSizeActiveState();

    const numberOfAtiveSizesAfter = document.querySelectorAll('.active-pen-size').length;

    expect(numberOfAtiveSizesAfter).toEqual(numberOfAtiveSizes - 1);
  });
});
