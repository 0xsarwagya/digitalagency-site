import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allPosts } from "content-collections";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPost({ params }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="px-4 md:px-20">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-8" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl">
                {post.description}
              </p>

              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-sm"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="py-8">
          <div className="px-4 md:px-20">
            <div className="max-w-4xl mx-auto">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12">
        <div className="px-4 md:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <post.mdx />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Share */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Share on Twitter
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Share on LinkedIn
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Copy Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Author */}
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">About the Author</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{post.author}</div>
                        <div className="text-sm text-gray-600">Senior Developer</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Experienced developer passionate about creating innovative digital solutions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
          <div className="px-4 md:px-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.slug}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedPost.image || "/blog1.jpg"}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                        <Link href={relatedPost.url}>{relatedPost.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm">{relatedPost.description}</p>
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 p-0"
                        asChild
                      >
                        <Link href={relatedPost.url}>Read More →</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}