const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase() {
  // Dodaj 10 produktów
  for (let i = 1; i <= 10; i++) {
    await prisma.product.create({
      data: {
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 1, // Cena od 1 do 100
        description: `Description ${i}`,
        photos: 'image.jpg',
      },
    });
  }

  // Dodaj 10 użytkowników
  for (let i = 1; i <= 10; i++) {
    await prisma.user.create({
      data: {
        login: `user${i}`,
        role: 'CLIENT',
        password: { create: { hashedPassword: `hashed_password_${i}` } },
      },
    });
  }

  // Dodaj 10 klientów
  for (let i = 1; i <= 10; i++) {
    await prisma.client.create({
      data: {
        email: `client${i}@example.com`,
        firstName: `John${i}`,
        lastName: `Doe${i}`,
        address: `${i} Main St.`,
        user: { connect: { login: `user${i}` } },
      },
    });
  }

  // Dodaj 10 zamówień
  for (let i = 1; i <= 10; i++) {
    const product = await prisma.product.findFirst();
    const client = await prisma.client.findFirst();

    await prisma.order.create({
      data: {
        product: { connect: { id: product.id } },
        client: { connect: { id: client.id } },
      },
    });
  }
}

seedDatabase()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });