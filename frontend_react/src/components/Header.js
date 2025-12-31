import React, { useEffect, useRef } from "react";

/**
 * Header with app title and prominent search bar.
 */

// PUBLIC_INTERFACE
export default function Header({ query, onQueryChange, onSubmit, resultCount }) {
  /** Renders the header with a search input and a submit action. */
  const inputRef = useRef(null);

  // Auto-focus search on first load for quick use
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <div className="brand" aria-label="Recipe Explorer">
          <div className="brand-mark" aria-hidden="true" />
          <div>
            <h1 className="h1">Recipe Explorer</h1>
            <p className="p" style={{ fontSize: 12 }}>
              Search by title, ingredient, or tag
            </p>
          </div>
        </div>

        <form
          className="search-wrap"
          role="search"
          aria-label="Search recipes"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
        >
          <label className="sr-only" htmlFor="recipe-search">
            Search recipes
          </label>
          <input
            id="recipe-search"
            ref={inputRef}
            className="input"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder='Try "pasta", "garlic", or "breakfast"...'
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit" aria-label="Search">
            Search
          </button>
        </form>

        <div className="kbd-hint" aria-live="polite" style={{ minWidth: 120, textAlign: "right" }}>
          {typeof resultCount === "number" ? `${resultCount} found` : " "}
        </div>
      </div>
    </header>
  );
}
