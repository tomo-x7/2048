import { color } from "./Cells";
import { Button } from "./common/Button";
import { Overlay } from "./Overlay";
import { useRef, useEffect,useState } from "react";
import { notify } from "./UI/Notify";

export function Screenshot({ close, data, cellsize }: { close: () => void; data: number[][]; cellsize: number }) {
	const canvasref = useRef<HTMLCanvasElement>(null);
	const [imgsrc,setimgsrc]=useState("")
	const [canvassize,setcanvassize]=useState(100)
	useEffect(() => {
		if (!canvasref.current) return;
		const canvas = canvasref.current as HTMLCanvasElement;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		setcanvassize(data.length * cellsize + 5);
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#000";
		ctx.strokeRect(0, 0, canvassize, canvassize);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		for (let x = 0; x < data.length; x++) {
			for (let y = 0; y < data.length; y++) {
				ctx.fillStyle = data[y][x] !== 0 ? (color[data[y][x]]?.[1] ?? "gray") : "white";
				ctx.fillRect(x * cellsize + 2.5, y * cellsize + 2.5, cellsize, cellsize);
				ctx.strokeRect(x * cellsize + 2.5, y * cellsize + 2.5, cellsize, cellsize);
				ctx.font = `${Math.min(cellsize / Math.ceil(Math.log10(data[y][x])), cellsize / 1.8)}px gkktt`;
				ctx.fillStyle = data[y][x] !== 0 ? (color[data[y][x]]?.[0] ?? "white") : "white";
				ctx.fillText(
					data[y][x].toString(),
					x * cellsize + 2.5 + cellsize / 2,
					y * cellsize + 2.5 + cellsize / 2,
					cellsize,
				);
			}
		}
		setimgsrc(canvas.toDataURL("image/png"))
		notify(imgsrc)

	}, [data, cellsize]);
	const copy = () => {
		const type = "image/png";
		canvasref.current?.toBlob(async (blob) => {
			if (!blob) {
				notify("エラーが発生しました");
				return;
			}
			const data = [new ClipboardItem({ [type]: blob })];
			await navigator.clipboard.write(data);
			notify("コピーしました");
		}, type);
	};
	return (
		<Overlay close={close}>
			<div>
				<canvas width={canvassize} height={canvassize} ref={canvasref} style={{display:"none"}} />
				<img src={imgsrc} />
				右クリックまたは長押しで保存もできます
				<Button onClick={copy}>コピー</Button>
			</div>
		</Overlay>
	);
}
