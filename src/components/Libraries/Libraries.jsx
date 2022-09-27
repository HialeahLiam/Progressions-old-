import React, {
  useContext, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import CollectionCard from '../shared/CollectionCard/CollectionCard';
import LibrarySearch from '../LibrarySearch/LibrarySearch';
import styles from './Libraries.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import TitleInput from '../shared/TitleInput/TitleInput';

function Libraries({
  handleCollectionSelect,
  onLibrarySelection,
  onCollectionCreation,
  collections,
  loading = false,
  library = 'public',
  onSearch,
}) {
  const { currentUser } = useContext(AuthContext);
  // const [collections, setCollections] = useState([]);
  const [creatingCollection, createCollection] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const Authorization = useMemo(() => `bearer ${currentUser?.token}`, [currentUser]);

  const handleCollectionCreation = (title) => {
    onCollectionCreation(title);
    createCollection(false);
  };

  const handleTabClick = (lib, e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') {
      return;
    }

    if (lib === 'personal' && !currentUser) {
      navigate('/login', { state: { from: location } });
    }
    // setCollections([]);
    // setLibrary(lib);
    onLibrarySelection(lib);
    createCollection(false);
  };

  const handleSearchInput = (text) => {
    onSearch(text);
  };

  return (
    <div className={styles.container}>
      <LibrarySearch onChange={handleSearchInput} />
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
      <div className={styles.scrollContainer}>
        {collections.map((c) => (
          // eslint-disable-next-line no-underscore-dangle
          <CollectionCard
            onClick={handleCollectionSelect}
            key={c._id}
            rootCollection={c}
            initialCollectionId={c.focusedCollectionId}
          />
        ))}

        {loading && <Typography variant="h5">loading...</Typography>}

        {creatingCollection && <TitleInput onSubmit={handleCollectionCreation} />}
      </div>
      {library === 'personal'
        && (
        <button
          className={styles.createCollection}
          onClick={() => createCollection(true)}
        >
          create collection

        </button>
        )}
    </div>
  );
}

// Libraries.propTypes = {
//   // handleProgressionParentSelect: PropTypes.func.isRequired,
//   handleLibrarySelection: PropTypes.func.isRequired,
// };

export default Libraries;
