import penSizeTool from './pen-size-tool/pen-size-tool';
import penTool from './pen-tool/pen-tool';
import mirrorPenTool from './mirror-pen-tool/mirror-pen-tool';
import eraserTool from './eraser-tool/eraser-tool';
import lightenTool from './lighten-tool/lighten-tool';
import ditheringTool from './dithering-tool/dithering-tool';
import shapeSelectionTool from './shape-select-tool/shape-selection-tool';
import paintBucketTool from './paint-bucket-tool/paint-bucket-tool';
import colorSwapTool from './color-swap-tool/color-swap-tool';
import circleTool from './circle-tool/circle-tool';
import rectangleTool from './rectangle-tool/rectangle-tool';
import strokeTool from './stroke-tool/stroke-tool';
import moveTool from './move-tool/move-tool';
import colorPickerTool from './colorpicker-tool/colorpicker-tool';
import colorInputTool from './color-input-tool/color-input-tool';

const toolsList = {
  setEvents() {
    const tools = document.getElementById('tools-section-left-wrapper');
    tools.addEventListener('click', toolsList.setToolActiveState);
    toolsList.enableTools();
  },
  enableTools() {
    penSizeTool.setEvents();
    penTool.setEvents();
    mirrorPenTool.setEvents();
    eraserTool.setEvents();
    lightenTool.setEvents();
    ditheringTool.setEvents();
    shapeSelectionTool.setEvents();
    paintBucketTool.setEvents();
    colorSwapTool.setEvents();
    circleTool.setEvents();
    rectangleTool.setEvents();
    strokeTool.setEvents();
    moveTool.setEvents();
    colorPickerTool.setEvents();
    colorInputTool.setEvents();
  },
  removeToolActiveState() {
    const tools = document.getElementById('tools-section-left-wrapper');
    for (let i = 0; i < tools.children.length; i += 1) {
      tools.children[i].classList.remove('active');
    }
  },
  setToolActiveState(e) {
    if (e.target.classList.contains('tool')) {
      toolsList.removeToolActiveState();
      e.target.classList.add('active');
    }
  },
};

export default toolsList;
