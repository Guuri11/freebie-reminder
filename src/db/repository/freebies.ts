import moment from "moment";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  query,
  orderBy,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase";

export type Freebie = {
  id?: string;
  key: string;
  title: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  remember_at: string;
  channel_id?: string;
};

const fetchAll = (callback: (freebies: Freebie[]) => void) => {
  const q = query(collection(FIRESTORE_DB, "freebies"), orderBy("end_date"));

  getDocs(q).then((querySnapshot) => {
    const temp: Freebie[] = [];
    querySnapshot.forEach((doc) => {
      const freebie = doc.data() as Freebie;
      freebie.id = doc.id;

      if (moment().isBefore(moment(freebie.end_date, "DD-MM-YYYY").add(3, "days"))) {
        temp.push(freebie);
      }
    });
    callback(temp);
  });
};

const save = (entity: Freebie, callback: (x: any) => void) => {
  addDoc(collection(FIRESTORE_DB, "freebies"), entity).then((docRef) => {
    callback(docRef.id);
  });
};

const update = (entity: Freebie, callback: (success: boolean) => void) => {
  const freebieRef = doc(FIRESTORE_DB, `freebies/${entity.id}`);
  updateDoc(freebieRef, entity)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
      callback(false);
    });
};

const remove = (id: string) => {
  const freebieRef = doc(FIRESTORE_DB, `freebies/${id}`);
  deleteDoc(freebieRef)
    .then((d) => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export default {
  fetchAll,
  save,
  update,
  remove,
};
