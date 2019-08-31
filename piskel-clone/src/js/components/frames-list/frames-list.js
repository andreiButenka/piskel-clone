import layers from '../layers-list/layers-list';

const frames = {
  states: {},
  frameCounter: 1,
  dataCounter: 1,
  targetDrag: '',
  oldTop: '',
  oldLeft: '',
  coords: '',
  shiftX: '',
  shiftY: '',
  horiz: '',
  vert: '',
  dragSrcEl: null,
  createFrame() {
    // checkBucketToolState();
    // redoHandler();
    // keepBucketToolState();
    const canvasDraw = document.getElementById('draw-canvas');
    frames.removeFrameActiveState();
    const { frameCounter } = frames;
    const { dataCounter } = frames;
    const addFrameButton = document.getElementById('add-frame');
    const framesSection = document.getElementById('frames-section');
    const frameNew = document.createElement('li');
    frameNew.id = `frame-${frameCounter}`;
    frameNew.className = `frame frame-${frameCounter} active-frame`;
    frameNew.setAttribute('draggable', true);

    const canvasNew = document.createElement('canvas');
    canvasNew.id = `canvas-${frameCounter}`;
    canvasNew.className = `canvas canvas-${frameCounter}`;
    canvasNew.setAttribute('data-unique-id', dataCounter);
    canvasNew.width = canvasDraw.width;
    canvasNew.height = canvasDraw.height;

    const canvasAllLayersNew = document.createElement('canvas');
    canvasAllLayersNew.id = `canvas-alllayers-${frameCounter}`;
    canvasAllLayersNew.className = `canvas-alllayers canvas-alllayers-${frameCounter}`;
    canvasAllLayersNew.setAttribute('data-unique-id', dataCounter);
    canvasAllLayersNew.width = canvasDraw.width;
    canvasAllLayersNew.height = canvasDraw.height;

    canvasNew.appendChild(canvasAllLayersNew);

    frames.dataCounter += 1;

    const frameNumberNew = document.createElement('div');
    frameNumberNew.id = `frame-number-${frameCounter}`;
    frameNumberNew.className = `frame-number frame-number-${frameCounter}`;

    const numberNew = document.createElement('span');
    numberNew.id = `number-${frameCounter}`;
    numberNew.className = `number number-${frameCounter}`;
    numberNew.innerHTML = frameCounter;

    const frameDeleteNew = document.createElement('div');
    frameDeleteNew.id = `freme-delete-${frameCounter}`;
    frameDeleteNew.className = `frame-delete frame-delete-${frameCounter}`;
    frameDeleteNew.setAttribute('onmousedown', 'event.preventDefault ? event.preventDefault() : event.returnValue = false');

    const frameDragNew = document.createElement('div');
    frameDragNew.id = `frame-drag-${frameCounter}`;
    frameDragNew.className = `frame-drag frame-drag-${frameCounter}`;

    const frameCopyNew = document.createElement('div');
    frameCopyNew.id = `freme-copy-${frameCounter}`;
    frameCopyNew.className = `frame-copy frame-copy-${frameCounter}`;
    frameCopyNew.setAttribute('onmousedown', 'event.preventDefault ? event.preventDefault() : event.returnValue = false');

    frameNew.appendChild(canvasNew);
    frameNew.appendChild(frameNumberNew);
    frameNumberNew.appendChild(numberNew);
    frameNew.appendChild(frameDeleteNew);
    frameNew.appendChild(frameDragNew);
    frameNew.appendChild(frameCopyNew);
    framesSection.insertBefore(frameNew, addFrameButton);
    frames.addEventListenerToFrame(frameNew);

    frames.frameCounter += 1;

    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    ctxTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);

    const canvasCopy = document.getElementById('canvas-copy');
    const ctxCopy = canvasCopy.getContext('2d');
    ctxCopy.clearRect(0, 0, canvasCopy.width, canvasCopy.height);
  },
  setEvents() {
    const addFrameButton = document.getElementById('add-frame');
    const framesSection = document.getElementById('frames-section');
    addFrameButton.addEventListener('click', frames.createFrame);
    addFrameButton.addEventListener('click', frames.clearMainCanvas);
    framesSection.addEventListener('click', frames.setFrameActive);
    framesSection.addEventListener('click', frames.deleteFrame);
    framesSection.addEventListener('click', frames.copyFrame);
    framesSection.addEventListener('click', frames.frameToMainCanvas);
    framesSection.addEventListener('click', frames.clearTempCanvas);


    window.addEventListener('DOMContentLoaded', frames.createFrame, false);
    document.addEventListener('mousedown', frames.dragFrames);
  },
  removeFrameActiveState() {
    const framesSection = document.getElementById('frames-section');
    for (let i = 0; i < framesSection.children.length; i += 1) {
      framesSection.children[i].classList.remove('active-frame');
    }
  },
  setFrameActive(e) {
    if (e.target.classList.contains('frame')
      && !e.target.classList.contains('add')) {
      frames.removeFrameActiveState();
      e.target.classList.add('active-frame');
    }
  },
  deleteFrame(e) {
    const framesSection = document.getElementById('frames-section');
    if (e.target.classList.contains('frame-delete')) {
      const parent = e.target.parentElement;
      if (framesSection.children.length !== 2) {
        if (parent.classList.contains('active-frame')
          && parent.previousElementSibling) {
          parent.previousElementSibling.classList.add('active-frame');
        }
        if (parent.classList.contains('active-frame')
          && !parent.previousElementSibling) {
          parent.nextElementSibling.classList.add('active-frame');
        }
        framesSection.removeChild(parent);
        frames.frameCounter -= 1;
        frames.reindexFramesSection();
        frames.readFrame();
      }
    }
  },
  reindexFramesSection() {
    const framesSection = document.getElementById('frames-section');
    for (let i = 0; i < framesSection.children.length; i += 1) {
      if (!framesSection.children[i].classList.contains('add-frame')) {
        framesSection.children[i].children[1].children[0].innerHTML = i + 1;
      }
    }
  },
  copyFrame(e) {
    const framesSection = document.getElementById('frames-section');
    if (e.target.classList.contains('frame-copy')) {
      const parent = e.target.parentElement;
      const currentCanvas = parent.children[0];
      const canvasId = currentCanvas.getAttribute('data-unique-id');
      const clone = parent.cloneNode(true);
      frames.addEventListenerToFrame(clone);
      frames.dataCounter += 1;
      framesSection.insertBefore(clone, parent.nextElementSibling);
      clone.children[0].setAttribute('data-unique-id', frames.dataCounter);
      clone.children[0].children[0].setAttribute('data-unique-id', frames.dataCounter);

      const destCtx = clone.children[0].getContext('2d');
      destCtx.drawImage(currentCanvas, 0, 0);
      frames.removeFrameActiveState();
      clone.classList.add('active-frame');
      frames.reindexFramesSection();
      layers.copyLayerData(frames.dataCounter, canvasId);
      layers.saveLayerData();
      layers.writeAllLayersFrames();
    }
  },
  clearMainCanvas() {
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  frameToMainCanvas(e) {
    if (e.target.classList.contains('frame')
      && !e.target.classList.contains('add')) {
      frames.readFrame();
    }
  },
  readFrame() {
    const canvasMain = document.querySelector('.draw-canvas');
    const ctx = canvasMain.getContext('2d');
    const canvasFrame = document.querySelector('.active-frame').children[0];
    frames.clearMainCanvas();
    ctx.drawImage(canvasFrame, 0, 0);
  },
  changeFramesAfterResize(x) {
    const framesCollection = document.getElementsByClassName('canvas');
    for (let i = 0; i < framesCollection.length; i += 1) {
      const ctxFrame = framesCollection[i].getContext('2d');
      const ctxFrameAll = framesCollection[i].children[0].getContext('2d');

      const canvasTemp = document.createElement('canvas');
      canvasTemp.width = framesCollection[i].width;
      canvasTemp.height = framesCollection[i].height;
      const canvasTempCtx = canvasTemp.getContext('2d');
      canvasTempCtx.drawImage(framesCollection[i], 0, 0);

      const canvasTempAll = document.createElement('canvas');
      canvasTempAll.width = framesCollection[i].width;
      canvasTempAll.height = framesCollection[i].height;
      const canvasTempCtxAll = canvasTempAll.getContext('2d');
      canvasTempCtxAll.drawImage(framesCollection[i].children[0], 0, 0);

      framesCollection[i].width = x;
      framesCollection[i].height = x;
      framesCollection[i].children[0].width = x;
      framesCollection[i].children[0].height = x;
      ctxFrame.drawImage(canvasTemp, 0, 0);
      ctxFrameAll.drawImage(canvasTempAll, 0, 0);
    }
  },
  handleDragStart(e) {
    frames.dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  },
  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    return false;
  },
  handleDragEnter() {
    this.classList.add('over');
    if (frames.dragSrcEl !== this) {
      frames.swapElements(frames.dragSrcEl, this);
      frames.reindexFramesSection();
    }
  },
  handleDragLeave() {
    this.classList.remove('over');
  },
  handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (frames.dragSrcEl !== this) {
      frames.swapElements(frames.dragSrcEl, this);
      frames.reindexFramesSection();
    }

    return false;
  },
  handleDragEnd() {
    const framesSection = document.getElementById('frames-section');
    for (let i = 0; i < framesSection.children.length; i += 1) {
      framesSection.children[i].classList.remove('over');
    }
  },
  addEventListenerToFrame(x) {
    x.addEventListener('dragstart', frames.handleDragStart, false);
    x.addEventListener('dragenter', frames.handleDragEnter, false);
    x.addEventListener('dragover', frames.handleDragOver, false);
    x.addEventListener('dragleave', frames.handleDragLeave, false);
    x.addEventListener('drop', frames.handleDrop, false);
    x.addEventListener('dragend', frames.handleDragEnd, false);
  },
  swapElements(obj1, obj2) {
    const temp = document.createElement('div');
    obj1.parentNode.insertBefore(temp, obj1);
    obj2.parentNode.insertBefore(obj1, obj2);
    temp.parentNode.insertBefore(obj2, temp);
    temp.parentNode.removeChild(temp);
  },
  clearTempCanvas(e) {
    if (e.target.classList.contains('frame')
      && !e.target.classList.contains('add')) {
      const canvasTemp = document.getElementById('canvas-temp');
      const ctxTemp = canvasTemp.getContext('2d');
      ctxTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
    }
  },
};

export default frames;
