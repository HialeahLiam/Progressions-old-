import React from 'react';
import styles from './LibrarySearch.module.css';
import Search from '../icons/search';

function LibrarySearch({ onChange }) {
  return (
    <input
      type="text"
      placeholder="Search Collections"
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
    />

  );
}

export default LibrarySearch;
