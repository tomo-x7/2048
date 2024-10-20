import type { Property } from "csstype";
import style from "./cells.module.css";
export class cell {
	num: number;
	isMarged: boolean;
	isNew: boolean;
	constructor(num?: number, isNew = false) {
		this.num = num ?? 0;
		this.isMarged = false;
		this.isNew = isNew;
	}
	resetTurn() {
		this.isMarged = false;
	}
}

export const color: Record<number, [Property.Color, Property.Color]> = {
	2: ["#766553", "#eee4da"],
	4: ["#756452", "#ebd8b6"],
	8: ["#ffffff", "#f2b177"],
	16: ["#ffffff", "#f69563"],
	32: ["white", "#f78165"],
	64: ["white", "#f55b36"],
	128: ["white", "#f2cf55"],
	256: ["white", "#f4cc47"],
	512: ["white", "#f6c937"],
};
export function CellElem({ cell, size }: { cell: cell; size: number }) {
	if (cell.isNew) {
		setTimeout(() => {
			cell.isNew = false;
		}, 700);
	}
	return (
		<>
			<div className="flex flex-1 items-center justify-center border-r-[5px] border-b-[5px] border-black border-solid">
				<div
					style={{
						color: cell.num ? (color[cell.num]?.[0] ?? "white") : "white",
						backgroundColor: cell.num ? (color[cell.num]?.[1] ?? "gray") : "white",
						fontSize: `${Math.min(size / Math.ceil(Math.log10(cell.num)), size / 1.8)}px`,
						fontFamily: "gkktt",
						width: "calc(100% + 4px)",
						height: "calc(100% + 4px)",
						boxShadow: cell.num ? "inset 0.5px 0.5px 3px rgba(0,0,0,.5)" : "none",
					}}
					className={`border-black border-solid border-2 p-0 m-[-2px] text-center flex justify-center items-center ${cell.isNew ? style.newcell : ""}`}
				>
					{cell.num || ""}
				</div>
			</div>
		</>
	);
}
