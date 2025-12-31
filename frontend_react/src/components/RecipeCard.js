import React from "react";

/**
 * Individual recipe card for the grid.
 */

function clampText(text, max = 120) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onClick }) {
  /** Renders a clickable recipe card with image, title, tags, and a view details action. */
  const titleId = `recipe-title-${recipe.id}`;

  return (
    <article className="card" aria-labelledby={titleId}>
      <button
        type="button"
        onClick={onClick}
        className="btn btn-ghost"
        style={{
          width: "100%",
          padding: 0,
          border: "none",
          borderRadius: "var(--radius-lg)",
          textAlign: "left"
        }}
        aria-label={`View details for ${recipe.title}`}
      >
        <div className="card-media" aria-hidden="true">
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt="" loading="lazy" />
          ) : (
            <div style={{ padding: 16, textAlign: "center", color: "rgba(17,24,39,0.75)" }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>No image</div>
              <div style={{ fontSize: 12 }}>A tasty surprise awaits</div>
            </div>
          )}
        </div>

        <div className="card-body">
          <h3 id={titleId} className="card-title">
            {recipe.title}
          </h3>

          <p className="card-desc">{clampText(recipe.description || "", 120)}</p>

          <div className="card-actions">
            <div className="tag-row" aria-label="Recipe tags">
              {(recipe.tags || []).slice(0, 2).map((t) => (
                <span key={t} className="badge badge-accent">
                  {t}
                </span>
              ))}
              {(recipe.tags || []).length > 2 ? (
                <span className="badge">+{recipe.tags.length - 2}</span>
              ) : null}
            </div>

            <span className="link" aria-hidden="true">
              View →
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
