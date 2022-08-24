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
}) {
  const { currentUser } = useContext(AuthContext);
  const [searchText, setSearchText] = useState(null);
  // const [collections, setCollections] = useState([]);
  const [creatingCollection, createCollection] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const Authorization = useMemo(() => `bearer ${currentUser?.token}`, [currentUser]);

  const handleCollectionCreation = (title) => {
    // fetch(`/api/v1/users/${currentUser.id}/collections`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization,
    //   },
    //   body: JSON.stringify({ title }),
    // })
    //   .then((response) => response.json())
    //   .then((body) => setCollections((prev) => [...prev, body.collection]))
    //   .catch((e) => {
    //     console.log('Collection couldn\'t be added :()');
    //     console.log(e);
    //   });
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

  // useEffect(() => {
  //   const fetchPersonalCollections = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`/api/v1/users/${currentUser.id}/collections`, {
  //         headers: {
  //           Authorization: `bearer ${currentUser.token}`,
  //         },
  //       });
  //       setLoading(false);

  //       response.json().then(({ collections }) => setCollections(collections));
  //     } catch (error) {
  //       console.log(`Couldn't retrieve ${currentUser.username}'s collections`);
  //     }
  //   };
  //   const fetchPublicCollections = async () => {
  //     try {
  //       const response = await fetch('/api/v1/collections');

  //       response.json().then(({ collections }) => setCollections(collections));
  //     } catch (error) {
  //       console.log(`Couldn't retrieve ${currentUser.username}'s collections`);
  //     }
  //   };

  //   if (library === 'public') {
  //     fetchPublicCollections();
  //     createCollection(false);
  //   } else if (library === 'personal' && currentUser) {
  //     // fetch user's collections
  //     fetchPersonalCollections();
  //   }
  // }, [library]);

  // useEffect(() => {
  //   if (!currentUser) setLibrary('public');
  // }, [currentUser]);

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
