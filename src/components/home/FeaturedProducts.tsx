import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@prisma/client';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                ₹{product.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}