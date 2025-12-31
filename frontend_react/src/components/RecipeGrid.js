import React from "react";
import RecipeCard from "./RecipeCard";
import EmptyState from "./states/EmptyState";
import LoadingGrid from "./states/LoadingGrid";

/**
 * Responsive grid for recipe cards.
 */

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes, loading, query, onSelectRecipe, error }) {
  /** Shows loading, error, empty state, or the recipe card grid. */
  if (loading) return <LoadingGrid />;

  if (error) {
    return (
      <div className="container page">
        <div className="surface section" role="alert" aria-label="Error">
          <h2 className="h2">Couldn’t load recipes</h2>
          <p className="p" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
          <p className="p" style={{ marginTop: 10 }}>
            If an API base is configured, ensure it exposes <code>/recipes</code>. Otherwise, clear
            API env vars to use mock data.
          </p>
        </div>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <main className="container page" role="main">
      <div className="grid" aria-label="Recipe results">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} onClick={() => onSelectRecipe(r)} />
        ))}
      </div>
    </main>
  );
}
