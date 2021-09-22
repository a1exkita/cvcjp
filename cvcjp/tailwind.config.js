module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: {
                    dark: "#111111",
                    border: "#333333",
                },
            },
            fontFamily: {
                display: ["Cormorant Garamond", "ui-serif"],
                body: ["Inter", "ui-sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
