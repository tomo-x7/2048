import { useState } from "react";
import { Savelist } from "./Savelist";
import { Loadlist } from "./Loadlist";

export function Header({ Newbutton,topdata,load }: { Newbutton: React.ReactElement,topdata:React.MutableRefObject<(number[][]|null)> ;load:(data:number[][])=>void},) {
	const [saveload, setsaveload] = useState<"save" | "load" | undefined>();
	return (
		<div
			style={{
				position: "sticky",
				top: 0,
				left: 0,
				right: 0,
				backgroundColor: "#666",
				marginBottom: "15px",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<h2 style={{ margin: 0, fontFamily: "gkktt" }}>
				<span style={{ fontSize: "1.2em" }}>2048</span>パズル
			</h2>
			<div style={{}}>
				<button type="button" onClick={() => setsaveload("save")}>
					save
				</button>
				<button type="button" onClick={() => setsaveload("load")}>
					load
				</button>
				{Newbutton}
			</div>
			{saveload &&
				(saveload === "save" ? (
					<Savelist close={() => setsaveload(undefined)} topdata={topdata} />
				) : (
					<Loadlist close={() => setsaveload(undefined)} load={load} />
				))}
		</div>
	);
}
