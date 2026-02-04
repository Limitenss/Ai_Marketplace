import "../styles/AICard.css";
import type { AI } from "../types.ts";

interface AICardProps {
  ai: AI;
  compact?: boolean;
}

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const decimal = rating % 1;
  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <span className="stars full">{"★".repeat(fullStars)}</span>
      {hasHalfStar && <span className="stars half">★</span>}
      <span className="stars empty">{"☆".repeat(emptyStars)}</span>
    </>
  );
}

export function AICard({ ai, compact = false }: AICardProps) {
  // Safely handle missing properties
  const features = Array.isArray(ai.features) ? ai.features : [];
  const useCases = Array.isArray(ai.useCases) ? ai.useCases : [];
  const description = ai.description || "No description available";
  const category = ai.category || "General";
  const pricing = ai.pricing || "Contact for pricing";
  const rating = typeof ai.rating === "number" ? ai.rating : 4.5;

  return (
    <div className={`ai-card ${compact ? "compact" : ""}`}>
      <div className="ai-header">
        <h3>{ai.name}</h3>
        <div className="rating">
          <div className="stars-container">
            {renderStars(rating)}
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <p className="ai-description">{description}</p>

      <div className="ai-category">
        <span className="category-badge">{category}</span>
      </div>

      {!compact && (
        <>
          {features.length > 0 && (
            <div className="ai-features">
              <h4>Key Features:</h4>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {useCases.length > 0 && (
            <div className="ai-use-cases">
              <h4>Best For:</h4>
              <div className="use-cases">
                {useCases.map((useCase) => (
                  <span key={useCase} className="use-case-tag">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="ai-footer">
        <span className="pricing">{pricing}</span>
        <a
          className="learn-more-btn"
          href={ai.website}
          target="_blank"
          rel="noreferrer"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
