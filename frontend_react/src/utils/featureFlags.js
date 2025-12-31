/**
 * Parse REACT_APP_FEATURE_FLAGS into a plain object.
 * If parsing fails, return an empty object.
 */

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns a dictionary of feature flags parsed from REACT_APP_FEATURE_FLAGS (JSON). */
  const raw = process.env.REACT_APP_FEATURE_FLAGS;
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
