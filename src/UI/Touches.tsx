import { useEffect, useRef, useState } from "react";
import down from "../assets/down.svg";
import left from "../assets/left.svg";
import none from "../assets/none.svg";
import right from "../assets/right.svg";
import top from "../assets/top.svg";
const images = { l: left, r: right, t: top, b: down, n: none };
const limit = 30;

export function Touches({
	action,
	mainref,
}: { action: (type: "right" | "left" | "top" | "bottom") => unknown; mainref: React.RefObject<HTMLDivElement> }) {
	type pos = { x: number; y: number; identifier: number };
	const touchpos = useRef<{ start?: pos; end?: pos }>({});
	const [direction, setdirection] = useState<"r" | "l" | "t" | "b" | "n" | undefined>();
	const [touch, settouch] = useState<{ x: number; y: number }>();
	useEffect(() => {
		const touchaction = (a: "right" | "left" | "top" | "bottom" | "none" | undefined) => {
			if (!a) {
				setdirection(undefined);
				return;
			}
			setdirection(a[0] as "r" | "l" | "t" | "b" | "n");
			if (a !== "none") {
				action(a);
			}
		};
		const check = () => {
			if (!(touchpos.current.start && touchpos.current.end)) return;
			const xdiff = touchpos.current.end.x - touchpos.current.start.x;
			const ydiff = touchpos.current.end.y - touchpos.current.start.y;
			if (Math.abs(xdiff) ** 2 + Math.abs(ydiff) ** 2 < limit ** 2) {
				return "none";
			}
			if (Math.abs(xdiff) > Math.abs(ydiff)) {
				if (xdiff >= 0) {
					return "right";
				} else {
					return "left";
				}
			} else {
				if (ydiff >= 0) {
					return "bottom";
				} else {
					return "top";
				}
			}
		};
		const touchstart = (ev: TouchEvent) => {
			const t = ev.changedTouches[0];
			touchpos.current.start = { identifier: t.identifier, x: t.clientX, y: t.clientY };
			setdirection("n");
			settouch({ x: t.clientX, y: t.clientY });
		};
		const touchmove = (ev: TouchEvent) => {
			ev.preventDefault();
			const t = Array.from(ev.changedTouches).find((v) => v.identifier === touchpos.current.start?.identifier);
			touchpos.current.end = t ? { identifier: t.identifier, x: t.clientX, y: t.clientY } : undefined;
			setdirection(check()?.[0] as "l" | "r" | "t" | "b" | "n" | undefined);
		};
		const touchend = (ev: TouchEvent) => {
			const t = Array.from(ev.changedTouches).find((v) => v.identifier === touchpos.current.start?.identifier);
			touchpos.current.end = t ? { identifier: t.identifier, x: t.clientX, y: t.clientY } : undefined;
			touchaction(check());
			setdirection(undefined);
			settouch(undefined);
		};
		const option = ({ capture: true, passive: true } as unknown) as EventListenerOptions
		mainref.current?.addEventListener("touchstart", touchstart, option);
		mainref.current?.addEventListener("touchmove", touchmove, option);
		mainref.current?.addEventListener("touchend", touchend, option);
		return () => {
			mainref.current?.removeEventListener("touchstart", touchstart, option);
			mainref.current?.removeEventListener("touchmove", touchmove, option);
			mainref.current?.removeEventListener("touchend", touchend, option);
		};
	}, [action, mainref]);
	if (!(direction && touch)) {
		return <></>;
	}
	return (
		<>
			<div
				style={{ position: "fixed", top: limit * -1, left: limit * -1, translate: `${touch.x}px ${touch.y}px` }}
			>
				<img src={images[direction]} alt="" width={limit * 2} height={limit * 2} />
			</div>
		</>
	);
}
