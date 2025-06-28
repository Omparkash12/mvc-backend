// const Product = require('../models/Product');

// exports.fetchAndSaveProducts = async () => {
//   try {
//     const response = await fetch('https://fakestoreapi.com/products');
//     if (!response.ok) {
//       throw new Error(`Failed to fetch products: ${response.statusText}`);
//     }
//     const products = await response.json();

//     for (const p of products) {
//       await Product.upsert({
//         id: p.id,
//         title: p.title,
//         price: p.price,
//         description: p.description,
//         category: p.category,
//         image: p.image,
//         ratingRate: p.rating?.rate || null,
//         ratingCount: p.rating?.count || null,
//       });
//     }

//     return { message: 'Products saved/updated successfully', count: products.length };
//   } catch (error) {
//     throw error;
//   }
// };



const Product = require('../models/products');
const productEmitter = require('../events/productsEvents');

exports.fetchAndSaveProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const products = await response.json();

    // Sync products into the database
    for (const p of products) {
      await Product.upsert({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        ratingRate: p.rating?.rate || null,
        ratingCount: p.rating?.count || null,
      });
    }

    // Emit the 'productsSynced' event with the number of products synced
    productEmitter.emit('productsSynced', products.length);

    return { message: 'Products saved/updated successfully', count: products.length };
  } catch (error) {
    throw error;
  }
};
