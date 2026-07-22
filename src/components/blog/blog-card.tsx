import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Blog } from "@/lib/types/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "../ui/button";

interface BlogCardProps {
  blog: Blog;
}

const getPlainPreview = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\u00ad/g, "")
    .replace(/[\u200b-\u200d\u2060\ufeff]/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&shy;/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const BlogCard = ({ blog }: BlogCardProps) => {
  // Format date using Intl.DateTimeFormat
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const previewText = getPlainPreview(blog.description);

  return (
    <div className="group flex flex-col gap-4 ">
      {/* Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-gray-100">
        {blog.img ? (
          <Image
            src={blog.img}
            alt={blog.title}
            width={1900}
            height={800}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-primary">
          {formattedDate}
        </span>

        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/blogs/${blog._id}`}
            className="flex items-center gap-2 justify-between w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>
          </Link>
        </div>
        <p className="text-gray-600 line-clamp-3">{previewText}</p>
      </div>
      <Link
        href={`/blogs/${blog._id}`}
        className=""
      >
        <Button className="w-full !rounded-none">
          Read more
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Image Skeleton */}
      <Skeleton className="aspect-16/10 w-full rounded-3xl" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-6 w-6 shrink-0" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
