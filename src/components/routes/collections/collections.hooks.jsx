import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import baseUrl from '../../../utils/backend';

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
        const response = await fetch(`${baseUrl}/api/v1/users/${currentUser.id}/collections/search?text=${searchText}`, {
          headers: {
            Authorization: `bearer ${currentUser.token}`,
          },
        });

        setLoading(false);

        if (response.status === 200) {
          const { collections } = await response.json();
          console.log('SET UNDEFINED');
          setCollections(collections);
        }
      } catch (error) {
        setLoading(false);
        console.log(`Couldn't retrieve ${currentUser.username}'s collections`);
      }
    };
    const fetchPublicCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/v1/collections/search?text=${searchText}`);
        setLoading(false);

        if (response.status === 200) {
          const { collections } = await response.json();
          console.log('SET UNDEFINED');
          setCollections(collections);
        }
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
