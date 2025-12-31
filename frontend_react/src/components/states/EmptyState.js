import React from "react";

/**
 * Empty state when no results are found.
 */

// PUBLIC_INTERFACE
export default function EmptyState({ query }) {
  /** Shows an empty state message for no matches. */
  const q = (query || "").trim();

  return (
    <div className="container page">
      <div className="surface section" role="status" aria-live="polite">
        <h2 className="h2">No recipes found</h2>
        {q ? (
          <p className="p">
            We couldn’t find anything matching <strong>“{q}”</strong>. Try a different ingredient,
            tag, or shorter phrase.
          </p>
        ) : (
          <p className="p">Try searching for a recipe name, ingredient, or tag.</p>
        )}

        <div className="meta-row" style={{ marginTop: 12 }}>
          <span className="badge">Try: pasta</span>
          <span className="badge">Try: garlic</span>
          <span className="badge">Try: breakfast</span>
        </div>
      </div>
    </div>
  );
}
