# Contributing to AI Marketplace

Thank you for your interest in contributing to AI Marketplace! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

- **Report Bugs** - Found an issue? Let us know!
- **Suggest Features** - Have an idea? Share it!
- **Submit Code** - Fix bugs or implement features
- **Improve Documentation** - Help others understand the project
- **Add AI Tools** - Expand our AI database
- **Write Tests** - Improve code reliability

## 🐛 Reporting Bugs

Before creating a bug report:

1. Check if the bug is already reported in Issues
2. Collect information: OS, browser, Node version, steps to reproduce
3. Include error messages and logs

**Create a bug report with:**

```markdown
## Description

Brief description of the bug

## Steps to Reproduce

1. Step 1
2. Step 2
3. Step 3

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [Windows/Mac/Linux]
- Node: [Version]
- Browser: [If applicable]
```

## 💡 Suggesting Features

Open an issue with:

```markdown
## Feature Description

What feature would you like?

## Use Case

Why would this be useful?

## Possible Implementation

How could this be implemented?
```

## 🔧 Setting Up Development Environment

1. **Fork the repository**

   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/ai-marketplace.git
   cd ai-marketplace
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/ai-marketplace.git
   ```

4. **Follow installation steps in [OPEN_SOURCE_README.md](./OPEN_SOURCE_README.md)**

## 📝 Making Changes

### Branch Naming Convention

```
feature/add-feature-name        # New features
bugfix/fix-bug-description      # Bug fixes
docs/improve-documentation     # Documentation
refactor/improve-performance   # Refactoring
```

### Example:

```bash
git checkout -b feature/add-new-ai-tools
```

### Commit Message Format

```
[Type] Brief description

Detailed explanation if needed.
Fixes #123
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

**Example:**

```
[feat] Add Google Gemini to AI database

- Added Gemini with full metadata
- Includes pricing and capabilities
- Fixes #45
```

## 🧪 Code Style & Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow existing code style
- 2-space indentation
- Use const/let, avoid var
- Use meaningful variable names

### CSS

- Use existing class naming conventions
- Maintain glass morphism aesthetic
- Mobile-first responsive design
- Use CSS variables for colors

### React Components

```typescript
// ✅ Good
function MyComponent() {
  const [state, setState] = useState(false);

  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
}

// ❌ Avoid
function my_component() {
  var state = false;
  // ...
}
```

### Backend (Express)

```javascript
// ✅ Good
app.post("/api/endpoint", validateInput, async (req, res) => {
  try {
    const result = await processData(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Safe error message" });
  }
});

// ❌ Avoid
app.post("/api/endpoint", (req, res) => {
  processData(req.body).then(res.json).catch(res.send);
});
```

## 📦 Adding New AI Tools

To add a new AI tool to the database:

1. Edit [src/data/mockAIs.ts](./src/data/mockAIs.ts)
2. Add entry following this structure:

```typescript
{
  id: "unique-id",
  name: "AI Tool Name",
  category: "Category",
  rating: 4.8,
  description: "Brief description",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  pricing: "free/freemium/paid",
  strengths: [
    "Strength 1",
    "Strength 2"
  ],
  weaknesses: [
    "Limitation 1",
    "Limitation 2"
  ],
  bestFor: "Who should use this",
  url: "https://example.com",
  staffPick: false
}
```

3. Submit a PR with the new tool information

## 🔐 Security Considerations

When contributing, ensure:

- ✅ No API keys or secrets in code
- ✅ Input validation for all user inputs
- ✅ Proper error handling (no stack traces to users)
- ✅ HTTPS for external API calls
- ✅ Dependencies are up-to-date and secure
- ✅ Follow OWASP security guidelines

## 🧪 Testing

### Frontend

```bash
# If tests are added
npm run test
npm run test:watch
```

### Backend

```bash
cd server
npm run test
```

### Manual Testing Checklist

- [ ] Works on localhost
- [ ] No console errors
- [ ] Forms validate input
- [ ] API calls succeed
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Dark theme consistent

## 📤 Submitting Changes

### Pull Request Process

1. **Update your branch**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**

   ```bash
   git push origin feature/your-feature
   ```

3. **Create Pull Request on GitHub**
   - Link related issues: `Fixes #123`
   - Describe changes clearly
   - Include before/after for UI changes
   - List any breaking changes

4. **PR Description Template**

   ```markdown
   ## Description

   What changes are made?

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing

   How was this tested?

   ## Checklist

   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new console errors
   - [ ] Tested on multiple browsers/devices
   ```

5. **Address Review Feedback**
   - Make requested changes
   - Push updates (don't force push)
   - Respond to comments

6. **Merge**
   - Maintainer will merge when approved
   - Branch will be deleted

## 📚 Documentation

When adding features:

- Update relevant .md files
- Add code comments for complex logic
- Update API documentation if needed
- Include examples for new features

## 🚀 Release Process

### Version Numbering

- MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Steps

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag vX.X.X`
4. Push tag: `git push origin vX.X.X`
5. Create GitHub Release with notes

## ❓ Questions?

- **Documentation:** See [OPEN_SOURCE_README.md](./OPEN_SOURCE_README.md)
- **Issues:** Open a GitHub issue
- **Discussions:** Use GitHub Discussions
- **Security Issues:** Email security contact (don't open public issue)

## 🎉 Recognition

Contributors are recognized in:

- GitHub Contributors page
- Release notes
- Project README

Thank you for contributing! 🙏
