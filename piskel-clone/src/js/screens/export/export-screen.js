/* global gapi */
import GIF from './gif/gif';
import UPNG from './apng/UPNG';

const exportScreen = {
  setEvents() {
    const downloadButton = document.getElementById('settings-section-panel_export-button');
    const uploadButton = document.getElementById('settings-section-panel_export-upload');
    const uploadGoogleButton = document.getElementById('upload-google');
    const exportFormatsList = document.getElementById('export-format-list');

    downloadButton.addEventListener('click', exportScreen.downloadGif);
    downloadButton.addEventListener('click', exportScreen.downloadAPNG);
    uploadButton.addEventListener('click', exportScreen.uploadGIF);
    uploadGoogleButton.addEventListener('click', exportScreen.uploadGIFtoGoogleDrive);

    exportFormatsList.addEventListener('click', exportScreen.setExportFormatActiveState);
    exportFormatsList.addEventListener('click', exportScreen.changeFormatTip);
    exportFormatsList.addEventListener('click', exportScreen.showUploadControls);
    window.addEventListener('click', exportScreen.hideUploadReport);
  },
  removeExportFormatActiveState() {
    const exportFormats = document.querySelectorAll('.export-format-list__item');
    for (let i = 0; i < exportFormats.length; i += 1) {
      exportFormats[i].classList.remove('export-format-list__item_active');
    }
  },
  setExportFormatActiveState(e) {
    if (e.target.classList.contains('export-format-list__item')) {
      exportScreen.removeExportFormatActiveState();
      e.target.classList.add('export-format-list__item_active');
    }
  },
  changeFormatTip(e) {
    const exportGIF = document.getElementById('exportgif');
    const exportAPNG = document.getElementById('exportapng');
    const exportTip = document.getElementById('export-controls-tip');

    if (e.target === exportGIF) {
      exportTip.innerHTML = 'Download as an animated <br> GIF.';
    }
    if (e.target === exportAPNG) {
      exportTip.innerHTML = 'Download as an animated <br> PNG.';
    }
  },
  showUploadControls(e) {
    const exportGIF = document.getElementById('exportgif');
    const exportAPNG = document.getElementById('exportapng');
    const uploadControls = document.getElementById('upload-controls');
    if (e.target === exportGIF) {
      uploadControls.classList.remove('hide');
    }
    if (e.target === exportAPNG) {
      uploadControls.classList.add('hide');
    }
  },
  downloadGif() {
    const exportFormat = document.getElementById('exportgif');
    if (exportFormat.classList.contains('export-format-list__item_active')) {
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'src/js/screens/export/gif/gif.worker.js',
      });

      const allFrames = document.querySelectorAll('.canvas-alllayers');
      for (let i = 0; i < allFrames.length; i += 1) {
        const frameRate = document.getElementById('frame-rate');
        gif.addFrame(allFrames[i], { delay: 1000 / frameRate.value });
      }
      gif.on('finished', (blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'super-piskel.gif';
        a.click();
        window.URL.revokeObjectURL(url);
      });

      gif.render();
    }
  },
  uploadGIF() {
    const exportFormat = document.getElementById('exportgif');
    if (exportFormat.classList.contains('export-format-list__item_active')) {
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'src/js/screens/export/gif/gif.worker.js',
      });

      const allFrames = document.querySelectorAll('.canvas-alllayers');
      for (let i = 0; i < allFrames.length; i += 1) {
        const frameRate = document.getElementById('frame-rate');
        gif.addFrame(allFrames[i], { delay: 1000 / frameRate.value });
      }
      gif.on('finished', (blob) => {
        const file = new File([blob], 'super-piskel', { type: 'image/gif', lastModified: Date.now() });
        const data = new FormData();
        data.append('api_key', 'Sm4ryc7U1TaaQDUIi7brM0c9nXDzpz88');
        data.append('file', file);
        data.append('tags', 'super-piskel, andreibutenka');

        exportScreen.fetchGiphy(data);
      });
      gif.render();
    }
  },
  downloadAPNG() {
    const exportFormat = document.getElementById('exportapng');
    const canvas = document.getElementById('draw-canvas');
    const imgs = [];
    const dels = [];
    if (exportFormat.classList.contains('export-format-list__item_active')) {
      const allFrames = document.querySelectorAll('.canvas-alllayers');
      for (let i = 0; i < allFrames.length; i += 1) {
        const frameRate = document.getElementById('frame-rate');
        const ctx = allFrames[i].getContext('2d');
        const dta = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        imgs.push(dta);
        dels.push(1000 / frameRate.value);
      }
      const result = UPNG.encode(imgs, canvas.width, canvas.height, 0, dels);
      const blob = new Blob([result], { type: 'image/apng' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'super-piskel.apng';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  },
  fetchGiphy(data) {
    fetch('http://upload.giphy.com/v1/gifs', {
      method: 'POST',
      mode: 'cors',
      headers: {
      },
      body: data,
    }).then(
      response => response.json(),
    ).then(
      (success) => {
        const report = document.getElementById('export-controls-upload-tip_report');
        const badReport = document.getElementById('export-controls-upload-tip_report-bad');
        const giphyRef = document.getElementById('giphy-url');

        giphyRef.href = `https://giphy.com/gifs/super-piskel-andreibutenka-${success.data.id}`;
        giphyRef.innerHTML = `https://giphy.com/gifs/super-piskel...<br>${success.data.id}`;
        badReport.classList.add('hide');
        report.classList.remove('hide');
      },
    ).catch(
      () => {
        const report = document.getElementById('export-controls-upload-tip_report');
        const badReport = document.getElementById('export-controls-upload-tip_report-bad');
        report.classList.add('hide');
        badReport.classList.remove('hide');
      },
    );
  },
  hideUploadReport(e) {
    const exportPanel = document.getElementById('settings-section-panel_export');
    const report = document.getElementById('export-controls-upload-tip_report');
    const googleReport = document.getElementById('google-drive-report');
    const badReport = document.getElementById('export-controls-upload-tip_report-bad');
    const apng = document.getElementById('exportapng');

    if (!exportPanel.contains(e.target)
      || e.target === apng) {
      report.classList.add('hide');
      badReport.classList.add('hide');
      googleReport.classList.add('hide');
    }
  },
  uploadGIFtoGoogleDrive() {
    const exportFormat = document.getElementById('exportgif');
    if (exportFormat.classList.contains('export-format-list__item_active')) {
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'src/js/screens/export/gif/gif.worker.js',
      });
      const allFrames = document.querySelectorAll('.canvas-alllayers');
      for (let i = 0; i < allFrames.length; i += 1) {
        const frameRate = document.getElementById('frame-rate');
        gif.addFrame(allFrames[i], { delay: 1000 / frameRate.value });
      }
      gif.on('finished', (blob) => {
        const file = new File([blob], 'super-piskel.gif', { type: 'image/gif', lastModified: Date.now() });
        const reader = new FileReader();
        reader.onload = () => {
          const content = new Blob([file]);
          const meta = { name: file.name, mimeType: file.type };
          const accessToken = gapi.auth.getToken().access_token;
          const payload = new FormData();
          payload.append('metadata', new Blob([JSON.stringify(meta)], { type: 'application/json' }));
          payload.append('file', content);
          const xhr = new XMLHttpRequest();
          xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
          xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
          xhr.onload = () => {
            const uploadReport = document.getElementById('google-drive-report');
            uploadReport.classList.remove('hide');
          };
          xhr.send(payload);
        };
        reader.readAsArrayBuffer(file);
      });
      gif.render();
    }
  },
};

export default exportScreen;
