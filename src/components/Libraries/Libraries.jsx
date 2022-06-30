import React, { useState } from 'react';
import LibrarySearch from '../LibrarySearch/LibrarySearch';
import styles from './Libraries.module.css';

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
      <div className={styles.libraryTabs}>
        <div
          className={`${styles.tab} ${library === 'personal' ? styles.activeTab : null}`}
          onClick={(e) => handleTabClick('personal', e)}
          onKeyDown={(e) => handleTabClick('personal', e)}
          tabIndex={0}
          role="button"
        >
          Personal

        </div>
        <div
          className={`${styles.tab} ${library === 'public' ? styles.activeTab : null}`}
          onClick={(e) => handleTabClick('public', e)}
          onKeyDown={(e) => handleTabClick('public', e)}
          tabIndex={0}
          role="button"
        >
          Public

        </div>
      </div>
    </div>
  );
}

export default Libraries;
