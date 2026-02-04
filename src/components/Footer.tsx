import "../styles/Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>AI Marketplace</h4>
          <p>Your guide to finding the perfect AI tool for every project.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#browse">Browse AIs</a>
            </li>
            <li>
              <a href="#analyzer">AI Analyzer</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#guides">Guides</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#github">GitHub</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 AI Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
}
