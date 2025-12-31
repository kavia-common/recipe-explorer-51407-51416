import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import RecipeGrid from "../components/RecipeGrid";
import RecipeDetailsModal from "../components/RecipeDetailsModal";
import Footer from "../components/Footer";
import { fetchRecipes, isUsingApi } from "../services/RecipeService";
import { getFeatureFlags } from "../utils/featureFlags";

/**
 * Home page: header search + grid results + recipe details modal.
 */

function normalizeQueryParam(v) {
  return typeof v === "string" ? v : "";
}

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Root page for the Recipe Explorer app. Keeps query synced to URL and drives recipe state. */
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = normalizeQueryParam(searchParams.get("q") || "");

  const [query, setQuery] = useState(initialQuery);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const abortRef = useRef(null);

  // Optional flags (not required)
  const flags = useMemo(() => getFeatureFlags(), []);

  // Keep state in sync when URL changes externally
  useEffect(() => {
    const urlQuery = normalizeQueryParam(searchParams.get("q") || "");
    setQuery(urlQuery);
  }, [searchParams]);

  // Fetch recipes whenever query changes
  useEffect(() => {
    setLoading(true);
    setError("");

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetchRecipes({ query, signal: controller.signal })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setLoading(false);
        setRecipes([]);

        // In API mode, show error. In mock mode, errors are unexpected but still show them.
        setError(e?.message || "Unknown error");
      });

    return () => controller.abort();
  }, [query]);

  const handleQueryChange = (next) => {
    setQuery(next);
    const trimmed = next.trim();

    // Update URL for shareable links; omit param when empty to keep URL clean
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      if (trimmed) sp.set("q", next);
      else sp.delete("q");
      return sp;
    });
  };

  const usingApi = isUsingApi();

  return (
    <div className="app-shell">
      <Header
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={() => {
          // no-op: query updates already trigger fetch
        }}
        resultCount={loading ? undefined : recipes.length}
      />

      <div className="container" style={{ paddingTop: 14 }}>
        <div
          className="surface section"
          aria-label="App status"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap"
          }}
        >
          <div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span className="badge">{usingApi ? "API mode" : "Mock mode"}</span>
              {flags?.experiments ? <span className="badge">Experiments enabled</span> : null}
            </div>
            <p className="p" style={{ marginTop: 8 }}>
              Click a recipe card to view ingredients and step-by-step instructions.
            </p>
          </div>

          <button
            className="btn"
            type="button"
            onClick={() => handleQueryChange("")}
            aria-label="Clear search"
          >
            Clear
          </button>
        </div>
      </div>

      <RecipeGrid
        recipes={recipes}
        loading={loading}
        query={query}
        error={error}
        onSelectRecipe={(r) => setSelected(r)}
      />

      <RecipeDetailsModal
        recipe={selected}
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
      />

      <Footer />
    </div>
  );
}
