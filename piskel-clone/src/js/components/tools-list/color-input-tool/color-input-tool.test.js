import colorInputTool from './color-input-tool';

describe('colorInputTool.colourInputSwapHandler', () => {
  it('Should swap currend and second colors', () => {
    document.body.innerHTML = '<div id="current-colour" style="background-color: #000">'
    + '<div id="second-colour" style="background-color: #fff"></div></div>';

    const currentColour = document.getElementById('current-colour');

    colorInputTool.colourInputSwapHandler();

    const result = getComputedStyle(currentColour).backgroundColor;

    expect(result).toEqual('rgb(255, 255, 255)');
  });
});
