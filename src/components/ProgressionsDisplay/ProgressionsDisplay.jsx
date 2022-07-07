/* eslint-disable no-underscore-dangle */
import React from 'react';
// import PropTypes from 'prop-types';
import ProgressionView from '../ProgressionView/ProgressionView';
import styles from './ProgressionsDisplay.module.css';

const progressions = [
  {
    _id: '62c6ea7432521f13af2674e2',
    title: 'My Kind of Woman - Verse',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
    song: 'My Kind of Woman',
    artist: 'Mac Demarco',
    root: 9,
    mode: 'major',
    parent_collection_id: '62c6ea7432521f13af2674de',
  },
  {
    _id: '62c6ea7432521f13af2674e3',
    title: 'My Kind of Woman - Chorus',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
    song: 'My Kind of Woman',
    artist: 'Mac Demarco',
    root: 9,
    mode: 'major',
    parent_collection_id: '62c6ea7432521f13af2674de',
  },
];
function ProgressionsDisplay() {
  return (
    <div className={styles.container}>
      {progressions.map((p) => <ProgressionView progression={p} key={p._id} />)}
    </div>
  );
}

ProgressionsDisplay.defaultProps = {
  progressions: [],
};

// ProgressionsDisplay.propTypes = {
//   progressions: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       downvotes: PropTypes.number.isRequired,
//       upvotes: PropTypes.number.isRequired,
//       user: PropTypes.string.isRequired,
//       root: PropTypes.number.isRequired,
//       mode: PropTypes.string.isRequired,
//       song: PropTypes.string.isRequired,
//       artist: PropTypes.string.isRequired,
//     }),
//   ),
// };
export default ProgressionsDisplay;
