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
  return (
    <div className={`ai-card ${compact ? "compact" : ""}`}>
      <div className="ai-header">
        <h3>{ai.name}</h3>
        <div className="rating">
          <div className="stars-container">
            {renderStars(ai.rating)}
            <span className="rating-value">{ai.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <p className="ai-description">{ai.description}</p>

      <div className="ai-category">
        <span className="category-badge">{ai.category}</span>
      </div>

      {!compact && (
        <>
          <div className="ai-features">
            <h4>Key Features:</h4>
            <ul>
              {ai.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="ai-use-cases">
            <h4>Best For:</h4>
            <div className="use-cases">
              {ai.useCases.map((useCase) => (
                <span key={useCase} className="use-case-tag">
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="ai-footer">
        <span className="pricing">{ai.pricing}</span>
        <button className="learn-more-btn">Learn More</button>
      </div>
    </div>
  );
}
