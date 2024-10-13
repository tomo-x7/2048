import { useEffect, useRef, useState } from "react";
import { TouchCursor } from "./TouchCursor";

const limit = 30;

export function Touches({
	action,
	mainref,
}: { action: (type: "right" | "left" | "top" | "bottom") => unknown; mainref: React.RefObject<HTMLDivElement> }) {
	type pos = { x: number; y: number; identifier: number };
	const touchpos = useRef<{ start?: pos; end?: pos }>({});
	const [direction, setdirection] = useState<"r" | "l" | "t" | "b" | "n" | undefined>();
	const [touch,settouch]=useState<{x:number,y:number}>()
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
			if (Math.max(Math.abs(xdiff), Math.abs(ydiff)) < limit) {
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
			setdirection("n");
			settouch({x:t.clientX,y:t.clientY})
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
			settouch(undefined)
		};

		mainref.current?.addEventListener("touchstart", touchstart);
		mainref.current?.addEventListener("touchmove", touchmove);
		mainref.current?.addEventListener("touchend", touchend);
		return () => {
			mainref.current?.removeEventListener("touchstart", touchstart);
			mainref.current?.removeEventListener("touchmove", touchmove);
			mainref.current?.removeEventListener("touchend", touchend);
		};
	}, [action, mainref]);
	return <><TouchCursor direction={direction} touch={touch} limit={limit} /></>;
}
