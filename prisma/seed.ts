import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Pashmina Shawls',
        description: 'Luxurious hand-woven shawls made from the finest Pashmina wool',
        image: '/images/categories/pashmina.jpg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Saffron & Spices',
        description: 'Premium Kashmir saffron and authentic regional spices',
        image: '/images/categories/saffron.jpg',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Wooden Crafts',
        description: 'Intricately carved walnut wood artifacts and furniture',
        image: '/images/categories/woodcraft.jpg',
      },
    }),
  ]);

  console.log('Categories seeded:', categories);

  // Create a demo seller with a store
  const hashedPassword = await bcrypt.hash('demo123', 10);
  const seller = await prisma.user.create({
    data: {
      name: 'Kashmir Crafts',
      email: 'demo@kashmircrafts.com',
      password: hashedPassword,
      role: 'SELLER',
      store: {
        create: {
          name: 'Kashmir Crafts Emporium',
          description: 'Traditional Kashmiri handicrafts and textiles',
          tier: 'PREMIUM',
        },
      },
    },
  });

  console.log('Seller seeded:', seller);

  // Create some demo products for each category
  const demoProducts = await Promise.all(
    categories.map((category) =>
      prisma.product.create({
        data: {
          name: `Demo ${category.name} Product`,
          description: `Beautiful ${category.name.toLowerCase()} made by skilled artisans`,
          price: Math.floor(Math.random() * 5000) + 1000, // Random price between 1000-6000
          images: {
            create: [
              { url: `/images/products/${category.name.toLowerCase()}-demo1.jpg` },
              { url: `/images/products/${category.name.toLowerCase()}-demo2.jpg` },
            ],
          },
          category: { connect: { id: category.id } }, // Link to category
          store: { connect: { id: seller.store!.id } }, // Link to store
          stock: 10,
        },
      })
    )
  );

  console.log('Products seeded:', demoProducts);

  // Create a buyer user
  const buyerPassword = await bcrypt.hash('buyer123', 10);
  const buyer = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'buyer@example.com',
      password: buyerPassword,
      role: 'BUYER',
    },
  });

  console.log('Buyer seeded:', buyer);

  // Create a demo order for the buyer
  const order = await prisma.order.create({
    data: {
      user: { connect: { id: buyer.id } }, // Link to buyer
      totalAmount: demoProducts.reduce((sum, product) => sum + product.price, 0), // Sum of product prices
      status: 'PROCESSING',
      products: {
        create: demoProducts.map((product) => ({
          productId: product.id,
          quantity: 1,
        })),
      },
    },
  });

  console.log('Order seeded:', order);
}

main()
  .catch((e) => {
    console.error('Error seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
