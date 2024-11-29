import Image from 'next/image';
import Link from 'next/link';
import { Store } from '@prisma/client';

interface ArtisanSpotlightProps {
  artisans: (Store & { user: { name: string; image: string | null } })[];
}

export default function ArtisanSpotlight({ artisans }: ArtisanSpotlightProps) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
          Featured Artisans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artisans.map((artisan) => (
            <Link
              key={artisan.id}
              href={`/artisans/${artisan.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {artisan.logo ? (
                  <Image
                    src={artisan.logo}
                    alt={artisan.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-kashmir-100">
                    <span className="text-4xl text-kashmir-600">
                      {artisan.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {artisan.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {artisan.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}