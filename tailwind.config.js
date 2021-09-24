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
                    text: "#8B8F97",
                },
                blue: {
                    highlight: "#35F3FF",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Cormorant Garamond", "serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
