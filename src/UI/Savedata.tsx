import { Button } from "../common/Button";
import { generateJumon } from "../jumon";
import type { savedata } from "../types";
import { Celldataview } from "./CelldataView";
import { notify } from "./Notify";
import { ShowQR } from "./ShowQR";
import { ViewJumon } from "./ViewJumon";

export function Savedata({
	savedata,
	load,
	index,
	nowdata,close
}: { savedata: savedata; index: number; load: (data: number[][]) => void; nowdata: number[][] | null,close:()=>void }) {
	const thisdata = savedata[index];
	if (!nowdata) {
		return <></>;
	}

	const save = () => {
		const newdata = savedata.slice();
		newdata[index] = { data: nowdata, date: new Date().toISOString() };
		localStorage.setItem("savedata", JSON.stringify(newdata));
		close();
		notify("保存しました");
	};
	if (!thisdata) {
		return (
			<>
				<div
					className="w-[100px] h-[100px] flex justify-center items-center text-gray-600 text-xl"
					style={{ border: "3px solid black" }}
				>
					nodata
				</div>
				<div>
					<div>----/--/-- --:--:--</div>
					<div>
						<Button onClick={save}>保存</Button>
					</div>
				</div>
			</>
		);
	}
	const loaddata = () => {
		load(thisdata.data);
		notify("読み込みました")
		close();
	};
	const jumon = generateJumon(thisdata.data);
	return (
		<>
			<Celldataview data={thisdata.data} />
			<div>
				<div>{new Date(thisdata.date).toLocaleString()}</div>
				<div>
					<ViewJumon jumon={jumon} />
				</div>
				<div>
					<Button onClick={save}>上書き</Button>
					<Button onClick={loaddata}>読み込み</Button>
					{jumon && <ShowQR data={thisdata.data} />}
				</div>
			</div>
		</>
	);
}
