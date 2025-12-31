import React from "react";

/**
 * Simple footer with navigation links.
 */

// PUBLIC_INTERFACE
export default function Footer() {
  /** Renders app footer with basic navigation links. */
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-nav" aria-label="Footer navigation">
          <a className="link" href="https://react.dev" target="_blank" rel="noreferrer">
            React
          </a>
          <a className="link" href="https://developer.mozilla.org/" target="_blank" rel="noreferrer">
            MDN
          </a>
          <a className="link" href="https://unsplash.com" target="_blank" rel="noreferrer">
            Images
          </a>
        </div>
        <p className="p" style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
          Ocean Professional theme • Built as a lightweight SPA
        </p>
      </div>
    </footer>
  );
}
