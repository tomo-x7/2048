import { useState, useEffect } from "react";
import type { savedata } from "../types";
import { Savedata } from "./Savedata";
import { Overlay } from "../Overlay";

const nullarray: ReadonlyArray<null> = [...new Array(10)].map((v) => null);

export function Datalist({
	close,
	load,
	nowdata,
}: {
	close: () => void;
	load: (data: number[][]) => void;
	nowdata: number[][] | null;
}) {
	const [data, setdata] = useState<savedata>([...new Array(10)].map((v) => null));
	useEffect(() => {
		const raw = localStorage.getItem("savedata");
		if (!raw) {
			localStorage.setItem("savedata", JSON.stringify(nullarray));
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
				localStorage.setItem("savedata", JSON.stringify(nullarray));
				savedata = nullarray.slice();
			} else {
				return close();
			}
		}
		const a = [...(savedata ?? []), ...nullarray].slice(0, 10);
		setdata(a);
	}, [close]);

	return (
		<Overlay close={close}>
			<div
				style={{ maxWidth: "calc(90vw - 40px)", maxHeight: "calc(90dvh - 40px)" }}
				className="flex flex-col overflow-y-auto"
			>
				{data.map((savedata, i) => (
					<div
						key={`${i}${JSON.stringify(savedata)}`}
						style={{ border: "black solid 1px" }}
						className="h-[120px] w-[380px] max-w-[100%] shrink-0 flex flex-row items-center p-2 gap-2"
					>
						<Savedata close={close} savedata={data} index={i} load={load} nowdata={nowdata} />
					</div>
				))}
			</div>
		</Overlay>
	);
}
