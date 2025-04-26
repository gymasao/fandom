/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                card: "hsl(var(--card) / <alpha-value>)",
                "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
                primary: "hsl(var(--primary) / <alpha-value>)",
                "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
                secondary: "hsl(var(--secondary) / <alpha-value>)",
                "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
                accent: "hsl(var(--accent) / <alpha-value>)",
                "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
                border: "hsl(var(--border) / <alpha-value>)",
            },
        },
    },
    plugins: [],
}