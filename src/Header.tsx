import { useState } from "react";
import { Savelist } from "./Savelist";
import { Loadlist } from "./Loadlist";
import type { savedata } from "./types";

export function Header({
	Newbutton,
	topdata,
	load,
}: {
	Newbutton: React.ReactNode;
	topdata: React.MutableRefObject<number[][] | null>;
	load: (data: number[][]) => void;
}) {
	const [saveload, setsaveload] = useState<"save" | "load" | undefined>();
	return (
		<>
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
					height: "30px",
				}}
			>
				<h2 className="text-3xl" style={{ fontFamily: "gkktt" }}>
					2048パズル
				</h2>
				<div className="flex-1 flex gap-3 text-white justify-end items-center">
					<div className="flex items-center bg-blue-600 h-6 py-1 px-2 rounded-full"> 
						<button type="button" onClick={() => setsaveload("save")}>
							save
						</button>
					</div>
					<div className="flex items-center bg-blue-600 h-6 py-1 px-2 rounded-full">
						<button type="button" onClick={() => setsaveload("load")}>
							load
						</button>
					</div>
					<div className="flex items-center bg-blue-600 h-6 py-1 px-2 rounded-full">{Newbutton}</div>
				</div>
			</div>
			{saveload &&
				(saveload === "save" ? (
					<Savelist close={() => setsaveload(undefined)} topdata={topdata} />
				) : (
					<Loadlist close={() => setsaveload(undefined)} load={load} />
				))}
		</>
	);
}
