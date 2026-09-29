/**
 * Tailwind v4 under Next runs through PostCSS, not the Vite plugin the old
 * TanStack config used (`@tailwindcss/vite`). `src/app/globals.css` is
 * otherwise byte-identical to the old `src/styles.css`, including the single
 * `@import "tailwindcss";` at the top.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
