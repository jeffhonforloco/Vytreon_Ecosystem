import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Eye, Lock, Server, Globe, Mail } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: <Eye size={24} />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our services, we may collect personal information such as your name, email address, contact information, and payment details when you create an account or make a purchase."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about your device, browsing actions, and patterns. This includes IP address, browser type, operating system, referring URLs, and pages visited."
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar tracking technologies to track activity on our services and hold certain information. See our Cookies Policy for more details."
        }
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages."
        },
        {
          subtitle: "Communication",
          text: "We may use your information to communicate with you about products, services, offers, promotions, and events, and provide news and information we think will interest you."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to understand how users interact with our services, improve functionality, and develop new features."
        }
      ]
    },
    {
      icon: <Server size={24} />,
      title: "Data Storage and Security",
      content: [
        {
          subtitle: "Data Protection",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law."
        },
        {
          subtitle: "Third-Party Services",
          text: "We may use third-party service providers to help us operate our business and services. These providers have access to your information only to perform specific tasks on our behalf."
        }
      ]
    },
    {
      icon: <Globe size={24} />,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or delete your personal information at any time through your account settings or by contacting us."
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format."
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages or updating your account preferences."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-strong">
              <Shield size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Privacy Policy</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Privacy</span> Matters
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy describes how Vytreon Inc. ("we", "us", or "our") collects, uses, and shares your personal information when you use our services.
            </p>
            
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: October 24, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{item.subtitle}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Sections */}
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-foreground mb-6">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-foreground mb-6">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to the transfer of your information to our facilities and those third parties with whom we share it.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-foreground mb-6">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            {/* Contact Section */}
            <div className="glass-strong rounded-2xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Questions About Privacy?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or our data practices, please contact us.
              </p>
              <a
                href="mailto:info@vytreon.com,vytreongroup@gmail.com?subject=Privacy Policy Inquiry"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;

