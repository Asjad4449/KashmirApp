import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HeroSection from '../components/home/HeroSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import ArtisanSpotlight from '../components/home/ArtisanSpotlight';
import CulturalStories from '../components/home/CulturalStories';
import Newsletter from '../components/home/Newsletter';

interface HomeProps {
  featuredProducts: any[];
  categories: any[];
  featuredArtisans: any[];
  culturalStories: any[];
}

export default function Home({
  featuredProducts,
  categories,
  featuredArtisans,
  culturalStories,
}: HomeProps) {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoryShowcase categories={categories} />
      <ArtisanSpotlight artisans={featuredArtisans} />
      <CulturalStories stories={culturalStories} />
      <Newsletter />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [featuredProducts, categories, featuredArtisans, culturalStories] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      include: {
        store: true,
        category: true,
      },
    }),
    prisma.category.findMany({
      where: { parentId: null },
      include: { children: true },
    }),
    prisma.store.findMany({
      take: 4,
      where: { tier: 'PREMIUM' },
      include: { user: true },
    }),
    // Implement cultural stories fetching
  ]);

  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
      featuredArtisans: JSON.parse(JSON.stringify(featuredArtisans)),
      culturalStories: [],
    },
  };
};