import { cloneDeep } from 'lodash';
import React, {
  useState, useCallback, useContext, useMemo, useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getCollectionFromCollectionTree } from '../../utils/dataMethods';
import Libraries from '../Libraries/Libraries';
import ProgressionsWindow from '../ProgressionsWindow/ProgressionsWindow';
import './collections.css';

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
    // entry is a progression
      const collectionsCopy = cloneDeep(collections);

      if (entry.chords) {
        console.log('recognize as progression');
        // the array is an array of references. New entry will be remembered.
        let current = collectionsCopy.find((c) => c._id === selectedCollections[0]._id);
        for (let i = 1; i < selectedCollections.length; i++) {
          current = current.entries.find((e) => selectedCollections[i]._id === e._id);
        }
        current.entry_type = 'progression';
        console.log('current');
        console.log(current);
        current.entries.push(entry);
      } else {
        console.log('recognized as collection');

        // make POST request to server
        const { title, parent_collection_id } = entry;
        const responseBody = await (await fetch(`/api/v1/collections/${parent_collection_id}`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization,
          },
          body: JSON.stringify({ entry: { title }, type: 'collection' }),
        })).json();

        // update collections data structure
        let parentCollection = null;
        for (const c of collectionsCopy) {
          parentCollection = getCollectionFromCollectionTree(c, entry.parent_collection_id);
          if (parentCollection) {
            // backend updates entry type, but we must update it for stale data.
            // backend checks if it already has a 'progression' type. We do not here.
            parentCollection.entry_type = 'collection';
            parentCollection.entries.push(responseBody.collection);

            // This id is only added to the updated collection clone. It is passed on to CollectionCard
            // so that it displays the updated collection entries
            c.focusedCollectionId = parent_collection_id;
            break;
          }
        }

        setCollections(collectionsCopy);
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
    console.log(idPath);
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
