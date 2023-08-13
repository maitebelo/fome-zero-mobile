import { firebase } from './firebaseConfig';

const cartRef = firebase.firestore().collection('cart');
const productRef = firebase.firestore().collection('products');

class Cart {
  constructor({ id, products, userId, createdAt, updatedAt }) {
    this.id = id;
    this.products = products;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

async function myCart(userId) {
  try {
    const querySnapshot = await cartRef
      .where('userId', '==', userId)
      .limit(1)
      .get();

    if (!querySnapshot?.docs || querySnapshot?.docs?.length === 0) {
      return create(userId);
    }

    return await querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      return new Cart({
        id: doc.id,
        products: await Promise.all(
          data?.products?.map(async (product) => {
            const productData = await product?.product?.get();
            return {
              id: productData?.id,
              name: productData.data()?.name,
              price: productData.data()?.price,
              description: productData.data()?.description,
              image: productData.data()?.image,
              quantity: product.quantity,
            };
          })
        ),
        userId: data.userId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    })[0];
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function addProduct(productId: string, quantity: number, userId: string) {
  try {
    let cart = await myCart(userId);

    if (!cart) {
      cart = await create(userId);
    }

    const productIndex = cart?.products.findIndex(
      (product) => product?.id === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        id: productId,
        quantity,
      });
    }

    await cartRef.doc(cart.id).update({
      products: [
        ...cart?.products?.map((product) => ({
          product: productRef.doc(`${product?.id}`),
          quantity: product.quantity,
        })),
      ],
      updatedAt: new Date(),
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function create(userId) {
  try {
    await cartRef.add({
      userId,
      products: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await myCart(userId);
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function removeProduct(productId, userId) {
  try {
    const cart = await myCart(userId);

    const productIndex = cart?.products.findIndex(
      (product) => product?.id === productId
    );

    if (productIndex >= 0) {
      cart.products.splice(productIndex, 1);
    }

    await cartRef.doc(cart.id).update({
      products: [
        ...cart?.products?.map((product) => ({
          product: productRef.doc(`${product?.id}`),
          quantity: product.quantity,
        })),
      ],
      updatedAt: new Date(),
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function decrementProduct(productId, userId) {
  try {
    const cart = await myCart(userId);

    const productIndex = cart?.products.findIndex(
      (product) => product?.id === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity -= 1;
    }

    await cartRef.doc(cart.id).update({
      products: [
        ...cart?.products?.map((product) => ({
          product: productRef.doc(`${product?.id}`),
          quantity: product.quantity,
        })),
      ],
      updatedAt: new Date(),
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function incrementProduct(productId, userId) {
  try {
    const cart = await myCart(userId);

    const productIndex = cart?.products.findIndex(
      (product) => product?.id === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += 1;
    }

    await cartRef.doc(cart.id).update({
      products: [
        ...cart?.products?.map((product) => ({
          product: productRef.doc(`${product?.id}`),
          quantity: product.quantity,
        })),
      ],
      updatedAt: new Date(),
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function deleteAllProducts(userId) {
  try {
    const cart = await myCart(userId);

    await cartRef.doc(cart.id).update({
      products: [],
      updatedAt: new Date(),
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

export {
  myCart,
  removeProduct,
  incrementProduct,
  decrementProduct,
  addProduct,
  deleteAllProducts,
};
