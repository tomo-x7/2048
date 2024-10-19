import { useEffect, useState } from "react";
import downi from "../assets/down.svg";
import topi from "../assets/top.svg";
import righti from "../assets/right.svg";
import lefti from "../assets/left.svg";

export function Buttons({
	action,
}: {
	action: (type: "right" | "left" | "top" | "bottom") => unknown;
}) {
	const [hidden, sethidden] = useState(true);
	const top = () => action("top");
	const right = () => action("right");
	const left = () => action("left");
	const bottom = () => action("bottom");

	useEffect(() => {
		if (!("ontouchstart" in window || navigator.maxTouchPoints > 0 || "onkeydown" in window)) {
			sethidden(false);
		}
		const keyaction = (ev: KeyboardEvent) => {
			if (ev.repeat) {
				return;
			}
			if (ev.key === "ArrowUp" || ev.key.toLowerCase() === "w") {
				ev.preventDefault();
				action("top");
			}
			if (ev.key === "ArrowLeft" || ev.key.toLowerCase() === "a") {
				ev.preventDefault();
				action("left");
			}
			if (ev.key === "ArrowRight" || ev.key.toLowerCase() === "d") {
				ev.preventDefault();
				action("right");
			}
			if (ev.key === "ArrowDown" || ev.key.toLowerCase() === "s") {
				ev.preventDefault();
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
			<button type="button" onClick={() => sethidden(!hidden)}>
				{hidden ? "▶" : "▼"}ボタンを表示
			</button>
			{!hidden && (
				<>
					<br />
					スワイプやキーボードでも操作できます
					<div
						style={{
							display: "grid",
							gridTemplate: "repeat(2,60px)/repeat(2,60px)",
							gap: "10px",
							rotate: "45deg",
							margin: "30px",
							width: "fit-content",
						}}
					>
						<button type="button" onClick={top} style={{ gridColumn: 1, gridRow: 1, rotate: "-45deg" }}>
							<img src={topi} alt="↑" />
						</button>
						<button type="button" onClick={left} style={{ gridColumn: 1, gridRow: 2, rotate: "-45deg" }}>
							<img src={lefti} alt="←" />
						</button>
						<button type="button" onClick={right} style={{ gridColumn: 2, gridRow: 1, rotate: "-45deg" }}>
							<img src={righti} alt="→" />
						</button>
						<button type="button" onClick={bottom} style={{ gridColumn: 2, gridRow: 2, rotate: "-45deg" }}>
							<img src={downi} alt="↓" />
						</button>
					</div>
				</>
			)}
		</>
	);
}
