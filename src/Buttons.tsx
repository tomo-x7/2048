import { useEffect, useRef } from "react";

export function Buttons({
	action:actiontest,
	mainref,sethold
}: {
	action: (type: "right" | "left" | "top" | "bottom") => unknown;
	mainref: React.RefObject<HTMLDivElement>;
	sethold: React.Dispatch<React.SetStateAction<"l" | "r" | "t" | "b" | "n" | undefined>>;
}) {
	const action=(a:"right" | "left" | "top" | "bottom")=>{
		sethold(a[0] as ("r"|"l"|"t"|"b"))
		actiontest(a)
	}
	const top = () => action("top");
	const right = () => action("right");
	const left = () => action("left");
	const bottom = () => action("bottom");
	type pos = { x: number; y: number; identifier: number };
	const touchpos = useRef<{ start?: pos; end?: pos }>({});
	useEffect(() => {
		mainref.current?.addEventListener("touchstart", (ev) => {
			const t = ev.changedTouches[0];
			touchpos.current.start = { identifier: t.identifier, x: t.clientX, y: t.clientY };
		});
		mainref.current?.addEventListener("touchmove", (ev) => {
			const t = Array.from(ev.changedTouches).find((v) => v.identifier === touchpos.current.start?.identifier);
			touchpos.current.end = t ? { identifier: t.identifier, x: t.clientX, y: t.clientY } : undefined;
			
		});
	}, [mainref]);

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
