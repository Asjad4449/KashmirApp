import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Kashmir landscape"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Authentic Kashmir
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Explore handcrafted treasures from the valley of Kashmir. Direct from artisans to your doorstep.
        </p>
        <div className="mt-10">
          <Link
            href="/products"
            className="btn-primary text-lg"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}