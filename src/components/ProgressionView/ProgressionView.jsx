import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressionView.module.css';
import IconWithLabel from '../IconWithLabel/IconWithLabel';
import ProgressionChords from '../ProgressionNotes/ProgressionChords';

function ProgressionView({ progression }) {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <div className={styles.titleAndStats}>
          <span className={styles.title}>{progression.title}</span>
          <div>
            <span className={styles.subtitle}>published by </span>
            {' '}
            <span className={styles.label}>{progression.user}</span>
          </div>
          <div className={styles.votes}>
            <IconWithLabel icon="thumbs-down" labelText={progression.downvotes} />
            <IconWithLabel icon="thumbs-up" labelText={progression.upvotes} />
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.soundwaveRow} />
          {/* <div className={styles.audioInfo}>

          </div> */}
          <div className={styles.musicInfo}>
            <div className={styles.musicInfoRow}>
              <div className={styles.trackInfo}>
                <span className={styles.label}>
                  {progression.song}
                  {' '}
                </span>
                <span className={`${styles.subtitle} ${styles.by}`}>by </span>
                <span className={styles.label}>
                  {' '}
                  {progression.artist}
                </span>
              </div>
            </div>
            <div className={styles.musicInfoRow}>
              <span className={styles.musicLeft}>Root:</span>
              <span className={styles.musicRight}>{progression.root}</span>
            </div>
            <div className={styles.musicInfoRow}>
              <span className={styles.musicLeft}>Mode:</span>
              <span className={styles.musicRight}>{progression.mode}</span>
            </div>

          </div>
          <ProgressionChords />
        </div>
        <div className={styles.youtube} />
      </div>
    </div>
  );
}

ProgressionView.propTypes = {
  progression: PropTypes.shape({
    title: PropTypes.string.isRequired,
    downvotes: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    root: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProgressionView;
