import frames from '../../components/frames-list/frames-list';

const stickyMenu = {
  setEvents() {
    const settingsSection = document.getElementById('settings-section');
    const chooseCanvasSizeForm = document.getElementById('settings-section-panel_resize-form');

    settingsSection.addEventListener('click', stickyMenu.showSettingsPanelHandeler);
    settingsSection.addEventListener('click', stickyMenu.chooseSettingsPanelHandeler);
    chooseCanvasSizeForm.addEventListener('submit', stickyMenu.chooseCanvasSizeFormHandler);
    window.addEventListener('click', stickyMenu.settingsIconsHandler);
  },
  showSettingsPanelHandeler(e) {
    const settingsSection = document.getElementById('settings-section');

    if (e.target.classList.contains('settings-section-icon')
      && !e.target.classList.contains('settings-section-icon_active')) {
      settingsSection.classList.add('settings-section-visible');
    }
    if (e.target.classList.contains('settings-section-icon')
      && e.target.classList.contains('settings-section-icon_active')) {
      settingsSection.classList.remove('settings-section-visible');
    }
  },
  chooseSettingsPanelHandeler(e) {
    const panels = document.querySelectorAll('.settings-section-panel');
    const userPanel = document.getElementById('settings-section-panel_user');
    const resizePanel = document.getElementById('settings-section-panel_resize');
    const savePanel = document.getElementById('settings-section-panel_save');
    const exportPanel = document.getElementById('settings-section-panel_export');
    const importPanel = document.getElementById('settings-section-panel_import');

    const deleteActiveState = (x) => {
      for (let i = 0; i < x.length; i += 1) {
        x[i].classList.remove('settings-section-panel-active');
      }
    };
    if (e.target.classList.contains('settings-section-icon_user')) {
      deleteActiveState(panels);
      userPanel.classList.add('settings-section-panel-active');
    }
    if (e.target.classList.contains('settings-section-icon_resize')) {
      deleteActiveState(panels);
      resizePanel.classList.add('settings-section-panel-active');
    }
    if (e.target.classList.contains('settings-section-icon_save')) {
      deleteActiveState(panels);
      savePanel.classList.add('settings-section-panel-active');
    }
    if (e.target.classList.contains('settings-section-icon_export')) {
      deleteActiveState(panels);
      exportPanel.classList.add('settings-section-panel-active');
    }
    if (e.target.classList.contains('settings-section-icon_import')) {
      deleteActiveState(panels);
      importPanel.classList.add('settings-section-panel-active');
    }
  },
  settingsIconsHandler(e) {
    const settingsSection = document.getElementById('settings-section');
    const icons = document.querySelectorAll('.settings-section-icon');
    const deleteActiveState = (x, y) => {
      for (let i = 0; i < x.length; i += 1) {
        if (x[i] !== y) {
          x[i].classList.remove('settings-section-icon_active');
        }
      }
    };
    if (!e.target.classList.contains('settings-section-icon')
      && !settingsSection.contains(e.target)) {
      deleteActiveState(icons);
      settingsSection.classList.remove('settings-section-visible');
    }
    if (e.target.classList.contains('settings-section-icon')) {
      deleteActiveState(icons, e.target);
      e.target.classList.toggle('settings-section-icon_active');
    }
  },
  setCanvasMinSize(x) {
    const canvas = document.querySelector('.draw-canvas');
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const canvasCopy = document.getElementById('canvas-copy');
    const canvasTemp = document.getElementById('canvas-temp');
    canvas.style.minWidth = `${x}px`;
    canvas.style.minHeight = `${x}px`;
    canvasCopy.style.minWidth = `${x}px`;
    canvasCopy.style.minHeight = `${x}px`;
    canvasTemp.style.minWidth = `${x}px`;
    canvasTemp.style.minHeight = `${x}px`;
    canvasCursor.style.minWidth = `${x}px`;
    canvasCursor.style.minHeight = `${x}px`;
  },
  chooseCanvasSizeFormHandler(e) {
    e.preventDefault();
    const canvas = document.querySelector('.draw-canvas');
    const ctx = canvas.getContext('2d');
    const canvasCursor = document.getElementById('canvas-cursor'); // console.log('click');
    const canvasTemp = document.createElement('canvas');
    const canvasWidth = document.getElementById('canvas-width');
    const canvasHeight = document.getElementById('canvas-height');
    // canvasTemp.style.display = 'none';
    // document.body.appendChild(canvasTemp);
    const canvasTempCtx = canvasTemp.getContext('2d');
    canvasTempCtx.drawImage(canvas, 0, 0);

    const inputs = document.getElementsByClassName('canvas-size-choice');
    // console.log(inputs);
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].checked) {
        // console.log(inputs[i].value);
        canvas.width = +inputs[i].value;
        canvas.height = +inputs[i].value;
        canvasWidth.innerHTML = +inputs[i].value;
        canvasHeight.innerHTML = +inputs[i].value;
        stickyMenu.setCanvasMinSize(+inputs[i].value);
        ctx.drawImage(canvasTemp, 0, 0);
        canvasTemp.width = canvas.width;
        canvasTemp.height = canvas.height;
        canvasCursor.width = canvas.width;
        canvasCursor.height = canvas.height;
        frames.changeFramesAfterResize(+inputs[i].value);
      }
    }
  },

};

export default stickyMenu;
