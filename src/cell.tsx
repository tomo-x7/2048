import type { Property } from "csstype";
export class cell {
	num: number;
	isMarged: boolean;
	constructor(num?: number) {
		this.num = num ?? 0;
		this.isMarged = false;
	}
	resetTurn() {
		this.isMarged = false;
	}
}
const color: Record<number, [Property.Color, Property.Color]> = {
	2: ["#766553", "#eee4da"],
	4: ["#756452", "#ebd8b6"],
	8: ["#ffffff", "#f2b177"],
    16:["#ffffff","#f69563"],
    32:["white","#f78165"],
    64:["white","#f55b36"],
    128:["white","#f2cf55"],
    256:["white","#f4cc47"],
    512:["white","#f6c937"]
};
export function CellElem({ cell }: { cell: cell }) {
	cell.num;
	return (
		<>
			<div
				style={{
					display: "flex",
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					border: "solid black 3px",
					color: cell.num ? (color[cell.num]?.[0] ?? "white") : "white",
					backgroundColor: cell.num ? (color[cell.num]?.[1] ?? "gray") : "white",
				}}
			>
				{cell.num || ""}
			</div>
		</>
	);
}
