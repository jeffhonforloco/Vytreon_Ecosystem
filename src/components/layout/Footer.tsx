import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: 'https://twitter.com/vytreon',
      github: 'https://github.com/vytreon',
      linkedin: 'https://linkedin.com/company/vytreon'
    };
    window.open(urls[platform], '_blank');
  };

  const products = [
    { name: 'SireIQ', url: 'https://sireiq.com' },
    { name: 'Fycra', url: 'https://www.fycra.com' },
    { name: 'Fycera', url: 'https://fycera.com' },
    { name: 'CaptionIQ', url: 'https://www.captioniq.io' },
    { name: 'SEOAgentPro', url: 'https://seoagentpro.com' },
    { name: 'Escazo', url: 'https://www.escazo.com' },
    { name: 'VoxSaga', url: 'https://www.voxsaga.com' },
    { name: 'WhisApp', url: 'https://www.whisapp.com' },
    { name: 'iXhare', url: 'https://www.ixhare.com' },
    { name: 'Oowo', url: 'https://oowo.io' },
    { name: 'Didit360', url: 'https://didit360.com' }
  ];

  return (
    <footer className="bg-background border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/lovable-uploads/8e349754-a378-4d24-aa39-58005d777cc5.png" alt="Vytreon Logo" className="h-8 w-auto" />
              <span className="text-lg font-bold text-foreground">Vytreon</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
              Building the next generation of AI-powered products and autonomous digital companies.
            </p>
            <p className="text-xs text-muted-foreground/50 mb-6">
              8 The Green #5275, Dover, DE 19901
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin'].map(p => (
                <button key={p} onClick={() => handleSocialClick(p)} className="text-muted-foreground/50 hover:text-accent transition-colors">
                  {p === 'twitter' && <Twitter size={18} />}
                  {p === 'github' && <Github size={18} />}
                  {p === 'linkedin' && <Linkedin size={18} />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2.5">
              {products.map((product) => (
                <li key={product.name}>
                  <button onClick={() => window.open(product.url, '_blank')} className="text-sm text-muted-foreground/60 hover:text-accent transition-colors text-left">
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link to="/documentation" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">Documentation</Link></li>
              <li><Link to="/api" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">API</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/community" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">Contact</Link></li>
              <li><a href="mailto:info@vytreon.com" className="text-sm text-muted-foreground/60 hover:text-accent transition-colors">info@vytreon.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} Vytreon Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground/40 hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground/40 hover:text-accent transition-colors">Terms</Link>
            <Link to="/cookies" className="text-xs text-muted-foreground/40 hover:text-accent transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
