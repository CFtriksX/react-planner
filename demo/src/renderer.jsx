import React from 'react';
import ReactDOM from 'react-dom';
import ContainerDimensions from 'react-container-dimensions';
import Immutable, {Map} from 'immutable';
import immutableDevtools from 'immutable-devtools';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import MyCatalog from './catalog/mycatalog';

import ToolbarScreenshotButton from './ui/toolbar-screenshot-button';

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from 'react-planner'; //react-planner

//define state
let AppState = Map({
  'react-planner': new PlannerModels.State()
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  return state;
};

let blackList = isProduction === true ? [] : [
  'UPDATE_MOUSE_COORDS',
  'UPDATE_ZOOM_SCALE',
  'UPDATE_2D_CAMERA'
];

if( !isProduction ) {
  console.info('Environment is in development and these actions will be blacklisted', blackList);
  console.info('Enable Chrome custom formatter for Immutable pretty print');
  immutableDevtools( Immutable );
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension ?
    window.devToolsExtension({
      features: {
        pause   : true,     // start/pause recording of dispatched actions
        lock    : true,     // lock/unlock dispatching actions and side effects
        persist : true,     // persist states on page reloading
        export  : true,     // export history of actions in a file
        import  : 'custom', // import history of actions from a file
        jump    : true,     // jump back and forth (time travelling)
        skip    : true,     // skip (cancel) actions
        reorder : true,     // drag and drop actions in the history list
        dispatch: true,     // dispatch custom actions or action creators
        test    : true      // generate tests for the selected actions
      },
      actionsBlacklist: blackList,
      maxAge: 999999
    }) :
    f => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [
  ToolbarScreenshotButton,
];

// This function load React-Planner.
function callRP(mail, loadPages) {
  return(
    <Provider store={store}>
    <ContainerDimensions>
      {({width, height}) =>
        <ReactPlanner
          catalog={MyCatalog}
          width={width}
          height={height}
          plugins={plugins}
          toolbarButtons={toolbarButtons}
          stateExtractor={state => state.get('react-planner')}
          mail={mail}
          loadPages={loadPages}
        />
      }
    </ContainerDimensions>
  </Provider>
  )
}

// This function load your menu.
function callMenu() {
  return(<p>Salut c'est le menu</p>);
}

// This function decide which menu you load.
function WichMenu(props) {
  switch (props.menuNumber) {
    case 1:
      return (callRP(props.mail, props.loadPages));
    default:
      return (callMenu());
  }
}

//This is a simple menu that renders either React-Planner or a simple email prompt.
class Menu extends React.Component { 
  constructor() {
    super();
    this.state = {
      menuNumber: 0,
      mail : ''
    };
    this.handleIdChange = this.handleIdChange.bind(this);
    this.loadPages = this.loadPages.bind(this);
  }
  
  // This function changes the mail variable and sets the autosave path for React-Planner
  handleIdChange(event) {
    this.setState({mail: event.target.value});
    plugins[1] = PlannerPlugins.Autosave('react-planner_' + event.target.value);
  }

  // This function changes which pages it need to display, it is not a boolean so you can add an input to have more than 2 pages.
  // It is passed to React-Planner as a property, You then just need to call it to load another page.
  loadPages() {
    this.setState({menuNumber: this.state.menuNumber ? 0 : 1 });
  }
  
  // Make sure to hide everything when you render React-Planner, it does not like to have anything else on the screen.
  render() {
    const menuNumber = this.state.menuNumber;
    const mail = this.state.mail;

    return(
      <div id='app'>
        {menuNumber == 0 ?
        <form onSubmit={ this.loadPages }>
          <label>Id to load:</label>
          <input value={mail} onChange={this.handleIdChange} type='string' />
          <input type='submit' value='Aller à RP' />
        </form> :
        null 
        }
        <WichMenu menuNumber={menuNumber} mail={mail} loadPages={this.loadPages}/>
      </div>
    );
  }
}

// The render was changed to a basic menu.
ReactDOM.render(
  (
    <Menu />
  ),
  document.getElementById('app')
);

