"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allPosts } from "content-collections";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from posts
  const categories = ["All", ...new Set(allPosts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured posts
  const featuredPosts = allPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="px-4 md:px-20">
          <div className="text-center space-y-8">
            <Badge className="bg-blue-100 text-blue-800">Our Blog</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Insights &
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Industry Knowledge
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Stay updated with the latest trends, best practices, and insights
              from the world of digital development and design.
            </p>

            {/* Search and Newsletter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b bg-white/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="px-4 md:px-20">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === activeCategory ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  category === activeCategory
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="px-4 md:px-20">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
              {featuredPosts.slice(0, 1).map((post) => (
                <Card
                  key={post.slug}
                  className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl"
                >
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="relative">
                      <Image
                        src={post.image || "/blog1.jpg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="space-y-4">
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
                        </div>
                        <h3 className="text-2xl font-bold">{post.title}</h3>
                        <p className="text-gray-600">{post.description}</p>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            asChild
                          >
                            <Link href={post.url} className="flex items-center gap-1">
                              Read More
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="px-4 md:px-20">
          <h2 className="text-2xl font-bold mb-8">
            {searchTerm ? `Search Results for "${searchTerm}"` : "Latest Articles"}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card
                  key={post.slug}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/blog1.jpg"}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                      <Link href={post.url}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm">{post.description}</p>
                    {post.tags && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-600"
                          >
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                        asChild
                      >
                        <Link href={post.url}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or browse all categories.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}