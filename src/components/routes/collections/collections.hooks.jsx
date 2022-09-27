import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

function useCollectionsSearch(libraryScope) {
  const [library, setLibrary] = useState(() => libraryScope);
  const [collections, setCollections] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(`Search Text: ${searchText}`);
  }, [searchText]);

  useEffect(() => {
    const fetchPersonalCollections = async () => {
      try {
        setLoading(true);
        const response = await (await fetch(`/api/v1/users/${currentUser.id}/collections/search?text=${searchText}`, {
          headers: {
            Authorization: `bearer ${currentUser.token}`,
          },
        })).json();

        console.log('before false');
        setLoading(false);

        const { collections } = response;

        setCollections(collections);
      } catch (error) {
        console.log('ERROR');
        setLoading(false);
        console.log(`Couldn't retrieve ${currentUser.username}'s collections`);
      }
    };
    const fetchPublicCollections = async () => {
      try {
        setLoading(true);
        const response = await (await fetch(`/api/v1/collections/search?text=${searchText}`)).json();
        setLoading(false);

        const { collections } = response;

        setCollections(collections);
      } catch (error) {
        console.log('Couldn\'t retrieve public collections');
      }
    };

    if (library === 'public') {
      fetchPublicCollections();
    } else if (library === 'personal' && currentUser) {
      // fetch user's collections
      fetchPersonalCollections();
    }
  }, [searchText, library]);

  return {
    collections, setCollections, setSearchText, library, setLibrary, loading,
  };
}

export default useCollectionsSearch;
