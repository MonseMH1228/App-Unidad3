// src/utilities/useData.js

import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "./firebase.js";


export const useData = (path, transform) => {
  const dbRef = ref(database, path);
  const [snapshot, loading, error] = useObject(dbRef);

  let data = null;
  if (snapshot) {
    const value = snapshot.val();
    data = transform ? transform(value) : value;
  }

  return { data, loading, error };
};