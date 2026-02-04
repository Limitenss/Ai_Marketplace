import { useState } from "react";
import "../styles/ScenarioAnalyzer.css";
import type { FormData } from "../types.ts";

interface ScenarioAnalyzerProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const USE_CASES = [
  "Content Generation",
  "Data Analysis",
  "Coding Assistance",
  "Image Generation",
  "Video Creation",
  "Research & Writing",
  "Customer Support",
  "Business Intelligence",
  "Creative Projects",
  "Education & Learning",
];

const BUDGET_OPTIONS = [
  "Free",
  "Under $50/month",
  "$50-$200/month",
  "$200-$500/month",
  "$500+/month",
];

export function ScenarioAnalyzer({
  onSubmit,
  isLoading,
}: ScenarioAnalyzerProps) {
  const [formData, setFormData] = useState<FormData>({
    scenario: "",
    useCase: "",
    budget: "",
    features: [],
  });

  const handleScenarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      scenario: e.target.value,
    });
  };

  const handleUseCaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      useCase: e.target.value,
    });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      budget: e.target.value,
    });
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features?.includes(feature)
        ? formData.features.filter((f) => f !== feature)
        : [...(formData.features || []), feature],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.scenario.trim()) {
      await onSubmit(formData);
    }
  };

  return (
    <section id="analyzer" className="analyzer-section">
      <div className="analyzer-container">
        <h2>Describe Your Scenario</h2>
        <p className="analyzer-subtitle">
          Tell us about your project, and we'll analyze and recommend the best
          AI tools for you
        </p>

        <form className="analyzer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="scenario">What's your scenario or use case?</label>
            <textarea
              id="scenario"
              value={formData.scenario}
              onChange={handleScenarioChange}
              placeholder="Example: I need to generate high-quality product descriptions for my e-commerce store. I have around 500 products and need descriptions that are SEO-friendly and engaging..."
              rows={6}
              disabled={isLoading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="useCase">Primary Use Case</label>
              <select
                id="useCase"
                value={formData.useCase || ""}
                onChange={handleUseCaseChange}
                disabled={isLoading}
              >
                <option value="">Select a use case</option>
                {USE_CASES.map((useCase) => (
                  <option key={useCase} value={useCase}>
                    {useCase}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <select
                id="budget"
                value={formData.budget || ""}
                onChange={handleBudgetChange}
                disabled={isLoading}
              >
                <option value="">No preference</option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Important Features</label>
            <div className="feature-checkboxes">
              {[
                { label: "Speed", emoji: "⚡" },
                { label: "Accuracy", emoji: "🎯" },
                { label: "Cost-effective", emoji: "💰" },
                { label: "Easy to integrate", emoji: "🔧" },
                { label: "Good documentation", emoji: "📚" },
                { label: "Community support", emoji: "👥" },
                { label: "Privacy-focused", emoji: "🔒" },
                { label: "Customizable", emoji: "🎨" },
              ].map(({ label, emoji }) => (
                <label key={label} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.features?.includes(label) || false}
                    onChange={() => handleFeatureToggle(label)}
                    disabled={isLoading}
                  />
                  <span>
                    {emoji} {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || !formData.scenario.trim()}
          >
            {isLoading ? "Analyzing..." : "Analyze & Get Recommendations"}
          </button>
        </form>
      </div>
    </section>
  );
}
