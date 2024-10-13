import { useEffect, useRef } from "react";

const rimit = 30;

export function Buttons({
	action,
	mainref,
	sethold,
}: {
	action: (type: "right" | "left" | "top" | "bottom") => unknown;
	mainref: React.RefObject<HTMLDivElement>;
	sethold: React.Dispatch<React.SetStateAction<"l" | "r" | "t" | "b" | "n" | undefined>>;
}) {
	const top = () => action("top");
	const right = () => action("right");
	const left = () => action("left");
	const bottom = () => action("bottom");
	type pos = { x: number; y: number; identifier: number };
	const touchpos = useRef<{ start?: pos; end?: pos }>({});
	useEffect(() => {
		const touchaction = (a: "right" | "left" | "top" | "bottom" | "none" | undefined) => {
			if (!a) {
				sethold(undefined);
				return;
			}
			sethold(a[0] as "r" | "l" | "t" | "b" | "n");
			if (a !== "none") {
				action(a);
			}
		};
		const check = () => {
			if (!(touchpos.current.start && touchpos.current.end)) return;
			const xdiff = touchpos.current.end.x - touchpos.current.start.x;
			const ydiff = touchpos.current.end.y - touchpos.current.start.y;
			if (Math.max(Math.abs(xdiff), Math.abs(ydiff)) < rimit) {
				return "none";
			}
			if (Math.abs(xdiff) > Math.abs(ydiff)) {
				if (xdiff >= 0) {
					return "right";
				}
				if (xdiff <= 0) {
					return "left";
				}
			} else {
				if (ydiff >= 0) {
					return "bottom";
				}
				if (ydiff <= 0) {
					return "top";
				}
			}
		};
		const touchstart = (ev: TouchEvent) => {
			const t = ev.changedTouches[0];
			touchpos.current.start = { identifier: t.identifier, x: t.clientX, y: t.clientY };
		};
		const touchmove = (ev: TouchEvent) => {
			const t = Array.from(ev.changedTouches).find((v) => v.identifier === touchpos.current.start?.identifier);
			touchpos.current.end = t ? { identifier: t.identifier, x: t.clientX, y: t.clientY } : undefined;
			sethold(check()?.[0] as "l" | "r" | "t" | "b" | "n" | undefined)
		};
		const touchend = (ev: TouchEvent) => {
			const t = Array.from(ev.changedTouches).find((v) => v.identifier === touchpos.current.start?.identifier);
			touchpos.current.end = t ? { identifier: t.identifier, x: t.clientX, y: t.clientY } : undefined;
			touchaction(check());
		};
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
		mainref.current?.addEventListener("touchstart", touchstart);
		mainref.current?.addEventListener("touchmove", touchmove);
		mainref.current?.addEventListener("touchend", touchend);
		document.addEventListener("keydown", keyaction);
		return () => {
			mainref.current?.removeEventListener("touchstart", touchstart);
			mainref.current?.removeEventListener("touchmove", touchmove);
			mainref.current?.removeEventListener("touchend", touchend);
			document.removeEventListener("keydown", keyaction);
		};
	}, [mainref, action, sethold]);

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
