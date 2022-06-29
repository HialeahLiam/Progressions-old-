import React from 'react';
import styles from './LibrarySearch.module.css';
import Search from '../icons/search';

function LibrarySearch() {
  return (
    <div className={styles.searchBar}>
      <Search />
      <span className={styles.text}>Search</span>

    </div>
  );
}

export default LibrarySearch;
