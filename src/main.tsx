import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Menu } from "./Menu.tsx";
import "./global.css";
import { ErrorBoundary } from "./ErrorBound.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<Menu />
	</ErrorBoundary>,
);
