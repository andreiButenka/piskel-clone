import canvases from './screens/canvas/canvas';
import utilities from './components/utilities-list/utilities-list';
import toolsList from './components/tools-list/tools-list';
import frames from './components/frames-list/frames-list';
import layers from './components/layers-list/layers-list';
import transforms from './components/transform-list/transform-list';
import preview from './screens/preview/preview';
import exportScreen from './screens/export/export-screen';
import shortcuts from './components/shortcuts-list/shotrcuts-list';
import stickyMenu from './screens/sticky-menu/sticky-menu';
import infoPanel from './screens/info-panel/info-panel';
import canvasZoom from './screens/canvas-zoom/canvas-zoom';
import App from './App';
import '../css/reset.css';
import '../sass/index.sass';

const piskelScreens = [
  canvases,
  canvasZoom,
  exportScreen,
  infoPanel,
  preview,
  stickyMenu,
];

const piskelComponents = [
  utilities,
  frames,
  layers,
  toolsList,
  shortcuts,
  transforms,
];

const app = new App(piskelScreens, piskelComponents);

app.start();

export default App;
