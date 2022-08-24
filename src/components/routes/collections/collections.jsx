import { cloneDeep } from 'lodash';
import React, {
  useState, useCallback, useContext, useMemo, useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { getCollectionFromCollectionTree } from '../../../utils/dataMethods';
import Libraries from '../../Libraries/Libraries';
import ProgressionsWindow from '../../ProgressionsWindow/ProgressionsWindow';
import './collections.css';
import { createCopyOfCollectionsAndAppendNewEntry } from './collections.utils';

function Collections() {
  const [library, setLibrary] = useState('public');
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [idPath, setIdPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [progressions, setProgressions] = useState([]);
  // const navigate = useNavigate();
  // const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  const Authorization = useMemo(() => `bearer ${currentUser?.token}`, [currentUser]);

  const handleLibrarySelection = useCallback((lib) => {
    if (lib !== library) {
      setCollections([]);
      setLibrary(lib);
      setIdPath([]);
    }
  });

  function handleCollectionSelect(path) {
    console.log('handleCollectionselected');
    if (!loading) setIdPath(path);
  }

  async function handleEntryCreation(entry) {
    try {
      let entry_type = '';
      if (entry.chords) {
        entry_type = 'progression';
      } else {
        console.log('recognized as collection');
        entry_type = 'collection';
      }
      // make POST request to server
      const { parent_collection_id } = entry;
      const responseBody = await (await fetch(`/api/v1/collections/${parent_collection_id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
        body: JSON.stringify({ entry, type: entry_type }),
      })).json();

      if (responseBody.error) {
        console.log(responseBody.error);
      } else {
        // update collections state instead of refretching.
        // Function deep copies collections to not modify state directly. Appends new entry to copy and returns it.
        const updatedCollections = createCopyOfCollectionsAndAppendNewEntry(collections, parent_collection_id, entry_type, responseBody.entry);
        setCollections(updatedCollections);
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }

  function handleTopLevelCollectionCreation(title) {
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
    setProgressions([]);
    const pathCollections = [];
    let current = collections;
    for (const cid of idPath) {
      current = current.find((c) => c._id === cid);
      if (current.entry_type === 'progression') setProgressions(current.entries);
      pathCollections.push({
        _id: current._id,
        title: current.title,
        entry_type: current.entry_type,
      });
      current = current.entries;
    }

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

    setProgressions([]);
    setSelectedCollections([]);
  }, [library]);

  useEffect(() => {
    if (!currentUser) setLibrary('public');
  }, [currentUser]);

  return (
    <div className="collections-main">
      <Libraries
        handleCollectionSelect={handleCollectionSelect}
        onLibrarySelection={handleLibrarySelection}
        onCollectionCreation={handleTopLevelCollectionCreation}
        collections={collections}
        loading={loading}
        library={library}
      />
      <ProgressionsWindow
        progressions={progressions}
        libraryScope={library}
        selectedCollections={selectedCollections}
        onEntryCreation={handleEntryCreation}
      />
    </div>
  );
}

export default Collections;
