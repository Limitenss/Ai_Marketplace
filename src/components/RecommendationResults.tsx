import "../styles/RecommendationResults.css";
import type { AI } from "../types.ts";
import { AICard } from "./AICard.tsx";

interface RecommendationResultsProps {
  scenario: string;
  recommendedAIs: AI[];
  explanation: string;
  isLoading: boolean;
}

export function RecommendationResults({
  scenario,
  recommendedAIs,
  explanation,
  isLoading,
}: RecommendationResultsProps) {
  if (!scenario && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="results-section loading">
        <div className="results-container">
          <div className="spinner"></div>
          <p>Analyzing your scenario and finding the best AI tools...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="results-section">
      <div className="results-container">
        <h2>Recommended AI Tools for You</h2>

        <div className="analysis-explanation">
          <h3>Analysis</h3>
          <p>{explanation}</p>
        </div>

        {recommendedAIs.length > 0 ? (
          <div className="ai-grid">
            {recommendedAIs.map((ai) => (
              <AICard key={ai.id} ai={ai} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No recommendations found. Please try a different scenario.</p>
          </div>
        )}
      </div>
    </section>
  );
}
