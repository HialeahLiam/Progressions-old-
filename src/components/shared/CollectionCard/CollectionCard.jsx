import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CollectionCard.module.css';
import IconWithLabel from '../../IconWithLabel/IconWithLabel';
import { getCollectionFromCollectionTree } from '../../../utils/dataMethods';

// TODO
function CollectionCard({
  rootCollection,
  initialCollectionId,
  onClick,
}) {
  const [displayedCollections, setDisplayCollections] = useState([]);
  const [clickPath, setClickPath] = useState([]);
  const [backVisible, setBackVisible] = useState(false);

  function handleBackClick() {
    const newPath = clickPath.slice(0, -1);
    onClick(newPath);
    setClickPath(newPath);
  }

  function handleCollectionClick(collectionId) {
    onClick(clickPath);
    const lastClickedId = clickPath.at(-1);
    if (lastClickedId !== collectionId) {
      const lastClicked = getCollectionFromCollectionTree(rootCollection, lastClickedId);
      let newPath = [...clickPath];
      if (lastClicked?.entry_type !== 'collection') {
        newPath = newPath.slice(0, -1);
      }
      newPath.push(collectionId);
      onClick(newPath);
      setClickPath(newPath);
    }
  }

  useEffect(() => {
    if (initialCollectionId) {
      // TODO find the collection and set it's children as displayed
      let current = getCollectionFromCollectionTree(rootCollection, initialCollectionId);
      let newPath = [];
      while (current) {
        const { _id } = current;
        newPath = [_id, ...newPath];
        current = getCollectionFromCollectionTree(rootCollection, current.parent_collection_id);
      }
      setClickPath(newPath);
    } else {
      const {
        _id, title, downvotes, upvotes, user,
      } = rootCollection;

      setDisplayCollections([{
        _id, title, downvotes, upvotes, user,
      }]);

      setClickPath([]);
      setBackVisible(false);
    }
  }, [rootCollection]);

  useEffect(() => {
    // Can't be called here because selectedCollections in collections.jsx will be reset to [] when new collections
    // added, since this effect is called on first render for all cards.
    // onClick(clickPath);
    if (clickPath.length === 0) {
      setBackVisible(false);
      setDisplayCollections([rootCollection]);
    } else {
      const parentId = clickPath.at(-1);
      const parentCollection = getCollectionFromCollectionTree(rootCollection, parentId);
      if (parentCollection.entry_type === 'collection') {
        setBackVisible(true);
        setDisplayCollections(parentCollection.entries);
      }
    }
  }, [clickPath]);

  return (
    <div className={styles.container}>
      {displayedCollections.map((c, collectionIndex) => (
        <div key={c._id} className={styles.collection}>
          <button
            type="button"
            aria-label="go to parent collection"
            className={`${collectionIndex === 0
              && backVisible
              ? null : styles.hidden}`}
            onClick={handleBackClick}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 7L7 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.card}>
            <button
              type="button"
              onClick={() => handleCollectionClick(c._id)}
              className={styles.clickArea}
            >
              <h3 className={styles.title}>{c.title}</h3>
              <div className={styles.type}>Collection</div>
            </button>
            <div className={styles.dataRow}>
              {c.downvotes && <IconWithLabel icon="thumbs-down" labelText={c.downvotes} />}
              {c.upvotes && <IconWithLabel icon="thumbs-up" labelText={c.upvotes} />}
              {c.user && <IconWithLabel icon="upload-cloud" labelText={c.user} />}
            </div>
          </div>
          <div className={styles.addButtons}>
            <button className={styles.addPlus} type="button">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.83337V13.1667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.33334 8.5H12.6667" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={styles.addCircle} type="button">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_114_1208)">
                  <path d="M7.00001 12.6666C9.3012 12.6666 11.1667 10.8012 11.1667 8.49998C11.1667 6.19879 9.3012 4.33331 7.00001 4.33331C4.69882 4.33331 2.83334 6.19879 2.83334 8.49998C2.83334 10.8012 4.69882 12.6666 7.00001 12.6666Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const collectionShape = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  user: PropTypes.string,
  entry_type: PropTypes.oneOf(['collection', 'progression']),
};

CollectionCard.propTypes = {
  rootCollection: PropTypes.shape(
    {
      ...collectionShape,
      entries: PropTypes.arrayOf(PropTypes.shape(collectionShape)),
    },
  ).isRequired,
  onClick: PropTypes.func,
  initialCollectionId: PropTypes.string,
};

CollectionCard.defaultProps = {
  onClick: null,
  initialCollectionId: '',
};
export default CollectionCard;
