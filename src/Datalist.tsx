import { useState, useEffect } from "react";
import { Dataview } from "./Dataview";
import type { savedata } from "./types";
import { generateJumon } from "./jumon";

export function Datalist({
	action,
	close,
	viewJumon,
}: { action: (index: number, data: savedata) => void; close: () => void; viewJumon?: boolean }) {
	const [data, setdata] = useState<savedata>([...new Array(10)].map((v) => null));
	useEffect(() => {
		try {
			const raw = localStorage.getItem("savedata");
			if (!raw) {
				localStorage.setItem("savedata", JSON.stringify([...new Array(10)].map((v) => null)));
				return;
			}
			let isdestroy: boolean;
			let savedata: savedata | null = null;
			try {
				savedata = JSON.parse(raw);
				isdestroy = (() => {
					if (!Array.isArray(savedata)) {
						return true;
					}
					savedata;
					for (const data of savedata) {
						if (data === null) {
							continue;
						}
						if (!(typeof data === "object" && Array.isArray(data.data))) {
							return true;
						}
					}
					return false;
				})();
			} catch (e) {
				isdestroy = true;
			}
			if (isdestroy) {
				const doformat = window.confirm(
					"セーブデータが破損しています。セーブデータを消去してフォーマットを行います。よろしいですか？",
				);
				if (doformat) {
					localStorage.setItem("savedata", JSON.stringify([...new Array(10)].map((v) => null)));
					savedata = [...new Array(10)].map((v) => null);
				} else {
					close();
					return;
				}
			}
			const a = [...(savedata ?? []), ...[...new Array(10)].map((v) => null)].slice(0, 10);
			setdata(a);
		} catch (e) {
			window.alert(e);
		}
	}, [close]);
	return (
		<>
			<div
				style={{ maxWidth: "calc(90vw - 40px)", maxHeight: "calc(90vh - 40px)" }}
				className="flex flex-col overflow-y-scroll max-h-[80vh]"
			>
				{data.map((savedata, i) => (
					<button
						type="button"
						key={`${i}${JSON.stringify(savedata)}`}
						onClick={() => action(i, data)}
						style={{ border: "black solid 1px" }}
						className="h-[120px] w-[350px] max-w-[100%] shrink-0 flex flex-row items-center p-2 gap-2"
					>
						{savedata ? (
							<>
								<Dataview data={savedata.data} />
								<div>
									<div>{new Date(savedata.date).toLocaleString()}</div>
									{viewJumon && (
										<div>
											{generateJumon(savedata.data) ?? "ふっかつのじゅもんを生成できませんでした"}
										</div>
									)}
								</div>
							</>
						) : (
							<div>no data</div>
						)}
					</button>
				))}
			</div>
		</>
	);
}
