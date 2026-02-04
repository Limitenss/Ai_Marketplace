import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { BrowseAI } from "./components/BrowseAI.tsx";
import { ScenarioAnalyzer } from "./components/ScenarioAnalyzer.tsx";
import { RecommendationResults } from "./components/RecommendationResults.tsx";
import { Footer } from "./components/Footer.tsx";
import { mockAIs } from "./data/mockAIs.ts";
import type { FormData, ScenarioAnalysis } from "./types.ts";

// Security utility functions
const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (!input) return "";
  // Remove any HTML/script tags
  return String(input).trim().substring(0, maxLength).replace(/[<>]/g, "");
};

const API_ENDPOINT =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:3001/api/analyze";

function App() {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [recommendations, setRecommendations] =
    useState<ScenarioAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzerSubmit = async (formData: FormData) => {
    // Prevent double submission - don't process if already loading
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Sanitize inputs
      const sanitizedData = {
        scenario: sanitizeInput(formData.scenario || "", 500),
        useCase: sanitizeInput(formData.useCase || "", 100),
        budget: sanitizeInput(formData.budget || "", 100),
        features: (formData.features || [])
          .filter((f) => typeof f === "string" && f.length > 0)
          .map((f) => sanitizeInput(f, 50))
          .slice(0, 10),
      };

      // Validate required fields
      if (!sanitizedData.scenario.trim()) {
        setError("Please provide a scenario description");
        setIsLoading(false);
        return;
      }

      // Call the backend API with proper error handling
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const result = await response.json();

      // Validate response structure
      if (!result.recommendedAIs || !Array.isArray(result.recommendedAIs)) {
        throw new Error("Invalid response format");
      }

      setRecommendations({
        scenario: sanitizeInput(String(result.scenario), 500),
        recommendedAIs: result.recommendedAIs,
        explanation: sanitizeInput(String(result.explanation), 1000),
      });

      setSelectedScenario(sanitizedData.scenario);
    } catch (error) {
      console.error("Error analyzing scenario:", error);
      setError(
        error instanceof Error ? error.message : "Failed to analyze scenario",
      );

      // Fallback to mock data if API fails
      const mockExplanation = `Based on your scenario, we've analyzed your needs and selected these AI tools that best match your requirements.`;

      let filteredAIs = mockAIs;
      if (formData.useCase) {
        filteredAIs = mockAIs.filter((ai) =>
          ai.useCases.some((uc) =>
            uc.toLowerCase().includes(formData.useCase?.toLowerCase() || ""),
          ),
        );
      }

      const topRecommendations = filteredAIs
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      setRecommendations({
        scenario: sanitizeInput(formData.scenario, 500),
        recommendedAIs: topRecommendations,
        explanation: mockExplanation,
      });

      setSelectedScenario(sanitizeInput(formData.scenario, 500));
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeroClick = () => {
    const analyzerElement = document.getElementById("analyzer");
    analyzerElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <div className="demo-warning" role="alert">
        Demo notice: For security reasons, the AI analyzer is disabled on this
        public demo.
      </div>
      <Header />
      <Hero onAnalyzeClick={handleHeroClick} />
      <BrowseAI ais={mockAIs} />
      <ScenarioAnalyzer onSubmit={handleAnalyzerSubmit} isLoading={isLoading} />
      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#2a1a1a",
            color: "#ff6b6b",
            textAlign: "center",
            margin: "1rem",
            borderRadius: "8px",
            border: "1px solid #ff6b6b",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}
      <RecommendationResults
        scenario={selectedScenario}
        recommendedAIs={recommendations?.recommendedAIs || []}
        explanation={recommendations?.explanation || ""}
        isLoading={isLoading}
      />
      <Footer />
    </div>
  );
}

export default App;
