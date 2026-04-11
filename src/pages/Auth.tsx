import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Mail, Lock, User, Building2 } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(1, 'Name is required').max(100),
});

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (isSignUp) {
        const result = signupSchema.safeParse({ email, password, displayName });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => { fieldErrors[err.path[0] as string] = err.message; });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, displayName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Check your email to confirm your account');
        }
      } else {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach(err => { fieldErrors[err.path[0] as string] = err.message; });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          navigate('/dashboard');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.012]" style={{
        backgroundImage: 'linear-gradient(hsla(43,55%,54%,0.4) 1px, transparent 1px), linear-gradient(90deg, hsla(43,55%,54%,0.4) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent/[0.06] via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-md px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground/60 hover:text-accent text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="rounded-2xl border border-border bg-card/95 p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mb-4">
              <Building2 size={20} className="text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-heading">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? 'Join the AI Workforce revolution' : 'Sign in to your AWOS dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="displayName" className="text-xs text-muted-foreground/70 uppercase tracking-wider font-mono">Full Name</Label>
                <div className="relative mt-1.5">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="pl-10 bg-secondary/30 border-border/60 focus:border-accent/50 text-foreground"
                    maxLength={100}
                  />
                </div>
                {errors.displayName && <p className="text-xs text-destructive mt-1">{errors.displayName}</p>}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground/70 uppercase tracking-wider font-mono">Email</Label>
              <div className="relative mt-1.5">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="pl-10 bg-secondary/30 border-border/60 focus:border-accent/50 text-foreground"
                  maxLength={255}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-xs text-muted-foreground/70 uppercase tracking-wider font-mono">Password</Label>
              <div className="relative mt-1.5">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-secondary/30 border-border/60 focus:border-accent/50 text-foreground"
                  maxLength={128}
                />
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-xl transition-all hover:shadow-glow"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/30 mt-6 font-mono">
          SECURED BY LOVABLE CLOUD · ENTERPRISE-GRADE ENCRYPTION
        </p>
      </div>
    </div>
  );
};

export default Auth;
