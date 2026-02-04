import { useState } from "react";
import "../styles/BrowseAI.css";
import type { AI } from "../types.ts";
import { AICard } from "./AICard.tsx";

interface BrowseAIProps {
  ais: AI[];
}

const CATEGORIES = [
  "All",
  "Content Generation",
  "Image & Video",
  "Data Analysis",
  "Coding",
  "Business",
  "Education",
];

export function BrowseAI({ ais }: BrowseAIProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Staff Picks - Top 4 most reputable AIs by rating
  const staffPicks = [...ais]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((ai) => ai.id);

  const filteredAIs = ais.filter((ai) => {
    const matchesCategory =
      selectedCategory === "All" || ai.category === selectedCategory;
    const matchesSearch =
      ai.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ai.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // If no filters applied and not showing all, only show staff picks
  const displayAIs =
    selectedCategory === "All" && searchTerm === "" && !showAll
      ? filteredAIs.filter((ai) => staffPicks.includes(ai.id))
      : filteredAIs;

  const isStaffPicksView =
    selectedCategory === "All" && searchTerm === "" && !showAll;

  return (
    <section id="browse" className="browse-section">
      <div className="browse-container">
        <h2>{isStaffPicksView ? "Staff Picks" : "Browse All AI Tools"}</h2>
        {isStaffPicksView && (
          <p className="staff-picks-subtitle">
            Our top 4 most recommended AI tools
          </p>
        )}

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="results-info">
          <p>Showing {displayAIs.length} AI tools</p>
        </div>

        {displayAIs.length > 0 ? (
          <>
            <div className="ai-grid">
              {displayAIs.map((ai) => (
                <AICard key={ai.id} ai={ai} compact={isStaffPicksView} />
              ))}
            </div>

            {isStaffPicksView && (
              <div className="show-more-container">
                <button
                  className="show-more-btn"
                  onClick={() => setShowAll(true)}
                >
                  Show All {ais.length} AI Tools
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <p>
              No AI tools found matching your search. Try different keywords or
              categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
