import toolsList from './tools-list';

describe('toolsList.removeToolActiveState', () => {
  it('Should remove tools active state', () => {
    document.body.innerHTML = '<ul id="tools-section-left-wrapper" class="tools-section-left-wrapper">'
    + '<div class="active"></div></ul>';

    const numberOfActiveTools = document.querySelectorAll('.active').length;

    toolsList.removeToolActiveState();

    const numberOfActiveToolsAfter = document.querySelectorAll('.active').length;

    expect(numberOfActiveToolsAfter).toEqual(numberOfActiveTools - 1);
  });
});
