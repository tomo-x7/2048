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
						<li>保存機能、ふっかつのじゅもん機能、一手戻す機能などを今後実装予定</li>
					</ul>
				</div>
			</Overlay>
		</>
	);
}
