import "../styles/Hero.css";

interface HeroProps {
  onAnalyzeClick: () => void;
}

export function Hero({ onAnalyzeClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Discover the Right AI for Your Project</h2>
        <p>
          Whether you need AI for content generation, data analysis, coding
          assistance, or creative work, we help you find the perfect solution in
          seconds.
        </p>
        <button className="cta-button" onClick={onAnalyzeClick}>
          Get AI Recommendations
        </button>
      </div>
    </section>
  );
}
