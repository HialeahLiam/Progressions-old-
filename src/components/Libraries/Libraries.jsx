import React from 'react';
import LibrarySearch from '../LibrarySearch/LibrarySearch';
import styles from './Libraries.module.css';

function Libraries() {
  return (
    <div className={styles.container}>
      <LibrarySearch />
    </div>
  );
}

export default Libraries;
