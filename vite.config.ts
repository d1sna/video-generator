import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss()],
	server: {
		allowedHosts: ["video-generator-czjm.onrender.com"],
		port: Number(process.env.PORT) || 4000,
		host: "0.0.0.0",
	},
});
