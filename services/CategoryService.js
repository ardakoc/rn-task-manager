import { db } from "./firebase";

const categoriesCollection = db.collection('categories');

const getCategories = async () => {
    const snapshot = await categoriesCollection.get();
    return snapshot.docs.map((doc) => doc.id);
};

export { getCategories };