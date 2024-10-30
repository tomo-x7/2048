import { Overlay } from "./Overlay";

export function Help({ close }: { close: () => void }) {
	return (
		<>
			<Overlay close={close}>
				<div
					style={{ maxWidth: "calc(90vw - 40px)", maxHeight: "calc(90dvh - 40px)" }}
					className="flex flex-col overflow-y-auto"
				>
					<h2 className="text-2xl">使い方</h2>
					<ul className="list-disc pl-5">
						<li>タッチ、矢印キー、WASD、画面上のボタンで操作できます</li>
						<li>自動セーブ機能があるのでリロードしてもデータが保持されます</li>
						<li>右上のデータボタンからデータのセーブ、ロード、共有ができます</li>
						<li>じゅもんが入っているテキストボックスをタップするとコピーされます</li>
						<li>データ共有機能は、最大の数字が2^30を超える場合は動作しない可能性があります</li>
					</ul>
				</div>
			</Overlay>
		</>
	);
}
