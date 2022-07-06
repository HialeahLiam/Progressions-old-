import React, { useState } from 'react';
import CollectionCard from '../CollectionCard/CollectionCard';
import LibrarySearch from '../LibrarySearch/LibrarySearch';
import styles from './Libraries.module.css';

const collections = [
  {
    title: 'Smells Like Teen Spirit - Nirvana',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    title: 'Radiohead',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    title: 'Radiohead',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    title: 'Radiohead',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    title: 'Radiohead',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    title: 'Radiohead',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
  {
    title: 'Radiohead',
    type: 'Collection',
    downvotes: 123,
    upvotes: 321,
    user: 'HialeahLiam',
  },
];

function Libraries() {
  const [library, setLibrary] = useState('public');

  console.log(library);

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
        {collections.map(({
          title, type, upvotes, downvotes, user,
        }) => (
          <CollectionCard
            key={`${title}-${user}`}
            {... {
              title, type, upvotes, downvotes, user,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Libraries;
