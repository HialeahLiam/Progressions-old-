import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ChordNode from '../ChordNode/ChordNode';
import {
  Scale, convertSemitonesToChordString, getDiatonicChordsInSemitones,
} from '../../lib/progressions';
import styles from './RootInput.module.css';
import Button from '../Button/Button';
import ModifierInputButton from '../ModifierInputButton/ModifierInputButton';

const RADIUS_OF_NODES = 33;

const propTypes = {
  scale: PropTypes.oneOf(Object.keys(Scale).map((e) => Scale[e])).isRequired,
  handleRootSelect: PropTypes.func,
  radius: PropTypes.number,
};

const defaultProps = {
  radius: 130,
  handleRootSelect: (e) => console.log(e.target.value),
};

export default function RootInput({ scale, handleRootSelect, radius }) {
  const [intervals, setIntervals] = useState([]);

  const chords = useRef();

  function handleChordNodeClick(index) {
    handleRootSelect(chords.current[index].chord);
  }

  useEffect(() => {
    // returns chords in semitones
    const chordsOfScale = getDiatonicChordsInSemitones(Scale.MAJOR);
    chords.current = chordsOfScale.map((chord, i) => {
      const angle = 2 * Math.PI * (i / chordsOfScale.length);
      const x = radius * Math.sin(angle) + radius - RADIUS_OF_NODES;
      const y = radius - radius * Math.cos(angle);
      return { chord, x, y };
    });
  }, [radius, scale]);

  return (
    <div className={styles.container}>

      <div
        className={styles.circle}
        style={{
          width: `${2 * radius}px`,
          height: `${2 * radius + RADIUS_OF_NODES * 2}px`,
          marginRight: RADIUS_OF_NODES,
        }}
      >
        {chords.current && chords.current.map((obj, i) => (
          <ChordNode
            key={obj.chord[0]}
            chord={obj.chord}
            onClick={() => handleChordNodeClick(i)}
            position={{ x: obj.x, y: obj.y }}
            radius={RADIUS_OF_NODES}
          />
        ))}
        <Button type="round" clickHandler={() => null}>root</Button>
        <div
          className={styles.modifier}
          style={{
            left: `calc(${radius * 2}px + 5vw)`,
          }}
        />
      </div>

    </div>

  );
}

RootInput.defaultProps = defaultProps;

RootInput.propTypes = propTypes;
