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
    // transforma el objeto de cursos a array
    const coursesArray = value?.courses
      ? Object.keys(value.courses).map(key => ({
          id: key,
          ...value.courses[key],
        }))
      : [];

    const normalized = {
      title: value?.title || "",
      courses: coursesArray,
    };

    data = transform ? transform(normalized) : normalized;
  }

  return { data, loading, error };
};