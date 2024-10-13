import { useEffect, useState, useRef } from "react";
import { Buttons } from "./Buttons";
import { cell, CellElem } from "./Cells";
const size = 5;

function App() {
	const rawdata = useRef<Record<string, cell>>({});
	const views = useRef<{ left: string[][]; right: string[][]; top: string[][]; bottom: string[][] }>({
		right: [],
		left: [],
		top: [],
		bottom: [],
	});
	const [data, setdata] = useState<string[][]>();
	const mainref = useRef<HTMLDivElement>(null);
	const [holdstate, sethold] = useState<"l" | "r" | "t" | "b" | "n" | undefined>();
	useEffect(() => {
		rawdata.current = {};
		console.log("effect");
		const arr1: string[][] = [];
		for (let i = 0; i < size; i++) {
			const arr2: string[] = [];
			for (let j = 0; j < size; j++) {
				const key = crypto.getRandomValues(new Uint32Array(1))[0].toString()
				rawdata.current[key] = new cell(0);
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
		add();
		setdata(views.current.left.map((v) => v.slice()).slice());
		console.log(
			JSON.parse(
				JSON.stringify(
					Object.entries(views.current).map((a) => ({ k: a[0], v: a[1].map((b) => b.map((c) => rawdata.current[c])) })),
				),
			),
		);
	}, []);
	const add = () => {
		const cand = Object.entries(rawdata.current).filter((v) => v[1].num === 0);
		const ran = Math.floor(Math.random() * cand.length);
		rawdata.current[cand[ran][0]].num = 2;
		rawdata.current[cand[ran][0]].isNew = true;
	};
	const slide = (type: "right" | "left" | "top" | "bottom") => {
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
						cur.num = 0;
						back.num *= 2;
						back.isMarged = true;
						break;
					}
					if (back.num === 0) {
						back.num = cur.num;
						cur.num = 0;
						break;
					}
				}
			}
		}
		add();
		Object.entries(rawdata.current).map((v) => {
			v[1].isMarged = false;
		});
	};
	console.log(data);
	const boxsize = Math.min(Math.min(window.innerWidth, window.innerHeight) * 0.95, 400);
	return (
		<>
			<div
				ref={mainref}
				style={{
					display: "grid",
					width: `${boxsize}px`,
					height: `${boxsize}px`,
					gridTemplateColumns: `repeat(${size},1fr)`,
					gridTemplateRows: `repeat(${size},1fr)`,
					borderTop:"solid black 5px",
					borderLeft:"solid black 5px"
				}}
			>
				{data?.map((arr, rowi) =>
					arr.map((key, coli) => <CellElem rowi={rowi} coli={coli} cell={rawdata.current[key]} key={`${rowi}${coli}${rawdata.current[key].num}`} />),
				)}
			</div>
			<Buttons
				action={(str) => {
					slide(str);
					setdata(data?.slice());
				}}
				mainref={mainref}
				sethold={sethold}
			/>
			<div>{holdstate}</div>
		</>
	);
}

export default App;
