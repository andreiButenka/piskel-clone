const penSizeTool = {
  setEvents() {
    const penSizePanel = document.getElementById('pen-size-panel');
    penSizePanel.addEventListener('click', penSizeTool.setActivePenSize);
  },
  removePenSizeActiveState() {
    const penSizePanel = document.getElementById('pen-size-panel');
    for (let i = 0; i < penSizePanel.children.length; i += 1) {
      penSizePanel.children[i].classList.remove('active-pen-size');
    }
  },
  setActivePenSize(e) {
    if (e.target.classList.contains('pen-size-panel-item')) {
      penSizeTool.removePenSizeActiveState();
      e.target.classList.add('active-pen-size');
    }
  },
};

export default penSizeTool;
