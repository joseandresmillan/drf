

const blogs = [
  {
    title: "SEO Basics: Beginner's Guide to SEO Success",
    description:
      "Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our new office.",
    image: "https://via.placeholder.com/400x200", // Reemplaza con tu imagen
    link: "#",
  },
  {
    title: "How to quickly deploy a static website",
    description:
      "Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our new office.",
    link: "#",
  },
  {
    title: "How to Rank Higher on Google (6 Easy Steps)",
    description:
      "Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our new office.",
    link: "#",
  },
  {
    title: "What is SEO? Search Engine Optimization Explained",
    description:
      "Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our new office.",
    link: "#",
  },
  {
    title: "12 SEO Best Practices That Everyone Should Follow",
    description:
      "Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our new office.",
    link: "#",
  },
  {
    title: "How to schedule your Tweets to send later",
    description:
      "Over the past year, Volosoft has undergone many changes! After months of preparation and some hard work, we moved to our new office.",
    link: "#",
  },
];

function BlogPage() {
  return (
    <div className="bg-white text-white py-12">
      <div className="container mx-auto px-6 lg:px-20 mt-16">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-4">Our Blog</h1>
        <p className="text-center text-gray-400 mb-12">
          We use an agile approach to test assumptions and connect with the needs of your audience early and often.
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg p-6"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
              )}
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{blog.description}</p>
              <a
                href={blog.link}
                className="text-blue-400 font-semibold hover:underline inline-flex items-center"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;