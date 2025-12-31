import React from "react";

/**
 * Skeleton placeholders matching the card layout.
 */

// PUBLIC_INTERFACE
export default function LoadingGrid() {
  /** Renders a grid of skeleton cards. */
  return (
    <div className="container page" aria-label="Loading recipes">
      <div className="grid" role="status" aria-live="polite">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="card" aria-hidden="true">
            <div className="card-media">
              <div className="skeleton" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="card-body">
              <div className="skeleton" style={{ width: "70%", height: 16, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: "90%", height: 12, marginBottom: 8 }} />
              <div className="skeleton" style={{ width: "55%", height: 12, marginBottom: 12 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <div className="skeleton" style={{ width: 70, height: 22 }} />
                <div className="skeleton" style={{ width: 60, height: 22 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
