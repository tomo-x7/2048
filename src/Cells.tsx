import type { Property } from "csstype";
import { useEffect, useRef, useState } from "react";
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
		}, 500);
	}
	return (
		<>
			<div
				style={{
					display: "flex",
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					borderRight: "solid black 5px",
					borderBottom: "solid black 5px",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						color: cell.num ? (color[cell.num]?.[0] ?? "white") : "white",
						backgroundColor: cell.num ? (color[cell.num]?.[1] ?? "gray") : "white",
						border: "solid black 2px",
						margin: "-2px",
						fontSize: `${Math.min(size / Math.ceil(Math.log10(cell.num)), size / 1.7)}px`,
						textAlign: "center",
						fontFamily: "gkktt",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					className={cell.isNew ? style.newcell : ""}
				>
					{cell.num || ""}
				</div>
			</div>
		</>
	);
}
