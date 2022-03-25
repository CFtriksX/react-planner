import React from 'react';
import PropTypes from 'prop-types';
import {FaSave as IconSave} from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import { Project } from '../../class/export';

// Add mail and load pages in properties.
export default function ToolbarSaveButton({state, mail, loadPages}, {translator}) {

  // Instead of saving a file,
  // it uses fetch to make an api call with the mail and the map.
  // This might need an error handling if success != True
  let saveProjectToFile = e => {
    e.preventDefault();
    state = Project.unselectAll( state ).updatedState;
    const requestOptions = {
      method: 'POST',
      headers: { 'email': mail },
      body: JSON.stringify(state.get('scene'))
    };
    fetch('/api/map', requestOptions)
      .then(response => response.json());
    
    // Change page when the map is saved
    loadPages();
    // browserDownload(state.get('scene').toJS());
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t('Save project')} onClick={saveProjectToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
