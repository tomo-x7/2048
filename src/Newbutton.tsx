import { useState } from "react";
import { Close } from "./assets/close";
import type { cell } from "./Cells";
import { Overlay } from "./Overlay";

export function Newbutton({
	size,
	setsize,
	setid,
}: {
	size: number;
	setsize: (p: number) => void;
	setid: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [isopen, setopen] = useState(false);
	const [newsize, setnewsize] = useState(size);
	return (
		<>
			{isopen && (
				<Overlay close={() => setopen(false)}>
					<div className="text-black">
						<h3 style={{ marginBlockEnd: "0px" }}>新しくゲームを始める</h3>
						<h6 style={{ marginBlockStart: "10px", marginBlockEnd: "15px" }}>
							注：現在のゲームはリセットされます
						</h6>
						大きさ：{newsize}
						<input
							type="range"
							min={2}
							max={10}
							step={1}
							defaultValue={newsize}
							onChange={(ev) => {
								setnewsize(Number.parseInt(ev.target.value));
							}}
						/>
						<br />
						<div className="flex items-center bg-blue-600 h-6 py-1 px-2 rounded-full w-fit">
						<button
							className="text-white"
							type="button"
							onClick={() => {
								setsize(newsize);
								setid(Math.random());
								setopen(false);
							}}
						>
							Start
						</button></div>
					</div>
				</Overlay>
			)}
			<button
				type="button"
				onClick={() => {
					setopen(true);
				}} style={{height:"100%",lineHeight:"100%"}}
			>
				newgame
			</button>
		</>
	);
}
