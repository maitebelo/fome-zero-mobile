import { firebase } from './firebaseConfig';

const productsRef = firebase.firestore().collection('products');

class Product {
  constructor({ id, name, price, description, image }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

async function list() {
  try {
    const querySnapshot = await productsRef.get();
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return new Product({
        id: doc.id,
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function getProductById(id) {
  try {
    return await productsRef
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        return new Product({
          id: doc.id,
          name: data?.name,
          price: data?.price,
          description: data?.description,
          image: data?.image,
        });
      });
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

export { list, getProductById };
