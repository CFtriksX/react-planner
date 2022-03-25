const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;
import { loadProject } from '../actions/project-actions';

const TIMEOUT_DELAY = 500;

let timeout = null;

export default function autosave(autosaveKey, delay) {

  return (store, stateExtractor) => {

    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      let data = localStorage.getItem(autosaveKey);
      let json = JSON.parse(data);
      store.dispatch(loadProject(json));
    } else {
      // If the map does not exist in the local storage it cleans the local storage and
      // try to fecth it from the database. (Do nothing if it does not exist)
      localStorage.clear();
      fetch('/api/map?email=' + autosaveKey.slice(14))
      .then(response => response.json())
      .then((data) => {
        if (data.success == true ) {store.dispatch(loadProject(data.saved_map));}
      });
    }

    //update
    store.subscribe(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        let state = stateExtractor(store.getState());
        localStorage.setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay);
    });
  };
}
