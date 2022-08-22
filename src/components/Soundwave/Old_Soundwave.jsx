import { number } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Soundwave.module.css';

function Soundwave({
  edit, startTime, endTime, chordStartTimes, updateChordTimes,
}) {
  const [needlePositions, setNeedles] = useState([]);
  const [needleClicked, setNeedleClick] = useState(null);
  const soundwaveEl = useRef(null);

  // function handleNeedleDrag(percent) {
  //   const width = soundwaveEl.current.offsetWidth;
  //   setNeedle(width * percent);
  // }

  function handleMouseMove(event) {
    if (needleClicked !== null) {
      let leftBorder = 5;
      let rightBorder = soundwaveEl.current.offsetWidth - 5;

      if (needleClicked > 0) {
        leftBorder += needlePositions[needleClicked - 1];
      }
      if (needleClicked < needlePositions.length - 1) {
        rightBorder = needlePositions[needleClicked + 1] - 5;
      }

      const copy = [...needlePositions];
      if (event.pageX >= leftBorder + soundwaveEl.current.getBoundingClientRect().x
        && event.pageX <= soundwaveEl.current.getBoundingClientRect().x + rightBorder) {
        copy[needleClicked] = event.pageX - soundwaveEl.current.getBoundingClientRect().x;
      } else if (event.pageX > rightBorder + soundwaveEl.current.getBoundingClientRect().x) {
        copy[needleClicked] = rightBorder;
      } else {
        copy[needleClicked] = leftBorder;
      }

      setNeedles(copy);
    }
  }

  function handleNeedleClick(positionIndex) {
    setNeedleClick(positionIndex);
    document.body.onmouseup = () => { setNeedleClick(null); };
  }

  function convertTimesToNeedlePositions(times) {
    return times.map((t, i) => (
      soundwaveEl.current.offsetWidth * ((t - startTime) / (endTime - startTime))
    ));
  }

  useEffect(() => {
    // call updateCordTimes(newTimes) with new chord times calculated from
    // needle positions and the soundwave length
    const newChordTimes = [startTime, ...needlePositions.map((p) => (
      startTime
      + (endTime - startTime) * (p / soundwaveEl.current.offsetWidth)
    ))];

    updateChordTimes(newChordTimes);
  }, [needlePositions]);

  // adds new position when chords times are added/removed after initial render
  // ! assumes new chord times are added ONE AT A TIME !
  useEffect(() => {
    if (chordStartTimes.length - 1 < needlePositions.length) {
      setNeedles((prev) => prev.slice(0, -1));
    } else if (chordStartTimes.length - 1 > needlePositions.length) {
      const lastChordPosition = needlePositions[chordStartTimes.at(-2)];
      setNeedles((prev) => [...prev, prev.at(-1) + 10]);
    }
  }, [chordStartTimes]);

  useEffect(() => {
    setNeedles(convertTimesToNeedlePositions(chordStartTimes.slice(1)));
  }, [soundwaveEl.current]);

  return (
    edit
      ? (
        <div
          onMouseOver={() => {
            document.body.onmousemove = handleMouseMove;
            document.body.onmouseup = () => {
              document.body.onmousemove = null;
              setNeedleClick(null);
            };
          }}
          draggable="false"
          className={styles.container}
        >
          <div>{startTime}</div>
          <div
            ref={soundwaveEl}
            className={styles.soundwave}
          >

            {needlePositions.map((t, i) => (
              <div
                key={i}
                onMouseDown={() => handleNeedleClick(i)}
                style={{ left: t }}
                className={styles.needle}
              />
            ))}
          </div>
          <div>{endTime}</div>

        </div>
      )
      : (
        <div
          draggable="false"
          className={styles.container}
        >
          <div
            ref={soundwaveEl}
            className={styles.soundwave}
          />

        </div>
      )
  );
}

export default Soundwave;
