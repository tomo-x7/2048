import { useState } from "react";
import { Overlay } from "../Overlay";
import { Button } from "../common/Button";

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
						<Button
							onClick={() => {
								setsize(newsize);
								setid(Math.random());
								setopen(false);
							}}
						>
							Start
						</Button>
					</div>
				</Overlay>
			)}
			<Button
				onClick={() => {
					setopen(true);
				}}
			>
				新規
			</Button>
		</>
	);
}
