import { useState } from "react";
import { Close } from "./assets/close";
import { cell } from "./Cells";

export function Newbutton({
	size,
	setsize,
	setid,setdata
}: {
	size: number;
	setsize: React.Dispatch<React.SetStateAction<number>>;
	setid: React.Dispatch<React.SetStateAction<number>>;
	setdata:React.Dispatch<React.SetStateAction<cell[][]|undefined>>
}) {
	const [isopen, setopen] = useState(false);
	const [newsize, setnewsize] = useState(size);
	return (
		<>
			{isopen && (
				<div
					onClick={() => {
						setopen(false);
					}}
					style={{
						inset: 0,
						position: "fixed",
						backgroundColor: "#0006",
						zIndex: 10,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						touchAction: "none",
					}}
				>
					<div
						onClick={(ev) => {
							ev.stopPropagation();
						}}
						style={{ background: "#fff", position: "relative", padding: "20px" }}
					>
						<button
							type="button"
							style={{
								position: "absolute",
								right: "1px",
								top: "1px",
								border: "none",
								background: "none",
								color: "gray",
								padding: 0,
							}}
							onClick={() => setopen(false)}
						>
							<Close width={18} />
						</button>
						<h3 style={{ marginBlockEnd: "0px" }}>新しくゲームを始める</h3>
						<h6 style={{ marginBlockStart: "10px", marginBlockEnd: "15px" }}>注：現在のゲームはリセットされます</h6>
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
						<button
							type="button"
							onClick={() => {
								setdata(undefined)
								setsize(newsize);
								setid(Math.random());
								setopen(false);
							}}
						>
							Start
						</button>
					</div>
				</div>
			)}
			<div>
				<button
					type="button"
					onClick={() => {
						setopen(true);
					}}
				>
					newgame
				</button>
			</div>
		</>
	);
}
