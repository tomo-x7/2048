export function Buttons({ action }: { action: (type: "right" | "left" | "top" | "bottom") => unknown }) {
	const top = () => action("top");
	const right = () => action("right");
	const left = () => action("left");
	const bottom = () => action("bottom");
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
