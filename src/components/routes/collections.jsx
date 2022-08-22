import { cloneDeep } from 'lodash';
import React, {
  useState, useCallback, useContext, useMemo, useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Libraries from '../Libraries/Libraries';
import ProgressionsWindow from '../ProgressionsWindow/ProgressionsWindow';
import './collections.css';

function Collections() {
  const [library, setLibrary] = useState('public');
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [idPath, setIdPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  // const navigate = useNavigate();
  // const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  const Authorization = useMemo(() => `bearer ${currentUser?.token}`, [currentUser]);

  const handleLibrarySelection = useCallback((lib) => {
    setCollections([]);
    setLibrary(lib);
    setIdPath([]);
  });

  function handleCollectionSelect(path) {
    if (!loading) setIdPath(path);
  }

  function handleEntryCreation(entry) {
    console.log('entry');
    console.log(entry);
    // entry is a progression
    if (entry.chords) {
      // the array is an array of references. New entry will be remembered.
      const collectionsCopy = cloneDeep(collections);
      let current = collectionsCopy.find((c) => c._id === selectedCollections[0]._id);
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 1; i < selectedCollections.length; i++) {
        current = current.entries.find((e) => selectedCollections[i]._id === e._id);
      }
      current.entry_type = 'progression';
      current.entries.push(entry);
      setCollections(collectionsCopy);
    }
  }

  function handleCollectionCreation(title) {
    fetch(`/api/v1/users/${currentUser.id}/collections`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((body) => setCollections((prev) => [...prev, body.collection]))
      .catch((e) => {
        console.log('Collection couldn\'t be added :()');
        console.log(e);
      });
  }

  useEffect(() => {
    const pathCollections = [];
    console.log(idPath);
    console.log(collections);
    if (idPath.length > 0) {
      let current = collections.find((c) => c._id === idPath[0]);
      if (current) pathCollections.push(current);
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 1; i < idPath.length; i++) {
        current = current.entries.find((e) => idPath[i] === e._id);
        pathCollections.push(current);
      }
    }
    console.log(pathCollections);
    setSelectedCollections(pathCollections);
  }, [collections, idPath]);

  useEffect(() => {
    const fetchPersonalCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/users/${currentUser.id}/collections`, {
          headers: {
            Authorization: `bearer ${currentUser.token}`,
          },
        });
        setLoading(false);

        response.json().then(({ collections }) => setCollections(collections));
      } catch (error) {
        console.log(`Couldn't retrieve ${currentUser.username}'s collections`);
      }
    };
    const fetchPublicCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/v1/collections');
        setLoading(false);

        response.json().then(({ collections }) => setCollections(collections));
      } catch (error) {
        console.log(`Couldn't retrieve ${currentUser.username}'s collections`);
      }
    };

    if (library === 'public') {
      fetchPublicCollections();
    } else if (library === 'personal' && currentUser) {
      // fetch user's collections
      fetchPersonalCollections();
    }
  }, [library]);

  useEffect(() => {
    if (!currentUser) setLibrary('public');
  }, [currentUser]);

  return (
    <div className="collections-main">
      <Libraries
        handleCollectionSelect={handleCollectionSelect}
        onLibrarySelection={handleLibrarySelection}
        onCollectionCreation={handleCollectionCreation}
        collections={collections}
        loading={loading}
        library={library}
      />
      <ProgressionsWindow
        libraryScope={library}
        selectedCollections={selectedCollections}
        onEntryCreation={handleEntryCreation}
      />
    </div>
  );
}

export default Collections;
