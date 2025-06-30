import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss()],
	server: { allowedHosts: ["3e7a-94-228-164-237.ngrok-free.app"] },
});
