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
