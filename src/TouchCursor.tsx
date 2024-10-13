import down from "./assets/down.svg";
import left from "./assets/left.svg";
import none from "./assets/none.svg";
import right from "./assets/right.svg";
import top from "./assets/top.svg";
const images = { l: left, r: right, t: top, b: down, n: none };
export function TouchCursor({
	direction,
	touch,limit
}: { direction: "l" | "r" | "t" | "b" | "n" | undefined; touch?: { x: number; y: number } ,limit:number}) {
	if (!(direction && touch)) {
		return <></>;
	}

	return (
		<>
			<div style={{ position: "fixed", top: limit*-1, left: limit*-1, translate: `${touch.x}px ${touch.y}px` }}>
				<img src={images[direction]} alt="" width={limit*2} height={limit*2} />
			</div>
		</>
	);
}
