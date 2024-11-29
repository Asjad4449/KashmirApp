interface Story {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

interface CulturalStoriesProps {
  stories: Story[];
}

export default function CulturalStories({ stories }: CulturalStoriesProps) {
  return (
    <section className="bg-kashmir-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
          Cultural Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                <a
                  href={`/stories/${story.slug}`}
                  className="text-kashmir-600 hover:text-kashmir-700 font-medium"
                >
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}