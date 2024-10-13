import { useEffect, useRef } from "react";


export function Buttons({
	action,
}: {
	action: (type: "right" | "left" | "top" | "bottom") => unknown;
}) {
	const top = () => action("top");
	const right = () => action("right");
	const left = () => action("left");
	const bottom = () => action("bottom");
	
	useEffect(() => {
		
		const keyaction = (ev: KeyboardEvent) => {
			if (ev.repeat) {
				return;
			}
			if (ev.key === "ArrowUp" || ev.key.toLowerCase() === "w") {
				action("top");
			}
			if (ev.key === "ArrowLeft" || ev.key.toLowerCase() === "a") {
				action("left");
			}
			if (ev.key === "ArrowRight" || ev.key.toLowerCase() === "d") {
				action("right");
			}
			if (ev.key === "ArrowDown" || ev.key.toLowerCase() === "s") {
				action("bottom");
			}
		};
		document.addEventListener("keydown", keyaction);
		return () => {
			document.removeEventListener("keydown", keyaction);
		};
	}, [ action]);

	return (
		<>
			<button type="button" onClick={top}>
				↑
			</button>
			<button type="button" onClick={left}>
				←
			</button>
			<button type="button" onClick={right}>
				→
			</button>
			<button type="button" onClick={bottom}>
				↓
			</button>
		</>
	);
}
