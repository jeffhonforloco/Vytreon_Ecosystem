import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(240,6%,3%)] text-[hsl(40,20%,95%)]">
          <div className="text-center max-w-md px-6">
            <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Vytreon
            </h1>
            <p className="text-lg opacity-70 mb-6">
              Something went wrong loading the application. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: 'hsl(43,55%,54%)', color: 'hsl(240,6%,3%)' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
