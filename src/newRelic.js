import React, { useEffect } from 'react';

// New Relic initialization function
export function initNewRelic() {
  try {
    // Configuration for New Relic Browser Agent
    window.NREUM = window.NREUM || {};
    window.NREUM.init = {
      distributed_tracing: {
        enabled: true
      },
      privacy: {
        cookies_enabled: true
      },
      session_replay: {
        enabled: true,
        block_selector: '.nr-block-replay',
        mask_all_inputs: true,
        mask_text_selector: '.nr-mask-replay'
      }
    };

    // Dynamic script loading
    const script = document.createElement('script');
    script.src = 'https://js-agent.newrelic.com/nr-loader-spa-current.min.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // Global error handlers
      window.addEventListener('error', (event) => {
        window.NREUM?.noticeError?.(event.error);
      });

      window.addEventListener('unhandledrejection', (event) => {
        window.NREUM?.noticeError?.(event.reason);
      });
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error('New Relic initialization failed', error);
  }
}

// Error Boundary Component
export class NewRelicErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Report error to New Relic
    if (window.NREUM?.noticeError) {
      window.NREUM.noticeError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}