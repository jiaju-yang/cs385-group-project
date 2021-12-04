import { db } from "./fbconfig";
import { collection, addDoc, updateDoc, getDocs, deleteDoc, doc, query } from "firebase/firestore";

async function addFood(uid, { foodId, name, calories, photo, quantity, intakeDate }) {
    const newFood = await addDoc(collection(db, uid + "foods"), {
        foodId, name, calories, photo, quantity, intakeDate
    });
    return { id: newFood.id, foodId, name, calories, photo, quantity, intakeDate };
}

async function updateFood(uid, id, quantity) {
   
    const foodToUpdate = doc(collection(db, uid + "foods"),id);
    await updateDoc(foodToUpdate, {
        "quantity": quantity
    });
}

async function getFood(uid) {
    const q = query(collection(db, uid + "foods"));
    const foods = await getDocs(q);
    return foods.docs.map(food => {
        return food.data();
    })
}

async function deleteFood(uid, id) {
    await deleteDoc(doc(db, uid + "foods", id));
}

export {
    addFood,
    getFood,
    deleteFood,
    updateFood
}