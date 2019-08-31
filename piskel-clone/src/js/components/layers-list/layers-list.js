const layers = {
  layerIndex: 1,
  data: {},
  layersNumbers: [],
  createLayer() {
    layers.saveLayerData();
    layers.removeLayerActiveState();
    const canvasTemp = document.getElementById('canvas-temp');
    const ctxTemp = canvasTemp.getContext('2d');
    layers.clearCanvas(ctxTemp);

    const layersSection = document.getElementById('layers-section');
    const layerNew = document.createElement('li');
    layerNew.className = 'layers-section__item layers-section__item_current';
    layerNew.setAttribute('data-layer-index', layers.layerIndex);
    const layerNameNew = document.createElement('span');
    layerNameNew.className = 'layers-section__item-name';
    layerNameNew.innerHTML = `Layer ${layers.layerIndex}`;
    layers.layersNumbers.push(layers.layerIndex);
    layerNew.appendChild(layerNameNew);
    layersSection.appendChild(layerNew);

    layers.data[layers.layerIndex] = {};
    layers.clearAllCanvases();
    layers.layerIndex += 1;
  },
  setEvents() {
    layers.createLayer();

    const layersSection = document.getElementById('layers-section');
    const addLayerButton = document.getElementById('layercreate');
    const prevLayerButton = document.getElementById('layerup');
    const nextLayerButton = document.getElementById('layerdown');
    const changeNameButton = document.getElementById('editlayername');
    const deleteLayerButton = document.getElementById('layerdelete');

    addLayerButton.addEventListener('click', layers.createLayer);
    prevLayerButton.addEventListener('click', layers.layerUp);
    nextLayerButton.addEventListener('click', layers.layerDown);
    deleteLayerButton.addEventListener('click', layers.deleteLayer);
    changeNameButton.addEventListener('click', layers.editLayerName);
    layersSection.addEventListener('click', layers.chooseCurrentLayer);
    layersSection.addEventListener('dblclick', layers.dblclickInputName);
    window.addEventListener('click', layers.removeInputName);
  },
  removeLayerActiveState() {
    const allLayers = document.querySelectorAll('.layers-section__item');

    for (let i = 0; i < allLayers.length; i += 1) {
      allLayers[i].classList.remove('layers-section__item_current');
    }
  },
  removeDrawCanvasCurrentState() {
    const allDrawCanvases = document.querySelectorAll('.draw-canvas');
    for (let i = 0; i < allDrawCanvases.length; i += 1) {
      allDrawCanvases[i].classList.remove('current-canvas');
    }
  },
  layerUp() {
    const layersSection = document.getElementById('layers-section');
    const currentLayer = document.querySelector('.layers-section__item_current');
    const prevLayer = currentLayer.previousElementSibling;
    if (prevLayer.classList.contains('layers-section__item')) {
      layersSection.insertBefore(currentLayer, prevLayer);
      layers.reindexLayersNumbers();
    }
  },
  layerDown() {
    const layersSection = document.getElementById('layers-section');
    const currentLayer = document.querySelector('.layers-section__item_current');
    const nextLayer = currentLayer.nextElementSibling;
    if (nextLayer && nextLayer.classList.contains('layers-section__item')) {
      layersSection.insertBefore(nextLayer, currentLayer);
      layers.reindexLayersNumbers();
    }
  },
  deleteLayer() {
    const layersSection = document.getElementById('layers-section');
    const allLayers = document.querySelectorAll('.layers-section__item');
    const currentLayer = document.querySelector('.layers-section__item_current');
    const nextLayer = currentLayer.nextElementSibling;
    const prevLayer = currentLayer.previousElementSibling;
    const canvasDraw = document.querySelector('.draw-canvas');
    const ctxDraw = canvasDraw.getContext('2d');
    const activeFrame = document.querySelector('.active-frame').children[0];
    const ctxFrame = activeFrame.getContext('2d');

    if (allLayers.length > 1) {
      if (nextLayer && nextLayer.classList.contains('layers-section__item')) {
        layers.removeLayerActiveState();
        nextLayer.classList.add('layers-section__item_current');
      } else {
        prevLayer.classList.add('layers-section__item_current');
      }
      const layerIndex = currentLayer.getAttribute('data-layer-index');
      const index = layers.layersNumbers.indexOf(+layerIndex);
      if (index > -1) {
        layers.layersNumbers.splice(index, 1);
      }
      delete layers.data[layerIndex];
      layers.clearCanvas(ctxDraw);
      layers.clearCanvas(ctxFrame);
      layersSection.removeChild(currentLayer);
      const actualCurrentLayer = document.querySelector('.layers-section__item_current');
      const actualLayerIndex = actualCurrentLayer.getAttribute('data-layer-index');
      layers.readLayerData(actualLayerIndex);
      layers.writeAllLayersFrames();
      layers.readActiveFrame();
    }
  },
  chooseCurrentLayer(e) {
    if (e.target.classList.contains('layers-section__item')) {
      layers.saveLayerData();
      layers.removeLayerActiveState();
      e.target.classList.add('layers-section__item_current');
      const layerIndex = e.target.getAttribute('data-layer-index');
      layers.readLayerData(layerIndex);
      layers.writeAllLayersFrames();
      layers.readActiveFrame();
      const canvasTemp = document.getElementById('canvas-temp');
      const ctxTemp = canvasTemp.getContext('2d');
      layers.clearCanvas(ctxTemp);
    }
  },
  editLayerName() {
    const currentLayer = document.querySelector('.layers-section__item_current');
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'layers-section__item_current-input';
    inputName.className = 'layers-section__item_current-input';
    inputName.value = currentLayer.children[0].innerHTML;
    inputName.addEventListener('change', layers.inputNameHandler);

    currentLayer.appendChild(inputName);
    inputName.focus();
  },
  inputNameHandler() {
    const currentLayer = document.querySelector('.layers-section__item_current');
    const layerName = currentLayer.children[0];
    if (this.value) {
      layerName.innerHTML = this.value;
    }
    currentLayer.removeChild(this);
  },
  dblclickInputName(e) {
    if (e.target.classList.contains('layers-section__item')) {
      layers.editLayerName();
    }
  },
  removeInputName(e) {
    const inputName = document.getElementById('layers-section__item_current-input');
    const currentLayer = document.querySelector('.layers-section__item_current');
    const changeNameButton = document.getElementById('editlayername');
    if (e.target !== inputName && e.target !== currentLayer
      && e.target !== changeNameButton) {
      if (inputName) {
        currentLayer.removeChild(inputName);
      }
    }
  },
  saveLayerData() {
    const currentLayer = document.querySelector('.layers-section__item_current');
    if (currentLayer) {
      const allFrames = document.querySelectorAll('.frame');
      const layerIndex = currentLayer.getAttribute('data-layer-index');
      for (let i = 0; i < allFrames.length; i += 1) {
        const frameCanvas = allFrames[i].children[0];
        const frameCtx = frameCanvas.getContext('2d');
        const frameId = allFrames[i].children[0].getAttribute('data-unique-id');
        layers.data[layerIndex][frameId] = frameCtx.getImageData(0, 0,
          frameCanvas.width, frameCanvas.height);
      }
    }
  },
  clearCanvas(x) {
    const drawCanvas = document.querySelector('.draw-canvas');
    const { width } = drawCanvas;
    const { height } = drawCanvas;
    x.clearRect(0, 0, width, height);
  },
  clearAllCanvases() {
    const drawCanvas = document.querySelector('.draw-canvas');
    const ctxDraw = drawCanvas.getContext('2d');
    const allFrames = document.querySelectorAll('.frame');
    for (let i = 0; i < allFrames.length; i += 1) {
      const frameCanvas = allFrames[i].children[0];
      const frameCtx = frameCanvas.getContext('2d');
      layers.clearCanvas(frameCtx);
    }
    layers.clearCanvas(ctxDraw);
  },
  readLayerData(x) {
    const allFrames = document.querySelectorAll('.frame');
    for (let i = 0; i < allFrames.length; i += 1) {
      const canvas = allFrames[i].children[0];
      const ctx = canvas.getContext('2d');
      const canvasAllLayers = canvas.children[0];
      const ctxAllLayers = canvasAllLayers.getContext('2d');
      const canvasId = canvas.getAttribute('data-unique-id');

      if (layers.data[x][canvasId]) {
        layers.clearCanvas(ctx);
        ctx.putImageData(layers.data[x][canvasId], 0, 0);
        ctxAllLayers.putImageData(layers.data[x][canvasId], 0, 0);
      } else {
        layers.clearCanvas(ctx);
      }
    }
  },
  readActiveFrame() {
    const canvasDraw = document.querySelector('.draw-canvas');
    const ctxDraw = canvasDraw.getContext('2d');
    const activeFrame = document.querySelector('.active-frame').children[0];
    layers.clearCanvas(ctxDraw);
    ctxDraw.drawImage(activeFrame, 0, 0);
  },
  writeAllLayersFrames() {
    const drawCanvas = document.querySelector('.draw-canvas');
    const allFrames = document.querySelectorAll('.frame');
    const canvasTemp = document.createElement('canvas');
    const ctxTemp = canvasTemp.getContext('2d');
    for (let i = 0; i < allFrames.length; i += 1) {
      const canvas = allFrames[i].children[0];
      const canvasAllLayers = canvas.children[0];
      const ctxAllLayers = canvasAllLayers.getContext('2d');
      const canvasId = canvas.getAttribute('data-unique-id');
      for (let j = 0; j < layers.layersNumbers.length; j += 1) {
        if (layers.data[layers.layersNumbers[j]]
          && layers.data[layers.layersNumbers[j]][canvasId]) {
          ctxTemp.putImageData(layers.data[layers.layersNumbers[j]][canvasId], 0, 0);
          ctxAllLayers.drawImage(canvasTemp, 0, 0);
          ctxTemp.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        }
      }
    }
  },
  copyLayerData(x, y) {
    for (let i = 0; i < layers.layersNumbers.length; i += 1) {
      layers.data[layers.layersNumbers[i]][x] = layers.data[layers.layersNumbers[i]][y];
    }
  },
  reindexLayersNumbers() {
    layers.layersNumbers = [];
    const allLayers = document.querySelectorAll('.layers-section__item');
    for (let i = 0; i < allLayers.length; i += 1) {
      layers.layersNumbers.push(+allLayers[i].getAttribute('data-layer-index'));
    }
    layers.saveLayerData();
    layers.writeAllLayersFrames();
  },
};

export default layers;
