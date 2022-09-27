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
import useCollectionsSearch from './collections.hooks';
import {
  createCopyOfCollectionsAndAppendNewEntry, createCopyOfCollectionsAndDeleteCollection, createCopyOfCollectionsAndDeleteProgression, createCopyOfCollectionsAndReplaceEntry,
} from './collections.utils';

function Collections() {
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [idPath, setIdPath] = useState([]);
  const [progressions, setProgressions] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const {
    collections, library, setCollections, setLibrary, setSearchText, loading,
  } = useCollectionsSearch('public');

  const Authorization = useMemo(() => `bearer ${currentUser?.token}`, [currentUser]);

  const handleLibrarySelection = useCallback((lib) => {
    if (lib !== library) {
      setCollections([]);
      setLibrary(lib);
      setIdPath([]);
    }
  });

  function handleCollectionSelect(path) {
    if (!loading) setIdPath(path);
  }

  async function handleEntryCreation(entry) {
    try {
      const entry_type = entry.chords ? 'progression' : 'collection';
      const { parent_collection_id } = entry;

      // make POST request to server
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
      console.log(e);
    }
  }

  async function handleEntryUpdate(entry) {
    try {
      const entry_type = entry.chords ? 'progression' : 'collection';
      const { _id } = entry;

      // make PUT request to server
      const endpoint = entry_type === 'progression' ? `/api/v1/progressions/${_id}` : `/api/v1/collections/${_id}`;
      const responseBody = await (await fetch(endpoint, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
        body: JSON.stringify({ entry, type: entry_type }),
      })).json();

      console.log(responseBody);

      if (responseBody.error) {
        console.log(responseBody.error);
      } else {
        // update collections state instead of refretching.
        // Function deep copies collections to not modify state directly. Replaces entry in copy and returns it.
        const updatedCollections = createCopyOfCollectionsAndReplaceEntry(collections, responseBody[0]);
        setCollections(updatedCollections);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleProgressionDelete(progId) {
    try {
      const responseBody = await fetch(`/api/v1/progressions/${progId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      });

      const updatedCollections = createCopyOfCollectionsAndDeleteProgression(collections, progId);
      console.log(updatedCollections);
      setCollections(updatedCollections);
    } catch (error) {
      console.log('Could not delete progression', error);
    }
  }

  async function handleCollectionDelete(collectionId) {
    try {
      const responseBody = await fetch(`/api/v1/collections/${collectionId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      });

      const updatedCollections = createCopyOfCollectionsAndDeleteCollection(collections, collectionId);
      console.log('collection DELETED');
      console.log(updatedCollections);
      setIdPath((prev) => prev.slice(0, -1));
      setCollections(updatedCollections);
    } catch (error) {
      console.log('Could not delete collection', error);
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

  function handleCollectionSearch(text) {
    setIdPath([]);
    setSearchText(text);
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
    setProgressions([]);
    setSelectedCollections([]);
    setIdPath([]);
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
        onSearch={handleCollectionSearch}
      />
      <ProgressionsWindow
        progressions={progressions}
        libraryScope={library}
        selectedCollections={selectedCollections}
        onEntryCreation={handleEntryCreation}
        onProgressionEdit={handleEntryUpdate}
        onProgressionDelete={handleProgressionDelete}
        onCollectionDelete={handleCollectionDelete}
      />
    </div>
  );
}

export default Collections;
