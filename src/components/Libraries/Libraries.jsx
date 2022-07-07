import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CollectionCard from '../CollectionCard/CollectionCard';
import LibrarySearch from '../LibrarySearch/LibrarySearch';
import styles from './Libraries.module.css';

const collections = [
  {
    _id: '62c6ea7432521f13af267445',
    title: 'Smells Like Teen Spirit - Nirvana',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    _id: '62c6ea7432521f13af2674db',
    title: 'Mac Demarco',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
    entry_type: 'collection',
    entries: [
      {
        _id: '62c6ea7432521f13af2674de',
        title: 'My Kind of Woman',
        downvotes: 123,
        upvotes: 321,
        user: 'HialeahLiam',
        parent_collection_id: '62c6ea7432521f13af2674db',
        entry_type: 'progression',
        entries: [
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
        ],
      },
      {
        _id: '62c6ea7432521f13af2674df',
        title: 'Freaking Out The Neighborhood',
        downvotes: 123,
        upvotes: 321,
        user: 'HialeahLiam',
        parent_collection_id: '62c6ea7432521f13af2674db',
        entry_type: 'progression',
        entries: [
          {
            _id: '62c6ea7432521f13af2674e4',
            title: 'Freaking Out The Neighborhood - Intro',
            downvotes: 123,
            upvotes: 321,
            user: 'HialeahLiam',
            song: 'Freaking Out The Neighborhood',
            artist: 'Mac Demarco',
            root: 9,
            mode: 'major',
            parent_collection_id: '62c6ea7432521f13af2674df',
          },
        ],
      },
    ],
  },
  {
    _id: '62c6ea7432521f13af267446',
    title: 'Radiohead',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    _id: '62c6ea7432521f13af267448',
    title: 'Radiohead',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    _id: '62c6ea7432521f13af267449',
    title: 'Radiohead',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    _id: '62c6ea7432521f13af2',
    title: 'Radiohead',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    _id: '62c6ea7432521f13af267125',
    title: 'Radiohead',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
];

function Libraries({ showProgressions }) {
  const [library, setLibrary] = useState('public');

  const handleTabClick = (lib, e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') {
      return;
    }
    setLibrary(lib);
  };

  return (
    <div className={styles.container}>
      <LibrarySearch />
      <nav className={styles.libraryTabs}>
        <button
          className={`${styles.tab} ${library === 'personal' ? styles.activeTab : null}`}
          onClick={(e) => handleTabClick('personal', e)}
          onKeyDown={(e) => handleTabClick('personal', e)}
          tabIndex={0}
          type="button"
        >
          Personal

        </button>
        <button
          className={`${styles.tab} ${library === 'public' ? styles.activeTab : null}`}
          onClick={(e) => handleTabClick('public', e)}
          onKeyDown={(e) => handleTabClick('public', e)}
          tabIndex={0}
          type="button"
        >
          Public

        </button>
      </nav>
      <div className={styles.collections}>
        <div className={styles.scrollContainer}>
          {collections.map((c) => (
            // eslint-disable-next-line no-underscore-dangle
            <CollectionCard showProgressions={showProgressions} key={c._id} collections={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

Libraries.propTypes = {
  showProgressions: PropTypes.func.isRequired,
};

export default Libraries;
