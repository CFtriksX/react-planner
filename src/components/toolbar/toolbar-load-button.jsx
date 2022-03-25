import React from 'react';
import PropTypes from 'prop-types';
import {FaFolderOpen as IconLoad} from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import {browserUpload}  from '../../utils/browser';

// Add mail in properties.
export default function ToolbarLoadButton({state, mail}, {translator, projectActions}) {

  // Instead of loading from a file,
  // it uses fetch to make an api call with the mail.
  // If the mail does not exist, it does nothing.
  let loadProjectFromFile = event => {
    event.preventDefault();
    fetch('/api/map?email=' + mail)
      .then(response => response.json())
      .then((data) => {
        if (data.success == true ) {projectActions.loadProject(data.saved_map);}
      });
    // browserUpload()
    //   .then((data) => {
    //     projectActions.loadProject(JSON.parse(data));
    // });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Load project")} onClick={loadProjectFromFile}>
      <IconLoad />
    </ToolbarButton>
  );
}

ToolbarLoadButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
