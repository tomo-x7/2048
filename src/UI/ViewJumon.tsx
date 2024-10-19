import { notify } from "./Notify";

export function ViewJumon({ jumon }: { jumon: string | undefined }) {
	return (
		<>
			{jumon ? (
				<>
					じゅもん:{" "}
					<input
						onClick={async (ev) => {
							ev.currentTarget.select();
							await navigator.clipboard.writeText(jumon);
							notify("コピーしました");
						}}
						className="border-[1px] border-black text-xs"
						type="text"
						value={jumon}
						readOnly
					/>
				</>
			) : (
				"じゅもんを生成できませんでした"
			)}
		</>
	);
}
