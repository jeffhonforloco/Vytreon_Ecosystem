import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Cookie, Settings, BarChart3, Shield, Mail } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      icon: <Shield size={24} />,
      title: "Essential Cookies",
      color: "from-green-500 to-emerald-500",
      description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      examples: [
        "Authentication and session management",
        "Security and fraud prevention",
        "Load balancing and performance optimization",
        "User interface preferences"
      ],
      canDisable: false
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics Cookies",
      color: "from-blue-500 to-cyan-500",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: [
        "Page visit tracking and user behavior analysis",
        "Traffic source identification",
        "Feature usage statistics",
        "Performance monitoring and optimization"
      ],
      canDisable: true
    },
    {
      icon: <Settings size={24} />,
      title: "Functional Cookies",
      color: "from-purple-500 to-pink-500",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: [
        "Language and region preferences",
        "Display settings and customizations",
        "Previously viewed content",
        "User interface state"
      ],
      canDisable: true
    },
    {
      icon: <Cookie size={24} />,
      title: "Marketing Cookies",
      color: "from-orange-500 to-red-500",
      description: "These cookies are used to track visitors across websites to display relevant and engaging advertisements.",
      examples: [
        "Targeted advertising based on interests",
        "Campaign effectiveness measurement",
        "Social media integration",
        "Retargeting and remarketing"
      ],
      canDisable: true
    }
  ];

  const thirdPartyCookies = [
    {
      service: "Google Analytics",
      purpose: "Website analytics and user behavior tracking",
      link: "https://policies.google.com/privacy"
    },
    {
      service: "Google Ads",
      purpose: "Advertising and campaign measurement",
      link: "https://policies.google.com/technologies/ads"
    },
    {
      service: "Social Media Platforms",
      purpose: "Social media integration and sharing",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-strong">
              <Cookie size={16} className="text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Cookies Policy</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Understanding <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Cookies</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This Cookies Policy explains how Vytreon Inc. uses cookies and similar technologies to recognize you when you visit our services.
            </p>
            
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: October 24, 2026
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">What Are Cookies?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and provide information to the website owners.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We use different types of cookies to improve your experience and optimize our services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white mb-6`}>
                  {type.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">{type.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{type.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Examples:</h4>
                  <ul className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`mt-6 px-4 py-2 rounded-lg ${type.canDisable ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <p className="text-sm font-medium">
                    {type.canDisable ? (
                      <span className="text-blue-400">Can be disabled in browser settings</span>
                    ) : (
                      <span className="text-red-400">Required for website functionality</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Third-Party Cookies</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            We also use cookies from trusted third-party services to enhance functionality and analyze site usage.
          </p>
          
          <div className="space-y-4">
            {thirdPartyCookies.map((cookie, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{cookie.service}</h3>
                    <p className="text-muted-foreground">{cookie.purpose}</p>
                  </div>
                  {cookie.link && (
                    <a
                      href={cookie.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                    >
                      Privacy Policy →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">Managing Your Cookie Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Browser Settings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies. Please note that if you choose to block or delete cookies, some features of our services may not work properly.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Opt-Out Options</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can opt out of targeted advertising cookies through:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="text-muted-foreground">• Digital Advertising Alliance (DAA): <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">optout.aboutads.info</a></li>
                  <li className="text-muted-foreground">• Network Advertising Initiative (NAI): <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">optout.networkadvertising.org</a></li>
                  <li className="text-muted-foreground">• Your Online Choices (EU): <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">youronlinechoices.com</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Mobile Devices</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mobile devices typically provide settings to limit ad tracking. Check your device's privacy settings for options like "Limit Ad Tracking" (iOS) or "Opt out of Ads Personalization" (Android).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates to Policy */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or our business practices. We encourage you to review this policy periodically. The "Last Updated" date at the top of this page indicates when this policy was last revised.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-strong rounded-2xl p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Questions About Cookies?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about our use of cookies or this policy, please feel free to contact us.
            </p>
            <a
              href="mailto:info@vytreon.com,vytreongroup@gmail.com?subject=Cookies Policy Inquiry"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cookies;

