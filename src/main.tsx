import { createRoot } from 'react-dom/client';
import './index.css';

const root = createRoot(document.getElementById("root")!);

Promise.all([
  import('./components/ErrorBoundary'),
  import('./App'),
]).then(([{ default: ErrorBoundary }, { default: App }]) => {
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}).catch((err) => {
  console.error('App failed to initialize:', err);
  root.render(
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsl(240,6%,3%)',
      color: 'hsl(40,20%,95%)',
      fontFamily: 'Space Grotesk, Inter, system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '28rem', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Vytreon</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.7, marginBottom: '1.5rem' }}>
          The application is temporarily unavailable. Please try again shortly.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'hsl(43,55%,54%)',
            color: 'hsl(240,6%,3%)',
          }}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
});
