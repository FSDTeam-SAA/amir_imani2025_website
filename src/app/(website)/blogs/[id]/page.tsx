"use client";

import { useBlog } from "@/hooks/use-blogs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const stripProblematicTextChars = (text: string) =>
  text
    .replace(/\u00ad/g, "")
    .replace(/[\u200b-\u200d\u2060\ufeff]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/&shy;/gi, "")
    .replace(/&nbsp;/gi, " ");

const normalizeBlogHtml = (html: string) => {
  const cleanedHtml = stripProblematicTextChars(html);

  if (typeof window === "undefined") {
    return cleanedHtml;
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(cleanedHtml, "text/html");
  const allowedClassNames = new Set(["ql-align-center", "ql-align-right"]);
  const unwrapTags = new Set(["span", "font"]);

  document.body.querySelectorAll("wbr").forEach((node) => node.remove());

  const textWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
  );
  const textNodes: Text[] = [];

  while (textWalker.nextNode()) {
    textNodes.push(textWalker.currentNode as Text);
  }

  for (const textNode of textNodes) {
    textNode.textContent = stripProblematicTextChars(
      textNode.textContent || "",
    );
  }

  const nodes = Array.from(document.body.querySelectorAll<HTMLElement>("*"));

  for (const node of nodes) {
    const tagName = node.tagName.toLowerCase();

    if (unwrapTags.has(tagName)) {
      node.replaceWith(...Array.from(node.childNodes));
      continue;
    }

    if (tagName === "div") {
      const replacement = document.createElement("p");
      replacement.innerHTML = node.innerHTML;
      node.replaceWith(replacement);
      continue;
    }

    const safeClasses = Array.from(node.classList).filter((className) =>
      allowedClassNames.has(className),
    );

    if (safeClasses.length > 0) {
      node.className = safeClasses.join(" ");
    } else {
      node.removeAttribute("class");
    }

    if (tagName !== "a" && tagName !== "img") {
      node.removeAttribute("style");
    }

    node.removeAttribute("dir");

    node.style.wordBreak = "normal";
    node.style.overflowWrap = "normal";
    node.style.wordWrap = "normal";
    node.style.whiteSpace = "normal";
    node.style.hyphens = "none";

    if (node.style.textAlign === "justify") {
      node.style.textAlign = "left";
    }
  }

  return document.body.innerHTML;
};

const BlogDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white pt-40 pb-12">
      <article className="container mx-auto max-w-4xl px-4">
        {/* Navigation Skeleton */}
        <Skeleton className="mb-8 h-5 w-32" />

        {/* Header Skeleton */}
        <div className="mb-8 flex flex-col gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-12 w-full md:w-3/4" />
        </div>

        {/* Hero Image Skeleton */}
        <Skeleton className="mb-10 aspect-video w-full rounded-3xl" />

        {/* Content Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </article>
    </div>
  );
};

const BlogDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading, error } = useBlog(id);

  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  if (error || !data?.success) {
    return (
      <div className="flex bg-white h-screen w-full flex-col items-center justify-center gap-4">
        <p className="text-red-500">Error loading blog details.</p>
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const blog = data.data;
  const normalizedDescription = normalizeBlogHtml(blog.description);
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white pt-10 pb-12">
      {/* Added max-w-4xl to center and bound the whole layout */}
      <div className="container mx-auto">
        {/* Navigation */}
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        {/* Header */}
        <header className="mb-8 flex flex-col gap-4">
          <time className="text-sm font-medium text-primary">
            {formattedDate}
          </time>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl break-words">
            {blog.title}
          </h1>
        </header>

        {/* Hero Image */}
        {blog.img && (
          <div className="mb-10 aspect-video overflow-hidden rounded-3xl bg-gray-100">
            <Image
              src={blog.img}
              alt={blog.title}
              width={1900}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Content - Fixed layout constraints & overflow issues */}
        <div className="w-full min-w-0 overflow-hidden">
          <div
            className="blog-content w-full min-w-0"
            dangerouslySetInnerHTML={{ __html: normalizedDescription }}
          />
        </div>

        {/* Metadata Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>Published on: {formattedDate}</span>
            {blog.updatedAt !== blog.createdAt && (
              <span>
                Updated:{" "}
                {new Date(blog.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
