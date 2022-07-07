import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressionView.module.css';

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
        </div>
        <div className={styles.middle} />
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
