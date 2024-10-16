import { Datalist } from "./Datalist";
import { Overlay } from "./Overlay";

export function Savelist({ close, topdata }: { close: () => void; topdata: React.MutableRefObject<number[][] | null> }) {
	if (!topdata.current) {
		return <div>cannot save now</div>;
	}
	const save = (index: number, data: (number[][] | null)[]) => {
		const newdata = data.slice();
		newdata[index] = topdata.current;
		localStorage.setItem("savedata", JSON.stringify(newdata));
		close();
		window.alert("保存しました");
	};
	return (
		<Overlay close={close}>
			<Datalist action={save} />
		</Overlay>
	);
}
