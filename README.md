# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# Utility Folder Structure: By Function Type

We group utility functions in `src/utils` by their function type for clarity and maintainability. This structure makes it easier to find, extend, and maintain utility code as the project grows.

**Structure:**

```
src/utils/
  element/   # Functions that traverse or manipulate element trees
  event/     # Functions that handle or detect events
  data/      # Data structure helpers (e.g., array utilities)
  react/     # React-specific helpers
  dom/       # General DOM manipulation utilities
```

**Reasoning:**

- **element/**: For utilities that work with DOM element trees, such as finding parent elements or calculating positions.
- **event/**: For utilities that handle or detect events, like click outside detection.
- **data/**: For helpers that manipulate data structures, such as arrays.
- **react/**: For React-specific helpers, like injecting props into children.
- **dom/**: For general DOM manipulation, such as setting properties on DOM elements.

This approach avoids clutter, improves discoverability, and helps onboard new developers quickly. As the codebase grows, this structure can be further refined or expanded as needed.
