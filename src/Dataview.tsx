import { color } from "./Cells";

export function Dataview({ data }: { data: number[][] }) {
	const boxsize = 100;
	const size = boxsize / data.length;
	return (
		<>
		<div
					className="border-t-[2px] border-l-[2px] border-black border-solid"
					style={{
						display: "grid",
						width: `${boxsize}px`,
						height: `${boxsize}px`,
						gridTemplateColumns: `repeat(${data.length},1fr)`,
						gridTemplateRows: `repeat(${data.length},1fr)`,
					}}
				>
			{data.map((arr,i1) =>
				arr.map((value,i2) => (
					<div key={`${i1}${i2}${value}`}
						style={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							borderRight: "solid black 2px",
							borderBottom: "solid black 2px",
						}}
					>
						<div
							style={{
								width: "100%",
								height: "100%",
								color: value ? (color[value]?.[0] ?? "white") : "white",
								backgroundColor: value ? (color[value]?.[1] ?? "gray") : "white",
								border: "solid black 2px",
								margin: "-2px",
								fontSize: `${Math.min(size / Math.ceil(Math.log10(value)), size / 1.7)}px`,
								textAlign: "center",
								fontFamily: "gkktt",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{value || ""}
						</div>
					</div>
				)),
			)}
		</div></>
	);
}
