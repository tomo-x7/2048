import { Datalist } from "./Datalist";
import { Overlay } from "./Overlay";
import type { savedata } from "./types";

export function Loadlist({ close, load }: { close: () => void; load: (data: number[][]) => void }) {
	const action = (index: number, data: savedata) => {
		if (!data[index]) {
			return;
		}
		load(data[index].data);
		close();
	};
	return (
		<Overlay close={close}>
			<Datalist action={action} close={close} viewJumon />
		</Overlay>
	);
}
