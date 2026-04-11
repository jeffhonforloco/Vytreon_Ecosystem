import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Target, Users, Rocket, Heart, Globe, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Rocket size={32} />,
      title: "Innovation",
      description: "We push boundaries and embrace cutting-edge technology to create products that shape the future.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Users size={32} />,
      title: "Community",
      description: "We build for people, listen to our users, and create products that empower communities worldwide.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Heart size={32} />,
      title: "Impact",
      description: "Every product we build is designed to make a meaningful difference in people's lives.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Globe size={32} />,
      title: "Global Vision",
      description: "We think globally, building solutions that transcend borders and serve diverse markets.",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const milestones = [
    { year: "2026", title: "Founded", description: "Vytreon Inc. established with a vision to innovate across AI, technology, and digital services" },
    { year: "2026", title: "Product Launch", description: "Building flagship products SireIQ and Fycra" },
    { year: "2026", title: "Ecosystem Expansion", description: "Rapidly developing 12+ products across multiple industries" }
  ];

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
              <Target size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">About Us</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Building the foundation for the <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">intelligent future</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Founded in 2026, Vytreon is a global technology group developing next-generation systems in AI, energy, and mobility — an ecosystem of innovation designed to shape the technologies of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-strong rounded-3xl p-12 md:p-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <Zap size={24} className="text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              To build the foundation for an intelligent future by developing next-generation systems that transform 
              how we live, work, and connect. We believe technology should be accessible, powerful, and transformative.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're rapidly building an ambitious ecosystem across AI, energy, and mobility—from our flagship 
              AI creative platform SireIQ and no-code development tool Fycra, to innovative solutions in travel, 
              communication, entertainment, and financial technology. Our vision is to create a comprehensive 
              suite of products where innovation meets simplicity, and technology serves humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 group"
              >
                <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 bg-gradient-to-br ${value.color}`}>
                  {value.icon}
                </div>

                <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in the Vytreon story
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 md:p-8 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl glass-strong flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-strong rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Join Our Team
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented, passionate individuals to join us in building the future. 
              Check out our open positions and be part of something extraordinary.
            </p>
            <a 
              href="/careers"
              className="inline-block bg-gradient-to-r from-accent to-accent-secondary hover:from-accent/90 hover:to-accent-secondary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

