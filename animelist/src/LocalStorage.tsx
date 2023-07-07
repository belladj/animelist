import { useState, useEffect } from "react";

function getInitialCollection() {
  const collectionList = localStorage.getItem("collection");
  if (collectionList && collectionList !== 'undefined') {
    return JSON.parse(collectionList);
  } else {
    return [];
  }
}

export function getCollectionData(id:any) {
    const collectionList = JSON.parse(localStorage.getItem("collection")!);
    if (collectionList) {
      return collectionList.find((item:any) => item.id == id);
    } else {
      return [];
    }
  }

export const useLocalStorageCollection = () => {
  const [collection, setCollection] = useState(() => {
    return getInitialCollection();
  });
  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);
  return [collection, setCollection];
};