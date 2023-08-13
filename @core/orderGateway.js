import { firebase } from './firebaseConfig';

import { deleteAllProducts } from './cartGateway';

const orderRef = firebase.firestore().collection('orders');
const productsRef = firebase.firestore().collection('products');

class Order {
  constructor({ id, products, total, userId, createdAt, updatedAt }) {
    this.id = id;
    this.products = products;
    this.total = total;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

async function createOrder(products, userId) {
  try {
    const order = await orderRef.add({
      products: products.map((product) => ({
        product: productsRef.doc(product.id),
        quantity: product.quantity,
      })),
      userId,
      total: products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await deleteAllProducts(userId);

    return new Order({
      id: order.id,
      products,
      total: products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      ),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function listOrder(userId) {
  try {
    const querySnapshot = await orderRef.where('userId', '==', userId).get();

    if (!querySnapshot?.docs || querySnapshot?.docs?.length === 0) {
      return create(userId);
    }

    const orders = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const products = await Promise.all(
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
        );

        return new Order({
          id: doc.id,
          products: products,
          total: data.total,
          userId: data.userId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      })
    );

    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

export { createOrder, listOrder };
