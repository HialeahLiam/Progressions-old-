import React, { useState } from 'react';
import Libraries from '../Libraries/Libraries';
import ProgressionsDisplay from '../ProgressionsDisplay/ProgressionsDisplay';
import './collections.css';

function Collections() {
  const [progressions, setProgressions] = useState([]);

  return (
    <div className="collections-main">
      <Libraries showProgressions={(progs) => setProgressions(progs)} />
      <ProgressionsDisplay progressions={progressions} />
    </div>
  );
}

export default Collections;
