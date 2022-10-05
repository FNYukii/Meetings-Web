import { initializeApp } from 'firebase/app'
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore"

import { firebaseConfig } from "./firebaseConfig"

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

enableIndexedDbPersistence(db)