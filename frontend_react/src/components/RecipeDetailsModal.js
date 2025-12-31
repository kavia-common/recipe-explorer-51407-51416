import React, { useEffect, useMemo, useRef } from "react";

/**
 * Accessible modal dialog with focus trap and Escape key close.
 */

function getFocusableElements(container) {
  if (!container) return [];
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  return Array.from(container.querySelectorAll(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

// PUBLIC_INTERFACE
export default function RecipeDetailsModal({ recipe, isOpen, onClose }) {
  /** Renders recipe details in an accessible modal dialog (focus trapped). */
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const titleId = useMemo(() => (recipe ? `recipe-detail-title-${recipe.id}` : "recipe-detail"), [
    recipe
  ]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const prevActive = document.activeElement;

    // Focus close button on open for keyboard users
    setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key === "Tab") {
        const focusables = getFocusableElements(dialogRef.current);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (prevActive && typeof prevActive.focus === "function") prevActive.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        // Only close if clicking backdrop (not inside modal)
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal-header">
          <div style={{ minWidth: 0 }}>
            <h2 id={titleId} className="h2" style={{ fontSize: 18, marginBottom: 6 }}>
              {recipe.title}
            </h2>
            <div className="meta-row" aria-label="Recipe meta">
              {typeof recipe.servings === "number" && recipe.servings > 0 ? (
                <span className="badge">Serves {recipe.servings}</span>
              ) : null}
              {typeof recipe.prepTimeMinutes === "number" && recipe.prepTimeMinutes > 0 ? (
                <span className="badge">Prep {recipe.prepTimeMinutes}m</span>
              ) : null}
              {typeof recipe.cookTimeMinutes === "number" && recipe.cookTimeMinutes > 0 ? (
                <span className="badge">Cook {recipe.cookTimeMinutes}m</span>
              ) : null}
              {totalTime > 0 ? <span className="badge">Total {totalTime}m</span> : null}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            className="btn btn-ghost"
            type="button"
            onClick={onClose}
            aria-label="Close recipe details"
          >
            Close
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-grid">
            <div>
              <div className="detail-media" aria-hidden="true">
                {recipe.imageUrl ? (
                  <img src={recipe.imageUrl} alt="" />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(17,24,39,0.75)",
                      fontWeight: 900
                    }}
                  >
                    No image available
                  </div>
                )}
              </div>

              {(recipe.tags || []).length > 0 ? (
                <div className="meta-row" style={{ marginTop: 12 }}>
                  {(recipe.tags || []).map((t) => (
                    <span key={t} className="badge badge-accent">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <section aria-label="Ingredients">
                <h3 className="h2">Ingredients</h3>
                {recipe.ingredients?.length ? (
                  <ul className="list">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={`${ing}-${idx}`}>{ing}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="p">No ingredients listed.</p>
                )}
              </section>

              <section aria-label="Instructions" style={{ marginTop: 14 }}>
                <h3 className="h2">Instructions</h3>
                {recipe.instructions?.length ? (
                  <ol className="list">
                    {recipe.instructions.map((step, idx) => (
                      <li key={`${idx}-${step.slice(0, 12)}`}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="p">No instructions provided.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
