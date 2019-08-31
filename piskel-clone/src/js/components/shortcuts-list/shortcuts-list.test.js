import shortcuts from './shotrcuts-list';

describe('shortcuts.interpretKeyCode', () => {
  it('Should should interpret pressed key code', () => {
    const result = shortcuts.interpretKeyCode(219);

    expect(result).toEqual('&#x5b;');
  });
});

describe('shortcuts.removeShortcutsToChangeState', () => {
  it('Should remove shortcuts to change state', () => {
    document.body.innerHTML = '<ul id="shortcuts" class="shortcuts">'
    + '<div class="cheatsheet-shortcuts__item shortcut-to-change"></div></ul>';

    const numberOfshortcutsToChange = document.querySelectorAll('.shortcut-to-change').length;

    shortcuts.removeShortcutsToChangeState();

    const numberOfshortcutsToChangeAfter = document.querySelectorAll('.shortcut-to-change').length;

    expect(numberOfshortcutsToChangeAfter).toEqual(numberOfshortcutsToChange - 1);
  });
});

describe('shortcuts.removeShortcutsNotAssignedState', () => {
  it('Should remove shortcuts not assigned state', () => {
    document.body.innerHTML = '<ul id="shortcuts" class="shortcuts">'
    + '<div class="cheatsheet-shortcuts__item shortcut-not-assigned"></div></ul>';

    const numberOfNotAssignedShortcuts = document.querySelectorAll('.shortcut-not-assigned').length;

    shortcuts.removeShortcutsNotAssignedState();

    const numberOfNotAssignedShortcutsAfter = document.querySelectorAll('.shortcut-not-assigned').length;

    expect(numberOfNotAssignedShortcutsAfter).toEqual(numberOfNotAssignedShortcuts - 1);
  });
});

describe('shortcuts.showPopUp', () => {
  it('Should hide or show shortcuts popup', () => {
    document.body.innerHTML = '<div id="keyboard-shortcuts-popup" class="hide"></div>';

    const popupHided = document.querySelectorAll('.hide').length;

    shortcuts.showPopUp();

    const popupVisible = document.querySelectorAll('.hide').length;

    expect(popupVisible).toEqual(popupHided - 1);
  });
});

describe('shortcuts.changeTooltips', () => {
  it('Should change tooltips innerHTML', () => {
    document.body.innerHTML = '<div id="copyshort">old</div>'
    + '<div id="pasteshort">old</div><div id="copyshortcut">new</div>'
    + '<div id="pasteshortcut">new</div>';

    shortcuts.changeTooltips();

    const newValue = document.getElementById('copyshort').innerHTML;

    expect(newValue).toEqual('new');
  });
});
