import {PANEL_FOR_HOME} from '../../../store/panel/panelSlice';

export default function getLinkHomePanel(homePanelDesc) {
   let strArr = homePanelDesc
      .slice(homePanelDesc.indexOf('[') + 1, homePanelDesc.indexOf(']'))
      .split(',');
   // .map((str) => str.slice(str.indexOf('"') + 1, str.indexOf('"')));

   return strArr;
}
