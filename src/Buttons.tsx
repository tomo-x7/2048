import { useEffect, useRef } from "react";
import downi from "./assets/down.svg"
import topi from "./assets/top.svg"
import righti from "./assets/right.svg"
import lefti from "./assets/left.svg"

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
	}, [action]);

	return (
		<>
			<div style={{display:"grid", gridTemplate:"repeat(2,60px)/repeat(3,60px)"}}>
				<button type="button" onClick={top} style={{gridColumn:2,gridRow:1}}>
					<img src={topi} alt="↑" />
				</button>
				<button type="button" onClick={left} style={{gridColumn:1,gridRow:2}}>
				<img src={lefti} alt="←" />
				</button>
				<button type="button" onClick={right} style={{gridColumn:3,gridRow:2}}>
				<img src={righti} alt="→" />
				</button>
				<button type="button" onClick={bottom} style={{gridColumn:2,gridRow:2}}>
				<img src={downi} alt="↓" />
				</button>
			</div>
		</>
	);
}
