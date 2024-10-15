import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Menu } from "./Menu.tsx";
import "./global.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<Menu />,
);
