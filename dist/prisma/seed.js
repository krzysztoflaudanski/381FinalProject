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
    ];
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
//# sourceMappingURL=seed.js.map