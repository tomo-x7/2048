import { useEffect, useState, useRef } from "react";
import { Buttons } from "./UI/Buttons";
import { cell, CellElem } from "./Cells";
import { Touches } from "./UI/Touches";
import { Screenshot } from "./Screenshot";
import { Camera } from "./assets/camera";

export function App({
	size,
	savedata,
	topdata,
}: { size: number; savedata: number[][] | null; topdata: React.MutableRefObject<number[][] | null> }) {
	console.log(`render with ${JSON.stringify(savedata)}`);
	const rawdata = useRef<Record<string, cell>>({});
	const views = useRef<{ left: string[][]; right: string[][]; top: string[][]; bottom: string[][] }>({
		right: [],
		left: [],
		top: [],
		bottom: [],
	});
	const [data, setdata] = useState<string[][]>();
	const [viewScreenshot, setViewScreenshot] = useState(false);
	const mainref = useRef<HTMLDivElement>(null);
	topdata.current = data ? data.map((v) => v.map((v) => rawdata.current[v].num)) : null;
	useEffect(() => {
		rawdata.current = {};
		const arr1: string[][] = [];
		for (let i = 0; i < size; i++) {
			const arr2: string[] = [];
			for (let j = 0; j < size; j++) {
				const key = crypto.getRandomValues(new Uint32Array(1))[0].toString();
				rawdata.current[key] = savedata ? new cell(savedata[i][j]) : new cell(0);
				arr2.push(key);
			}
			arr1.push(arr2);
		}
		views.current.left = arr1.slice();
		views.current.right = arr1.map((v) => v.slice().reverse());
		const arr3: string[][] = [];
		for (let i = 0; i < size; i++) {
			const arr4: string[] = [];
			for (let j = 0; j < size; j++) {
				arr4.push(arr1[j][i]);
			}
			arr3.push(arr4);
		}
		views.current.top = arr3.slice();
		views.current.bottom = arr3.map((v) => v.slice().reverse());
		if (!savedata) {
			add();
			add();
		}
		setdata(views.current.left.map((v) => v.slice()).slice());
		console.log(
			JSON.parse(
				JSON.stringify(
					Object.entries(views.current).map((a) => ({
						k: a[0],
						v: a[1].map((b) => b.map((c) => rawdata.current[c])),
					})),
				),
			),
		);
	}, [size, savedata]);
	const save = () => {
		if (!data) {
			return;
		}
		const raw = data.map((v) =>
			v.map((v) => {
				const c = rawdata.current[v];
				return { num: c.num };
			}),
		);
		const sdata = { size: size, data: raw };
		localStorage.setItem("save", JSON.stringify(sdata));
	};
	const add = () => {
		const cand = Object.entries(rawdata.current).filter((v) => v[1].num === 0);
		const ran = Math.floor(Math.random() * cand.length);
		rawdata.current[cand[ran][0]].num = 2;
		rawdata.current[cand[ran][0]].isNew = true;
	};
	const slide = (type: "right" | "left" | "top" | "bottom") => {
		let didslide = false;
		const view = views.current[type];
		const data = view.map((v) => v.map((v) => rawdata.current[v]));
		for (let i = 0; i < size; i++) {
			for (let j = 1; j < size; j++) {
				const cur = data[i][j];
				const back = data[i][j - 1];
				if (cur.num === 0) {
					continue;
				}
				for (let k = 0; k < j; k++) {
					const back = data[i][k];
					if (cur.num === back.num && !cur.isMarged && !back.isMarged) {
						const a = (data[i] as cell[]).slice(k + 1, j).reduce((p, c) => p + c.num, 0);
						if (a !== 0) {
							continue;
						}
						cur.num = 0;
						back.num *= 2;
						back.isMarged = true;
						didslide = true;
						cur.isNew = false;
						break;
					}
					if (back.num === 0) {
						back.num = cur.num;
						cur.num = 0;
						didslide = true;
						cur.isNew = false;
						break;
					}
				}
			}
		}
		if (didslide) add();
		Object.entries(rawdata.current).map((v) => {
			v[1].isMarged = false;
		});
		save();
	};
	const boxsize = Math.max(Math.min(window.innerWidth * 0.95, window.innerHeight * 0.95, 400), 150);
	return (
		<>
			<div className="flex flex-col items-center m-[8px] w-fit">
				<div
					className="border-t-[5px] border-l-[5px] border-black border-solid touch-none"
					ref={mainref}
					style={{
						display: "grid",
						width: `${boxsize}px`,
						height: `${boxsize}px`,
						gridTemplateColumns: `repeat(${size},1fr)`,
						gridTemplateRows: `repeat(${size},1fr)`,
					}}
				>
					{data?.map((arr, rowi) =>
						arr.map((key, coli) => (
							<CellElem
								size={boxsize / size}
								cell={rawdata.current[key]}
								key={`${rowi}${coli}${rawdata.current[key].num}`}
							/>
						)),
					)}
				</div>
			</div>
			<div style={{width:`${boxsize}px`}} className="flex justify-end">
				<button type="button" onClick={() => setViewScreenshot(true)}>
					<Camera width={30} />
				</button>
			</div>
			{viewScreenshot && (
				<Screenshot
					data={topdata.current ?? []}
					cellsize={boxsize / size}
					close={() => setViewScreenshot(false)}
				/>
			)}
			<div className="m-[8px]">
				<Buttons
					action={(str) => {
						slide(str);
						setdata(data?.slice());
					}}
				/>
				<Touches
					mainref={mainref}
					action={(str) => {
						slide(str);
						setdata(data?.slice());
					}}
				/>
			</div>
		</>
	);
}
