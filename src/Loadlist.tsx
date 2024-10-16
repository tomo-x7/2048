import { Datalist } from "./Datalist";
import { Overlay } from "./Overlay";

export function Loadlist({ close, load }: { close: () => void; load: (data: number[][]) => void }) {
	const action = (index: number, data: (number[][] | null)[]) => {
		if (!data[index]) {
			return;
		}
		load(data[index]);
		close();
	};
	return (
		<Overlay close={close}>
			<Datalist action={action} />
		</Overlay>
	);
}
