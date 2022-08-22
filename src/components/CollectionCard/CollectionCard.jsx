import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PhpTwoTone } from '@mui/icons-material';
import styles from './CollectionCard.module.css';
import IconWithLabel from '../IconWithLabel/IconWithLabel';

function CollectionCard({
  collections,
  handleCollectionSelect,
}) {
  const [collectionStack, setCollections] = useState([[collections]]);
  const [path, setPath] = useState([]);
  const [deadEnd, setDeadEnd] = useState(false);

  function handleCollectionClick(collectionIndex) {
    const clickedCollection = collectionStack.at(-1)[collectionIndex];

    if (clickedCollection.entry_type === 'collection') {
      setCollections((stack) => [...stack, clickedCollection.entries]);
      // setPath((prev) => [...prev, clickedCollection]);
      setPath((prev) => [...prev, clickedCollection._id]);
    } else if (!deadEnd) {
      // setPath((prev) => [...prev, clickedCollection]);
      setPath((prev) => [...prev, clickedCollection._id]);
      setDeadEnd(true);
    } else {
      // setPath((prev) => [...prev.slice(0, -1), clickedCollection]);
      setPath((prev) => [...prev.slice(0, -1), clickedCollection._id]);
    }
  }

  function handleBackClick() {
    if (deadEnd) {
      setPath((prev) => prev.slice(0, -2));
    } else setPath((prev) => prev.slice(0, -1));

    setCollections((stack) => stack.slice(0, -1));
    setDeadEnd(false);
  }

  useEffect(() => {
    handleCollectionSelect(path);
  }, [path]);

  return (
    <div className={styles.container}>
      {collectionStack.at(-1).map((c, collectionIndex) => (
        // eslint-disable-next-line no-underscore-dangle
        <div key={c._id} className={styles.collection}>
          <button
            type="button"
            className={`${collectionIndex !== 0 || collectionStack.length === 1 ? styles.hidden : null}`}
            onClick={handleBackClick}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 7L7 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={styles.card}>
            <button
              type="button"
              onClick={() => handleCollectionClick(collectionIndex)}
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

CollectionCard.propTypes = {
  collections: PropTypes.shape({
    title: PropTypes.string.isRequired,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    user: PropTypes.string,
  }).isRequired,
  // handleProgressionParentSelect: PropTypes.func.isRequired,
};
export default CollectionCard;
