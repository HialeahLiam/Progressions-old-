export function getCollectionFromCollectionTree(rootCollection, targetId) {
  if (!rootCollection) return null;
  if (rootCollection._id === targetId) return rootCollection;

  if (rootCollection.entry_type === 'collection') {
    for (const entry of rootCollection.entries) {
      const result = getCollectionFromCollectionTree(entry, targetId);
      if (result) return result;
    }
  }

  return null;
}
