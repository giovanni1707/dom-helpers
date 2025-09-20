# Contributing to Elements Helper

Thank you for your interest in contributing to Elements Helper! We welcome contributions from the community and are pleased to have you join us.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/elements-helper.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test your changes
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📋 Development Setup

### Prerequisites

- Node.js 12.0.0 or higher
- npm or yarn
- A modern web browser for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/elements-helper.git
cd elements-helper

# Install dependencies
npm install

# Build the library
npm run build
```

### Project Structure

```
elements-helper/
├── src/                    # Source code
│   └── elements-helper.js  # Main library file
├── dist/                   # Built files (generated)
├── examples/               # Usage examples
├── scripts/                # Build scripts
├── package.json           # Package configuration
├── README.md              # Main documentation
└── CONTRIBUTING.md        # This file
```

## 🛠️ Development Workflow

### Making Changes

1. **Create a branch**: Always create a new branch for your feature or bug fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**: Edit the source code in the `src/` directory

3. **Test your changes**: 
   - Open `examples/index.html` in a browser
   - Test all functionality works as expected
   - Check browser console for errors

4. **Build the library**:
   ```bash
   npm run build
   ```

5. **Update documentation**: If you're adding new features, update the README.md

### Code Style Guidelines

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons** at the end of statements
- Use **camelCase** for variable and function names
- Use **PascalCase** for class names
- Add **JSDoc comments** for public methods

Example:
```javascript
/**
 * Gets an element by ID with caching
 * @param {string} id - The element ID
 * @returns {HTMLElement|null} The element or null if not found
 */
_getElement(id) {
  // Implementation here
}
```

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add async element waiting functionality
fix: resolve cache cleanup memory leak
docs: update API reference for new methods
```

## 🧪 Testing

### Manual Testing

1. Open `examples/index.html` in multiple browsers
2. Test all interactive examples
3. Check browser console for errors
4. Verify performance stats are accurate

### Browser Testing

Please test your changes in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Testing

- Monitor cache hit rates
- Check for memory leaks
- Verify mutation observer performance
- Test with large numbers of elements

## 📝 Documentation

### README Updates

When adding new features, please update:
- API Reference section
- Usage Examples section
- Performance tips if applicable

### Code Documentation

- Add JSDoc comments for all public methods
- Include parameter types and return types
- Provide usage examples in comments
- Document any breaking changes

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Browser and version**
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Code example** (if applicable)
6. **Console errors** (if any)

Use this template:

```markdown
**Browser:** Chrome 91.0.4472.124
**OS:** Windows 10

**Steps to reproduce:**
1. Load the library
2. Call Elements.someMethod()
3. Observe the error

**Expected:** Should return the element
**Actual:** Returns null

**Console errors:**
```
Error message here
```

**Code example:**
```javascript
// Your code here
```
```

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists
2. Search existing issues for similar requests
3. Provide a clear use case
4. Explain the expected behavior
5. Consider backward compatibility

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Changes have been tested manually
- [ ] Documentation has been updated
- [ ] Commit messages follow the convention
- [ ] No breaking changes (or clearly documented)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Examples work correctly
- [ ] No console errors

## Documentation
- [ ] README updated
- [ ] Code comments added
- [ ] Examples updated (if needed)

## Breaking Changes
List any breaking changes and migration steps
```

### Review Process

1. **Automated checks**: Ensure all checks pass
2. **Code review**: Maintainers will review your code
3. **Testing**: Changes will be tested across browsers
4. **Feedback**: Address any requested changes
5. **Merge**: Once approved, changes will be merged

## 🏷️ Release Process

Releases follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## 🤝 Community Guidelines

### Be Respectful

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Be Collaborative

- Help others learn and grow
- Share knowledge and resources
- Provide constructive feedback
- Support fellow contributors

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers for sensitive issues

## 🎉 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Given credit for their contributions

## 📜 License

By contributing to Elements Helper, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Elements Helper! 🚀
