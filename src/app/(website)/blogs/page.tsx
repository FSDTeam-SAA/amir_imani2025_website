"use client";

import BlogCard, { BlogCardSkeleton } from "@/components/blog/blog-card";
import Hero1 from "@/components/shared/Hero1";
import { useBlogs } from "@/hooks/use-blogs";

const BlogsPage = () => {
  const { data, isLoading, error } = useBlogs();

  return (
    <div className="min-h-screen bg-white">
      <Hero1
        image="/hero.jpg"
        title=""
        subtitle=""
        description=""
        text="Explore Our Blogs"
      />

      <div className="container mx-auto py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex h-64 w-full items-center justify-center text-red-500">
            Error loading blogs. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
