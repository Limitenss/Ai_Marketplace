import "../styles/Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo">🤖 AI Marketplace</h1>
          <p className="tagline">Find the Perfect AI for Your Needs</p>
        </div>
        <nav className="nav">
          <a href="#browse">Browse AIs</a>
          <a href="#analyzer">AI Analyzer</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}
