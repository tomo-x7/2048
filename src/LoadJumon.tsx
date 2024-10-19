import { useRef } from "react";
import { parseJumon } from "./jumon";
import { Overlay } from "./Overlay";
import { notify } from "./UI/Notify";
import { Button } from "./common/Button";

export function LoadJumon({ close, load }: { close: () => void; load: (data: number[][]) => void }) {
	const input = useRef<HTMLInputElement>(null);
	const loadjumon = () => {
		const inputdata = input.current?.value;
		if (!inputdata) {
			notify("値を入力してください");
			return;
		}
		const data = parseJumon(inputdata);
		if (!data) {
			notify("読み込めませんでした");
			return;
		}
		load(data);
		close();
	};
	return (
		<Overlay close={close}>
			<div className="text-black">
				<div>
					ふっかつのじゅもんを入力
					<input ref={input} type="text" className="border-black border-[1px] border-solid" />
				</div>
				<Button onClick={loadjumon}>読み込む</Button>
			</div>
		</Overlay>
	);
}
