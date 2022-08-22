import React from 'react';
import PropTypes from 'prop-types';

function ProgressionToolbar({ libraryScope }) {
  return (
    <div>
      {libraryScope === 'personal' && <button type="button">edit</button>}
    </div>
  );
}

ProgressionToolbar.propTypes = {
  libraryScope: PropTypes.oneOf(['public', 'personal']).isRequired,
};

export default ProgressionToolbar;
