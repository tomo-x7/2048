import { color } from "./Cells";

export function Dataview({ data }: { data: number[][] }) {
	const size = 100 / data.length;
	return (
		<>
			<div
				className="border-t-[3px] border-l-[3px] border-black border-solid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${data.length},${size}px)`,
					gridTemplateRows: `repeat(${data.length},${size}px)`,
				}}
			>
				{data.map((arr, i1) =>
					arr.map((value, i2) => (
						<div
							key={`${i1}${i2}${value}`}
							style={{
								display: "flex",
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								borderRight: "solid black 3px",
								borderBottom: "solid black 3px",
								color: value ? (color[value]?.[0] ?? "white") : "white",
								backgroundColor: value ? (color[value]?.[1] ?? "gray") : "white",
								fontSize: `${Math.min((size-2) / Math.ceil(Math.log10(value)), size / 1.8)}px`,
								fontFamily: "gkktt",
							}}
						>
							{value || ""}
						</div>
					)),
				)}
			</div>
		</>
	);
}
