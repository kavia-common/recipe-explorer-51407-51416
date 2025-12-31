import { mockRecipes } from "../data/mockRecipes";

/**
 * Determine API base URL from environment.
 * Priority: REACT_APP_API_BASE -> REACT_APP_BACKEND_URL -> empty (mock mode)
 */
function getApiBase() {
  return (
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim()) ||
    (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim()) ||
    ""
  );
}

function normalizeRecipe(r) {
  return {
    id: String(r.id ?? r._id ?? r.slug ?? Math.random()),
    title: r.title ?? "Untitled Recipe",
    description: r.description ?? "",
    imageUrl: r.imageUrl ?? r.image ?? r.image_url ?? "",
    prepTimeMinutes: Number(r.prepTimeMinutes ?? r.prep_time_minutes ?? r.prepTime ?? 0),
    cookTimeMinutes: Number(r.cookTimeMinutes ?? r.cook_time_minutes ?? r.cookTime ?? 0),
    servings: Number(r.servings ?? 0),
    tags: Array.isArray(r.tags) ? r.tags : [],
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    instructions: Array.isArray(r.instructions)
      ? r.instructions
      : Array.isArray(r.steps)
        ? r.steps
        : typeof r.instructions === "string"
          ? r.instructions.split("\n").filter(Boolean)
          : []
  };
}

function matchesQuery(recipe, q) {
  const query = q.trim().toLowerCase();
  if (!query) return true;

  const haystack = [
    recipe.title,
    recipe.description,
    ...(recipe.tags || []),
    ...(recipe.ingredients || [])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

// PUBLIC_INTERFACE
export async function fetchRecipes({ query, signal }) {
  /** Fetch recipes from configured API or from mock data with local filtering. */
  const apiBase = getApiBase();

  // Mock mode: local filtering (fast, no network)
  if (!apiBase) {
    const normalized = mockRecipes.map(normalizeRecipe);
    return normalized.filter((r) => matchesQuery(r, query || ""));
  }

  const url = new URL(`${apiBase.replace(/\/$/, "")}/recipes`);
  if (query && query.trim()) {
    url.searchParams.set("q", query.trim());
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
    signal
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API request failed (${res.status}): ${text || res.statusText}`);
  }

  const data = await res.json();

  const recipes = Array.isArray(data) ? data : Array.isArray(data?.recipes) ? data.recipes : [];
  return recipes.map(normalizeRecipe);
}

// PUBLIC_INTERFACE
export function isUsingApi() {
  /** Returns true if an API base URL is configured via env vars. */
  return Boolean(getApiBase());
}
