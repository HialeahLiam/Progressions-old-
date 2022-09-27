import { cloneDeep } from 'lodash';
import { getCollectionFromCollectionTree } from '../../../utils/dataMethods';

export function createCopyOfCollectionsAndAppendNewEntry(collections, parentCollectionId, EntryType, entry) {
  const collectionsCopy = cloneDeep(collections);
  let parentCollection = null;
  for (const c of collectionsCopy) {
    parentCollection = getCollectionFromCollectionTree(c, parentCollectionId);
    if (parentCollection) {
      // backend updates entry type, but we must update it for stale data.
      // backend checks if it already has a 'progression' type. We do not here.
      parentCollection.entry_type = EntryType;
      parentCollection.entries.push(entry);

      // This id is only added to the updated collection clone. It is passed on to CollectionCard
      // so that it displays the updated collection entries showing the newly created entry.
      c.focusedCollectionId = parentCollectionId;
      break;
    }
  }

  return collectionsCopy;
}

export function createCopyOfCollectionsAndReplaceEntry(collections, updatedEntry) {
  const collectionsCopy = cloneDeep(collections);
  for (const c of collectionsCopy) {
    let q = [c];
    while (q.length > 0) {
      const current = q.pop();
      if (current._id === updatedEntry._id) {
        for (const key of Object.keys(current)) {
          current[key] = updatedEntry[key];
        }
        return collectionsCopy;
      }
      if (current.entries) q = [...current.entries, ...q];
    }
  }
  return collections;
}

export function createCopyOfCollectionsAndDeleteProgression(collections, progId) {
  const collectionsCopy = cloneDeep(collections);
  for (const c of collectionsCopy) {
    let q = [c];
    while (q.length > 0) {
      const current = q.pop();
      if (current.entries) {
        const l = current.entries.length;
        current.entries = current.entries.filter((e) => e._id !== progId);
        if (current.entries.length < l) {
          // progression was removed
          return collectionsCopy;
        }
        q = [...current.entries, ...q];
      }
    }
  }

  return collectionsCopy;
}
export function createCopyOfCollectionsAndDeleteCollection(collections, collectionId) {
  let collectionsCopy = cloneDeep(collections);

  const l = collectionsCopy.length;
  collectionsCopy = collectionsCopy.filter((e) => e._id !== collectionId);
  if (collectionsCopy.length < l) {
    // collection at top level was removed
    return collectionsCopy;
  }

  for (const c of collectionsCopy) {
    let q = [c];
    while (q.length > 0) {
      const current = q.pop();
      if (current.entries) {
        const l = current.entries.length;
        current.entries = current.entries.filter((e) => e._id !== collectionId);
        if (current.entries.length < l) {
          // collection was removed
          return collectionsCopy;
        }
        q = [...current.entries, ...q];
      }
    }
  }

  return collectionsCopy;
}
