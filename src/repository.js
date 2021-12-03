import { db } from "./fbconfig";
import { collection, addDoc, getDocs, deleteDoc, doc, query } from "firebase/firestore";

async function addFood(uid, { name, calories, photo, quantity }) {
    const newFood = await addDoc(collection(db, uid + "foods"), {
        name, calories, photo, quantity
    });
    return { id: newFood.id, name, calories, photo, quantity };
}

async function getFood(uid) {
    const q = query(collection(db, uid + "foods"));
    const foods = await getDocs(q);
    return foods.docs.map(food => {
        return food.data();
    })
}

async function deleteFood(uid, { id }) {
    await deleteDoc(doc(db, uid + "foods", id));
}

export {
    addFood,
    getFood,
    deleteFood
}