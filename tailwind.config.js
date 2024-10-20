/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: { screens: { sp: { max: "480px" } } },
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant("hover", "@media(hover:hover){ &:where(:any-link, :enabled, summary):hover }");
		}),
	],
};
