import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, ArrowRight, Tag, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const featuredPost = {
    title: "The Future of AI-Powered Development",
    excerpt: "Discover how Vytreon's ecosystem is revolutionizing the way developers build applications with AI at the core.",
    date: "October 20, 2026",
    readTime: "8 min read",
    category: "Product Updates",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
  };

  const blogPosts = [
    {
      title: "Introducing SireIQ 2.0: The Next Generation of AI Creativity",
      excerpt: "We're excited to announce the launch of SireIQ 2.0 with advanced multimodal capabilities and improved performance.",
      date: "October 15, 2026",
      readTime: "5 min read",
      category: "Product Updates",
      image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=300&fit=crop"
    },
    {
      title: "Building Production Apps in Minutes with Fycra",
      excerpt: "Learn how developers are using Fycra to ship production-ready applications faster than ever before.",
      date: "October 10, 2026",
      readTime: "6 min read",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop"
    },
    {
      title: "SEO in the Age of AI: What You Need to Know",
      excerpt: "Explore how AI is transforming SEO and how SEOAgentPro is helping businesses stay ahead of the curve.",
      date: "October 5, 2026",
      readTime: "7 min read",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop"
    },
    {
      title: "The Rise of No-Code Development Platforms",
      excerpt: "Why no-code platforms are becoming essential tools for modern software development teams.",
      date: "September 28, 2026",
      readTime: "4 min read",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop"
    },
    {
      title: "Building a Unified Ecosystem: The Vytreon Vision",
      excerpt: "How we're creating an integrated platform that connects all aspects of digital creation and business.",
      date: "September 20, 2026",
      readTime: "6 min read",
      category: "Company News",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop"
    },
    {
      title: "Security Best Practices for API Integration",
      excerpt: "Essential security guidelines for developers integrating with Vytreon's API ecosystem.",
      date: "September 15, 2026",
      readTime: "5 min read",
      category: "Tutorials",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=300&fit=crop"
    }
  ];

  const categories = ["All", "Product Updates", "Tutorials", "Industry Insights", "Company News"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-strong">
              <Newspaper size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Blog</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Latest from <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">Vytreon</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Insights, updates, and stories from the Vytreon team and community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="glass-strong rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 group cursor-pointer">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="glass-strong px-4 py-2 rounded-full text-xs font-semibold text-accent">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {featuredPost.readTime}
                  </span>
                  <span className="glass px-3 py-1 rounded-full text-xs text-accent">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <Button className="bg-gradient-to-r from-accent to-accent-secondary hover:from-accent/90 hover:to-accent-secondary/90 text-white px-6 py-6 h-auto group/btn w-fit">
                  Read More
                  <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`glass-card px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-white ${
                  index === 0 ? 'bg-accent text-white' : 'text-muted-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="glass px-3 py-1 rounded-full text-xs text-accent">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <a href="#" className="flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all group/link">
                    Read Article
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="glass-strong border-border hover:border-accent px-8 py-6 text-lg h-auto">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

