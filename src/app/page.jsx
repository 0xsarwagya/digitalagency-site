"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Globe,
  Smartphone,
  Palette,
  Search,
  BarChart3,
  ShoppingCart,
  ArrowRight,
  Star,
  Users,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="py-20 lg:py-32">
        <div className="px-4 md:px-20">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-purple-100 text-purple-800">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Complete Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to launch, we provide end-to-end digital services
              that help your business thrive in the digital landscape.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Web Development",
                description:
                  "Custom websites and web applications built with modern technologies for optimal performance.",
                features: [
                  "React & Next.js",
                  "Responsive Design",
                  "SEO Optimized",
                ],
              },
              {
                icon: Smartphone,
                title: "Mobile Apps",
                description:
                  "Native and cross-platform mobile applications that deliver exceptional user experiences.",
                features: [
                  "iOS & Android",
                  "React Native",
                  "App Store Optimization",
                ],
              },
              {
                icon: Palette,
                title: "UI/UX Design",
                description:
                  "Beautiful, intuitive designs that convert visitors into customers and enhance user satisfaction.",
                features: ["User Research", "Prototyping", "Design Systems"],
              },
              {
                icon: Search,
                title: "Digital Marketing",
                description:
                  "Comprehensive digital marketing strategies to increase your online visibility and drive growth.",
                features: ["SEO & SEM", "Social Media", "Content Marketing"],
              },
              {
                icon: ShoppingCart,
                title: "E-commerce",
                description:
                  "Powerful online stores with secure payment processing and inventory management systems.",
                features: [
                  "Shopify & WooCommerce",
                  "Payment Integration",
                  "Analytics",
                ],
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description:
                  "Data-driven insights and analytics to help you make informed business decisions.",
                features: [
                  "Google Analytics",
                  "Custom Dashboards",
                  "Performance Tracking",
                ],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-orange-100 text-orange-800">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content:
                  "The team delivered an exceptional website that exceeded our expectations. Our conversion rate increased by 150% within the first month.",
                rating: 5,
                avatar: "/user3.jpg",
              },
              {
                name: "Michael Chen",
                role: "Founder, GrowthCo",
                content:
                  "Professional, creative, and results-driven. They transformed our digital presence and helped us reach new heights.",
                rating: 5,
                avatar: "/user1.jpg",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director, InnovateLab",
                content:
                  "Outstanding work on our mobile app. The user experience is incredible and our customers love it.",
                rating: 5,
                avatar: "/user2.avif",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <figure className="w-12 h-12">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full w-full h-full object-cover"
                        />
                      </figure>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-8 text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Let&apos;s discuss your project and create something amazing
              together. Get a free consultation and quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/contact" className="flex items-center">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-blue-600 text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/blog">Read Our Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}