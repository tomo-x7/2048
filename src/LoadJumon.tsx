import { useRef } from "react";
import { parseJumon } from "./jumon";
import { Overlay } from "./Overlay";

export function LoadJumon({ close, load }: { close: () => void; load: (data: number[][]) => void }) {
	const input = useRef<HTMLInputElement>(null);
	const loadjumon = () => {
		const inputdata = input.current?.value;
		if (!inputdata) {
			window.alert("値を入力してください");
			return;
		}
		const data = parseJumon(inputdata);
		if (!data) {
			window.alert("読み込めませんでした");
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
				<button className="bg-blue-500" type="button" onClick={loadjumon}>
					読み込む
				</button>
			</div>
		</Overlay>
	);
}
