// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function seedDatabase() {
//   // Dodaj 10 produktów
//   for (let i = 1; i <= 10; i++) {
//     await prisma.product.create({
//       data: {
//         name: `Product ${i}`,
//         price: Math.floor(Math.random() * 100) + 1, // Cena od 1 do 100
//         description: `Description ${i}`,
//         photos: 'image.jpg, image2.jpg, image3.jpg',
//       },
//     });
//   }

//   // Dodaj 10 użytkowników
//   for (let i = 1; i <= 10; i++) {
//     await prisma.user.create({
//       data: {
//         login: `user${i}`,
//         role: 'CLIENT',
//         password: { create: { hashedPassword: `hashed_password_${i}` } },
//       },
//     });
//   }

//   // Dodaj 10 klientów
//   for (let i = 1; i <= 10; i++) {
//     await prisma.client.create({
//       data: {
//         email: `client${i}@example.com`,
//         firstName: `John${i}`,
//         lastName: `Doe${i}`,
//         address: `${i} Main St.`,
//         user: { connect: { login: `user${i}` } },
//       },
//     });
//   }

  // Dodaj 10 zamówień
  // for (let i = 1; i <= 10; i++) {
  //   const product = await prisma.product.findFirst();
  //   const client = await prisma.client.findFirst();

  //   await prisma.order.create({
  //     data: {
  //       product: { connect: { id: product.id } },
  //       client: { connect: { id: client.id } },
  //     },
  //   });
  // }
// }

// seedDatabase()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedProducts = async () => {
  const productsData = [
    {
      "name": "Product 1",
      "price": 25,
      "description": "Description for Product 1",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 2",
      "price": 38,
      "description": "Description for Product 2",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 3",
      "price": 50,
      "description": "Description for Product 3",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 4",
      "price": 15,
      "description": "Description for Product 4",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 5",
      "price": 42,
      "description": "Description for Product 5",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 6",
      "price": 30,
      "description": "Description for Product 6",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 7",
      "price": 18,
      "description": "Description for Product 7",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 8",
      "price": 48,
      "description": "Description for Product 8",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 9",
      "price": 22,
      "description": "Description for Product 9",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    },
    {
      "name": "Product 10",
      "price": 35,
      "description": "Description for Product 10",
      "photos": "image.jpg, image2.jpg, image3.jpg"
    }
  ]

  for (const productData of productsData) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log('Products seeded successfully');
};

seedProducts()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
