import { Datalist } from "./Datalist";
import { Overlay } from "./Overlay";
import type { savedata } from "./types";

export function Savelist({ close, topdata }: { close: () => void; topdata: React.MutableRefObject<number[][]|null> }) {
	if (!topdata.current) {
		return <div>cannot save now</div>;
	}
	const save = (index: number, data: savedata) => {
		const newdata = data.slice();
		if(!topdata.current){return;}
		newdata[index] = {data:topdata.current,date:new Date().toISOString()};
		localStorage.setItem("savedata", JSON.stringify(newdata));
		close();
		window.alert("保存しました");
	};
	return (
		<Overlay close={close}>
			<Datalist action={save} close={close} />
		</Overlay>
	);
}
