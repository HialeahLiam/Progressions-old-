import {
  Box, Slider, Stack, TextField, Typography,
} from '@mui/material';
import PropTypes, { number } from 'prop-types';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import styles from './Soundwave.module.css';

const CLICK_REGION_WIDTH = 3;

const propTypes = {
  endTime: PropTypes.number.isRequired,
  chordStartTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
  updateChordTimes: PropTypes.func.isRequired,
};

function Soundwave({
  endTime, chordStartTimes = [0], updateChordTimes, updateAudioRange, audioDuration,
  startPlaybackFromAndTo,
}) {
  const [waveLength, setWaveLength] = useState(null);
  const [waveX, setWaveX] = useState(null);
  const [needleClicked, setNeedleClick] = useState(null);
  // const [audioRange, setAudioRange] = useState([chordStartTimes[0], endTime]);
  // const [startTime, setStartTime] = useState(chordStartTimes[0]);
  const startTime = chordStartTimes[0];

  const soundwaveEl = useRef(null);

  const needlePositions = useMemo(
    () => chordStartTimes.map((time) => waveLength * ((time - startTime) / (endTime - startTime))),
    [chordStartTimes, waveLength],
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.target.getBoundingClientRect();
        setWaveLength(rect.width);
        setWaveX(rect.x);
      });
    });

    resizeObserver.observe(soundwaveEl.current);
  }, []);

  // position = 626
  // waveX = 591
  // wavelength = 306
  // endTime = 205
  // startTime = 25

  // useEffect(() => { setStartTime(chordStartTimes[0]); }, [chordStartTimes]);

  // useEffect(() => {
  //   setAudioRange([startTime, endTime]);
  // }, [startTime, endTime]);

  function convertAbsolutePositionToTime(position) {
    const proportion = (position - waveX) / waveLength;
    return (endTime - startTime) * proportion + startTime;
  }

  function handleMouseMove(mousePos) {
    if (needleClicked) {
      const leftBorder = waveX + needlePositions[needleClicked - 1] + 5;
      let rightBorder = waveX + waveLength - 5;

      if (needleClicked < needlePositions.length - 1) {
        rightBorder = waveX + needlePositions[needleClicked + 1] - 5;
      }

      const updatedStartTimes = [...chordStartTimes];

      if (mousePos >= leftBorder && mousePos <= rightBorder) {
        updatedStartTimes[needleClicked] = convertAbsolutePositionToTime(mousePos);
      } else if (mousePos > rightBorder) {
        updatedStartTimes[needleClicked] = convertAbsolutePositionToTime(rightBorder);
      } else {
        updatedStartTimes[needleClicked] = convertAbsolutePositionToTime(leftBorder);
      }
      updateChordTimes(updatedStartTimes);
    }
  }

  function handleNeedleClick(startTimeIndex) {
    setNeedleClick(startTimeIndex);
    document.body.onmouseup = () => { setNeedleClick(null); };
  }

  function handleAudioRangeChange(event) {
    updateAudioRange(event.target.value);
  }

  return (

    <div
      className={styles.container}
    >
      <Box>
        <Slider
          size="small"
          value={[startTime, endTime]}
          onChange={(e) => handleAudioRangeChange(e)}
          disableSwap
          min={0}
          max={audioDuration}
        />
      </Box>
      <Stack spacing={1} direction="row">
        <Typography variant="caption">{startTime}</Typography>
        <div
          ref={soundwaveEl}
          className={styles.soundwave}
          onMouseOver={() => {
            document.body.onmousemove = (e) => { handleMouseMove(e.pageX); };
            document.body.onmouseup = () => {
              document.body.onmousemove = null;
              setNeedleClick(null);
            };
          }}
          draggable="false"
        >
          {chordStartTimes.map((t, i) => (
            i === 0
              ? null
              : (
                <React.Fragment key={i}>
                  <div
                    className={styles.clickRegion}
                    style={{ left: needlePositions[i] - 2 }}
                    onMouseDown={() => handleNeedleClick(i)}
                  />
                  <div
                    style={{ left: needlePositions[i] }}
                    className={styles.needle}
                  />
                </React.Fragment>
              )
          ))}
        </div>
        <Typography variant="caption">{endTime}</Typography>
      </Stack>

    </div>

  );
}

Soundwave.propTypes = propTypes;

export default Soundwave;
