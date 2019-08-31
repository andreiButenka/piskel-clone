import toolsList from '../tools-list/tools-list';
import penSizeTool from '../tools-list/pen-size-tool/pen-size-tool';
import shapeSelectionTool from '../tools-list/shape-select-tool/shape-selection-tool';
import colorInputTool from '../tools-list/color-input-tool/color-input-tool';
import frames from '../frames-list/frames-list';
import preview from '../../screens/preview/preview';
import layers from '../layers-list/layers-list';
import utilities from '../utilities-list/utilities-list';

const shortcuts = {
  shortcutsValues: {
    pen: {
      key: 80,
      mod: 'none',
    },
    mirrorpen: {
      key: 86,
      mod: 'none',
    },
    bucket: {
      key: 66,
      mod: 'none',
    },
    magicbucket: {
      key: 65,
      mod: 'none',
    },
    eraser: {
      key: 69,
      mod: 'none',
    },
    stroke: {
      key: 76,
      mod: 'none',
    },
    rectangle: {
      key: 82,
      mod: 'none',
    },
    circle: {
      key: 67,
      mod: 'none',
    },
    move: {
      key: 77,
      mod: 'none',
    },
    shape: {
      key: 90,
      mod: 'none',
    },
    lighten: {
      key: 85,
      mod: 'none',
    },
    dithering: {
      key: 84,
      mod: 'none',
    },
    colorpicker: {
      key: 79,
      mod: 'none',
    },
    incrpensize: {
      key: 221,
      mod: 'none',
    },
    decrpensize: {
      key: 219,
      mod: 'none',
    },
    selectprevframe: {
      key: 38,
      mod: 'none',
    },
    selectnextframe: {
      key: 40,
      mod: 'none',
    },
    createframe: {
      key: 78,
      mod: 'none',
    },
    dublicateframe: {
      key: 78,
      mod: 'shift',
    },
    popup: 191,
    previewfull: {
      key: 49,
      mod: 'alt',
    },
    closepopup: {
      key: 27,
      mod: 'none',
    },
    swapcolors: {
      key: 88,
      mod: 'none',
    },
    resetcolors: {
      key: 68,
      mod: 'none',
    },
    copyselection: {
      key: 67,
      mod: 'ctrl',
    },
    pasteselection: {
      key: 86,
      mod: 'ctrl',
    },
  },
  defaultShortcutsValues: {
    pen: {
      key: 80,
      mod: 'none',
    },
    mirrorpen: {
      key: 86,
      mod: 'none',
    },
    bucket: {
      key: 66,
      mod: 'none',
    },
    magicbucket: {
      key: 65,
      mod: 'none',
    },
    eraser: {
      key: 69,
      mod: 'none',
    },
    stroke: {
      key: 76,
      mod: 'none',
    },
    rectangle: {
      key: 82,
      mod: 'none',
    },
    circle: {
      key: 67,
      mod: 'none',
    },
    move: {
      key: 77,
      mod: 'none',
    },
    shape: {
      key: 90,
      mod: 'none',
    },
    lighten: {
      key: 85,
      mod: 'none',
    },
    dithering: {
      key: 84,
      mod: 'none',
    },
    colorpicker: {
      key: 79,
      mod: 'none',
    },
    incrpensize: {
      key: 221,
      mod: 'none',
    },
    decrpensize: {
      key: 219,
      mod: 'none',
    },
    selectprevframe: {
      key: 38,
      mod: 'none',
    },
    selectnextframe: {
      key: 40,
      mod: 'none',
    },
    createframe: {
      key: 78,
      mod: 'none',
    },
    dublicateframe: {
      key: 78,
      mod: 'shift',
    },
    popup: 191,
    previewfull: {
      key: 49,
      mod: 'alt',
    },
    closepopup: {
      key: 27,
      mod: 'none',
    },
    swapcolors: {
      key: 88,
      mod: 'none',
    },
    resetcolors: {
      key: 68,
      mod: 'none',
    },
    copyselection: {
      key: 67,
      mod: 'ctrl',
    },
    pasteselection: {
      key: 86,
      mod: 'ctrl',
    },
  },
  shortcutReadyToChange: false,
  notremappedKeys: [191],
  ctrlPressed: false,
  shiftPressed: false,
  altPressed: false,
  setEvents() {
    const popUp = document.getElementById('keyboard-shortcuts-popup');
    const closePopUpButton = document.getElementById('keyboard-shortcuts-panel__header-close');
    const showPopUpButton = document.getElementById('keyboard-shortcuts-show');
    const restoreButton = document.getElementById('keyboard-shortcuts-panel__footer-restore-default');

    restoreButton.addEventListener('click', shortcuts.restoreDefaultShortcuts);
    window.addEventListener('keydown', shortcuts.checkModifier);
    window.addEventListener('keydown', shortcuts.changeToolsShortcuts);
    window.addEventListener('keydown', shortcuts.changeMiscShortcuts);
    window.addEventListener('keydown', shortcuts.changeColorsShortcuts);
    window.addEventListener('keydown', shortcuts.changeSelectionShortcuts);
    window.addEventListener('keydown', shortcuts.toolShortcutChangeHandler);
    window.addEventListener('keydown', shortcuts.showPopUpWithButton);
    window.addEventListener('keydown', shortcuts.changeTooltips);
    showPopUpButton.addEventListener('click', shortcuts.showPopUp);
    closePopUpButton.addEventListener('click', shortcuts.showPopUp);
    popUp.addEventListener('click', shortcuts.setShortcutToChangeState);
  },
  interpretKeyCode(key) {
    const leftBracket = 219;
    const rightBracket = 221;
    const arrowUp = 38;
    const arrowDown = 40;
    const esc = 27;
    if (key === leftBracket) {
      return '&#x5b;';
    }
    if (key === rightBracket) {
      return '&#x5d;';
    }
    if (key === arrowUp) {
      return '&#8593;';
    }
    if (key === arrowDown) {
      return '&#8595;';
    }
    if (key === esc) {
      return 'ESC';
    }
    return String.fromCharCode(key).toUpperCase();
  },
  removeShortcutsToChangeState() {
    const allShortcuts = document.getElementsByClassName('cheatsheet-shortcuts__item');
    for (let i = 0; i < allShortcuts.length; i += 1) {
      allShortcuts[i].classList.remove('shortcut-to-change');
      allShortcuts[i].classList.remove('shortcut-not-assigned-to-change');
    }
  },
  removeShortcutsNotAssignedState() {
    const allShortcuts = document.getElementsByClassName('cheatsheet-shortcuts__item');
    for (let i = 0; i < allShortcuts.length; i += 1) {
      allShortcuts[i].classList.remove('shortcut-not-assigned');
    }
  },
  showPopUp() {
    const popUp = document.getElementById('keyboard-shortcuts-popup');

    popUp.classList.toggle('hide');
  },
  showPopUpWithButton(e) {
    if (e.keyCode === shortcuts.shortcutsValues.popup) {
      shortcuts.showPopUp();
    }
  },
  restoreDefaultShortcuts() {
    Object.entries(shortcuts.defaultShortcutsValues).forEach(([i, value]) => {
      const shortCutToRestore = document.querySelector(`.cheatsheet-shortcuts__item_${i}`);
      if (shortCutToRestore) {
        const { key } = value;
        if (value.mod === 'ctrl') {
          shortCutToRestore.children[shortCutToRestore.children.length - 2].innerHTML = `ctrl + ${shortcuts.interpretKeyCode(key)}`;
        } else if (shortcuts.defaultShortcutsValues[i].mod === 'shift') {
          shortCutToRestore.children[shortCutToRestore.children.length - 2].innerHTML = `shift + ${shortcuts.interpretKeyCode(key)}`;
        } else if (shortcuts.defaultShortcutsValues[i].mod === 'alt') {
          shortCutToRestore.children[shortCutToRestore.children.length - 2].innerHTML = `alt + ${shortcuts.interpretKeyCode(key)}`;
        } else {
          shortCutToRestore.children[shortCutToRestore.children.length - 2]
            .innerHTML = shortcuts.interpretKeyCode(key);
        }
      }
    });
    shortcuts.removeShortcutsToChangeState();
    shortcuts.removeShortcutsNotAssignedState();
    shortcuts.shortcutsValues = {};
    shortcuts.shortcutsValues = JSON.parse(JSON.stringify(shortcuts.defaultShortcutsValues));
  },
  checkModifier(e) {
    if (e.ctrlKey) {
      shortcuts.ctrlPressed = true;
    } else {
      shortcuts.ctrlPressed = false;
    }
    if (e.shiftKey) {
      shortcuts.shiftPressed = true;
    } else {
      shortcuts.shiftPressed = false;
    }
    if (e.altKey) {
      shortcuts.altPressed = true;
    } else {
      shortcuts.altPressed = false;
    }
  },
  changeToolsShortcuts(e) {
    const inputName = document.getElementById('layers-section__item_current-input');
    Object.keys(shortcuts.defaultShortcutsValues).forEach((i) => {
      const targetTool = document.getElementById(i);
      if (targetTool && !inputName) {
        if (e.keyCode === shortcuts.shortcutsValues[i].key) {
          if ((!e.ctrlKey && !e.shiftKey && !e.altKey && shortcuts.shortcutsValues[i].mod === 'none')
            || (e.ctrlKey && shortcuts.shortcutsValues[i].mod === 'ctrl')
            || (e.shiftKey && shortcuts.shortcutsValues[i].mod === 'shift')
            || (e.altKey && shortcuts.shortcutsValues[i].mod === 'alt')) {
            toolsList.removeToolActiveState();
            targetTool.classList.add('active');
          }
        }
      }
    });
  },
  changeMiscShortcuts(e) {
    const popUp = document.getElementById('keyboard-shortcuts-popup');
    const framesSection = document.getElementById('frames-section');
    const activeFrame = document.querySelector('.active-frame');
    const prevFrame = activeFrame.previousElementSibling;
    const nextFrame = activeFrame.nextElementSibling;
    const inputName = document.getElementById('layers-section__item_current-input');
    if (!inputName) {
      if (e.keyCode === shortcuts.shortcutsValues.incrpensize.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.incrpensize.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.incrpensize.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.incrpensize.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.incrpensize.mod === 'alt')) {
          const activePenSize = document.querySelector('.active-pen-size');
          const activePenSizeValue = activePenSize.getAttribute('data-size');
          if (activePenSizeValue <= 3) {
            penSizeTool.removePenSizeActiveState();
            document.querySelector(`[data-size="${+activePenSizeValue + 1}"]`).classList.add('active-pen-size');
          }
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.decrpensize.key) {
        if ((!e.ctrlKey && !e.shiftKey && shortcuts.shortcutsValues.decrpensize.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.decrpensize.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.decrpensize.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.decrpensize.mod === 'alt')) {
          const activePenSize = document.querySelector('.active-pen-size');
          const activePenSizeValue = activePenSize.getAttribute('data-size');
          // console.log(activePenSizeValue + 1);
          if (activePenSizeValue >= 2) {
            penSizeTool.removePenSizeActiveState();
            document.querySelector(`[data-size="${+activePenSizeValue - 1}"]`).classList.add('active-pen-size');
          }
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.createframe.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.createframe.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.createframe.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.createframe.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.createframe.mod === 'alt')) {
          frames.createFrame();
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.selectprevframe.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.selectprevframe.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.selectprevframe.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.selectprevframe.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.selectprevframe.mod === 'alt')) {
          if (framesSection.children.length > 2) {
            if (prevFrame) {
              frames.removeFrameActiveState();
              prevFrame.classList.add('active-frame');
              frames.readFrame();
            }
          }
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.selectnextframe.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.selectnextframe.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.selectnextframe.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.selectnextframe.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.selectnextframe.mod === 'alt')) {
          if (framesSection.children.length > 2) {
            if (nextFrame && !nextFrame.classList.contains('add-frame')) {
              frames.removeFrameActiveState();
              nextFrame.classList.add('active-frame');
              frames.readFrame();
            }
          }
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.dublicateframe.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.dublicateframe.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.dublicateframe.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.dublicateframe.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.dublicateframe.mod === 'alt')) {
          const currentCanvas = activeFrame.children[0];
          const clone = activeFrame.cloneNode(true);
          frames.addEventListenerToFrame(clone);
          frames.dataCounter += 1;
          framesSection.insertBefore(clone, activeFrame.nextElementSibling);
          clone.children[0].setAttribute('data-unique-id', frames.dataCounter);
          const destCtx = clone.children[0].getContext('2d');
          destCtx.drawImage(currentCanvas, 0, 0);
          frames.removeFrameActiveState();
          clone.classList.add('active-frame');
          frames.reindexFramesSection();
          const canvasTemp = document.getElementById('canvas-temp');
          const ctxTemp = canvasTemp.getContext('2d');
          ctxTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
          const canvasCopy = document.getElementById('canvas-copy');
          const ctxCopy = canvasCopy.getContext('2d');
          ctxCopy.clearRect(0, 0, canvasCopy.width, canvasCopy.height);
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.previewfull.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.previewfull.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.previewfull.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.previewfull.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.previewfull.mod === 'alt')) {
          if (!shortcuts.shortcutReadyToChange) {
            preview.fullScreenButtonHandler();
          }
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.closepopup.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.closepopup.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.closepopup.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.closepopup.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.closepopup.mod === 'alt')) {
          if (!popUp.classList.contains('hide')) {
            if (!shortcuts.shortcutReadyToChange) {
              popUp.classList.add('hide');
            }
          }
        }
      }
    }
  },
  changeColorsShortcuts(e) {
    const inputName = document.getElementById('layers-section__item_current-input');
    if (!inputName) {
      if (e.keyCode === shortcuts.shortcutsValues.swapcolors.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.swapcolors.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.swapcolors.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.swapcolors.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.swapcolors.mod === 'alt')) {
          colorInputTool.colourInputSwapHandler();
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.resetcolors.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.resetcolors.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.resetcolors.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.resetcolors.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.resetcolors.mod === 'alt')) {
          const currentColour = document.getElementById('current-colour');
          const secondColour = document.getElementById('second-colour');
          currentColour.style.backgroundColor = 'rgb(0, 0, 0)';
          secondColour.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }
      }
    }
  },
  changeSelectionShortcuts(e) {
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasCopy = document.getElementById('canvas-copy');
    const ctxCopy = canvasCopy.getContext('2d');
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    const shapeSelectTool = document.getElementById('shape');
    const frameCanvas = document.querySelector('.active-frame').children[0];
    const frameCtx = frameCanvas.getContext('2d');
    const inputName = document.getElementById('layers-section__item_current-input');
    if (!inputName) {
      if (e.keyCode === shortcuts.shortcutsValues.copyselection.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.copyselection.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.copyselection.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.copyselection.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.copyselection.mod === 'alt')) {
          if (shapeSelectTool.classList.contains('active')) {
            utilities.clearCanvas(canvasCopy);
            shapeSelectionTool.posToCopy.length = 0;
            shapeSelectionTool.colorsToCopy = {};
            const imageDataTemp = ctxTemp.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            const pixelDataTemp = {
              width: imageDataTemp.width,
              height: imageDataTemp.height,
              data: new Uint32Array(imageDataTemp.data.buffer),
            };
            for (let i = 0; i < pixelDataTemp.data.length; i += 1) {
              if (pixelDataTemp.data[i] !== 0) {
                shapeSelectionTool.posToCopy.push(i);
              }
            }
            const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            const pixelData = {
              width: imageData.width,
              height: imageData.height,
              data: new Uint32Array(imageData.data.buffer),
            };
            for (let i = 0; i < pixelData.data.length; i += 1) {
              if (shapeSelectionTool.posToCopy.includes(i)) {
                shapeSelectionTool.colorsToCopy[i] = pixelData.data[i];
              } else {
                pixelData.data[i] = 0;
              }
            }
            ctxCopy.putImageData(imageData, 0, 0);
          }
        }
      }
      if (e.keyCode === shortcuts.shortcutsValues.pasteselection.key) {
        if ((!e.ctrlKey && !e.altKey && !e.shiftKey && shortcuts.shortcutsValues.pasteselection.mod === 'none')
          || (e.ctrlKey && shortcuts.shortcutsValues.pasteselection.mod === 'ctrl')
          || (e.shiftKey && shortcuts.shortcutsValues.pasteselection.mod === 'shift')
          || (e.altKey && shortcuts.shortcutsValues.pasteselection.mod === 'alt')) {
          if (shapeSelectTool.classList.contains('active')) {
            ctx.drawImage(canvasCopy, 0, 0);
            frameCtx.drawImage(canvas, 0, 0);
            layers.saveLayerData();
            layers.writeAllLayersFrames();
          }
        }
      }
    }
  },
  setShortcutToChangeState(e) {
    if (e.target.classList.contains('cheatsheet-shortcuts__item')
      && !e.target.classList.contains('notremapped')) {
      shortcuts.removeShortcutsToChangeState();
      e.target.classList.add('shortcut-to-change');
      if (e.target.classList.contains('shortcut-not-assigned')) {
        e.target.classList.add('shortcut-not-assigned-to-change');
      }
      shortcuts.shortcutReadyToChange = true;
    } else {
      shortcuts.removeShortcutsToChangeState();
      shortcuts.shortcutReadyToChange = false;
    }
  },
  toolShortcutChangeHandler(e) {
    const popUp = document.getElementById('keyboard-shortcuts-popup');
    if (!shortcuts.notremappedKeys.includes(e.keyCode)) {
      if (shortcuts.shortcutReadyToChange) {
        const shortcutToChange = document.querySelector('.shortcut-to-change');
        let removedShortcutName;
        if (shortcutToChange) {
          if (e.keyCode === 17 || e.keyCode === 16 || e.keyCode === 18) {
            return;
          }
          const controlType = shortcutToChange.getAttribute('data-control');
          shortcuts.shortcutsValues[controlType].key = e.keyCode;
          if (shortcuts.ctrlPressed) {
            shortcuts.shortcutsValues[controlType].mod = 'ctrl';
          } else if (shortcuts.shiftPressed) {
            shortcuts.shortcutsValues[controlType].mod = 'shift';
          } else if (shortcuts.altPressed) {
            shortcuts.shortcutsValues[controlType].mod = 'alt';
          } else {
            shortcuts.shortcutsValues[controlType].mod = 'none';
          }
          const currentMod = shortcuts.shortcutsValues[controlType].mod;
          shortcuts.shortcutReadyToChange = false;
          shortcutToChange.classList.remove('shortcut-to-change');
          shortcutToChange.classList.remove('shortcut-not-assigned-to-change');
          shortcutToChange.classList.remove('shortcut-not-assigned');
          Object.keys(shortcuts.defaultShortcutsValues).forEach((key) => {
            if (key !== controlType && shortcuts.shortcutsValues[key].key === e.keyCode
              && shortcuts.shortcutsValues[key].mod === currentMod) {
              shortcuts.shortcutsValues[key].key = undefined;
              shortcuts.shortcutsValues[key].mod = 'none';
              removedShortcutName = key;
              const removedShortcut = document.querySelector(`.cheatsheet-shortcuts__item_${removedShortcutName}`);
              removedShortcut.classList.add('shortcut-not-assigned');
              removedShortcut.getElementsByClassName('cheatsheet-key')[0].innerHTML = '???';
            }
          });
          if (shortcuts.ctrlPressed) {
            shortcutToChange.getElementsByClassName('cheatsheet-key')[0].innerHTML = `ctrl + ${shortcuts.interpretKeyCode(e.keyCode)}`;
          } else if (shortcuts.shiftPressed) {
            shortcutToChange.getElementsByClassName('cheatsheet-key')[0].innerHTML = `shift + ${shortcuts.interpretKeyCode(e.keyCode)}`;
          } else if (shortcuts.altPressed) {
            shortcutToChange.getElementsByClassName('cheatsheet-key')[0].innerHTML = `alt + ${shortcuts.interpretKeyCode(e.keyCode)}`;
          } else {
            shortcutToChange.getElementsByClassName('cheatsheet-key')[0].innerHTML = shortcuts.interpretKeyCode(e.keyCode);
          }
        }
      }
    } else if (shortcuts.shortcutReadyToChange) {
      shortcuts.removeShortcutsToChangeState();
      shortcuts.shortcutReadyToChange = false;
      popUp.classList.toggle('hide');
    }
  },
  changeTooltips() {
    const copyTooltip = document.getElementById('copyshort');
    const pasteTooltip = document.getElementById('pasteshort');
    const copyShortcut = document.getElementById('copyshortcut');
    const pasteShortcut = document.getElementById('pasteshortcut');

    copyTooltip.innerHTML = copyShortcut.innerHTML;
    pasteTooltip.innerHTML = pasteShortcut.innerHTML;
  },
};

export default shortcuts;
