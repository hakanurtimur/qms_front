import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      minWidth: {
        "screen-90": "90vw",
        "screen-70": "80vw",
      },
      minHeight: {
        "screen-90": "90vh",
        "screen-70": "70vh",
      },
      maxWidth: {
        "screen-90": "90vw",
        "screen-70": "80vw",
      },
      maxHeight: {
        "screen-90": "90vh",
        "screen-70": "70vh",
      },
      colors: {
        "primary-50": "#e8ebf5", // Very light, for backgrounds
        "primary-100": "#c6d0ea", // Light shade, subtle backgrounds
        "primary-200": "#9fb4d7", // Lighter shade
        "primary-300": "#7899c5", // Soft main color
        "primary-400": "#567eb3", // Accent color
        "primary-500": "#355fa1", // Default primary (main color)
        "primary-600": "#2d548e", // Slightly darker primary
        "primary-700": "#254279", // Darker for emphasis
        "primary-800": "#1e3663", // Even darker
        "primary-900": "#172a50", // Very dark for contrast
        "primary-950": "#22366b",
        secondary: colors.green,
        tertiary: colors.yellow,
        success: colors.green,
        warning: colors.amber,
        danger: colors.red,
        info: colors.cyan,
        error: colors.red,
        black: colors.gray,
        background: colors.white,
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "slide-in-from-left": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-in-from-right": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-out-to-left": {
          from: {
            transform: "translateX(0%)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
        "slide-in-from-bottom": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.50s ease",
        "slide-in-from-right": "slide-in-from-right 0.50s ease",
        "slide-out-to-left": "slide-out-to-left 0.50s ease",
        "slide-in-from-bottom": "slide-in-from-bottom 0.50s ease",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: unknown) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          overflowY: "scroll",
          scrollbarWidth: "none",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;

export default config;
