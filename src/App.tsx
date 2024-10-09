import { useEffect, useState, useRef } from "react";
import { Buttons } from "./Buttons";
import { cell } from "./cell";
const size = 4;

function App() {
	const rawdata = useRef<Record<string, cell>>({});
	const views = useRef<{ left: string[][]; right: string[][]; top: string[][]; bottom: string[][] }>({
		right: [],
		left: [],
		top: [],
		bottom: [],
	});
	const [data, setdata] = useState<string[][]>();
	useEffect(() => {
		const arr1: string[][] = [];
		for (let i = 0; i < size; i++) {
			const arr2: string[] = [];
			for (let j = 0; j < size; j++) {
				const key = crypto.randomUUID();
				rawdata.current[key] = new cell(10*i+j);
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
		views.current.bottom = arr3.slice().reverse();
		setdata(views.current.left.map((v) => v.slice()).slice());
		console.log(JSON.parse(JSON.stringify(Object.entries(views.current).map(a=>({k:a[0],v:a[1].map(b=>b.map(c=>rawdata.current[c]))})))))
	}, []);
	console.log(data);
	return (
		<>
			{data?.map((arr) => (
				<div key={crypto.getRandomValues(new Uint16Array(1))[0].toString()}style={{display:"flex"}}>
					{arr.map((key) => (
						<div key={crypto.getRandomValues(new Uint16Array(1))[0].toString()}>{rawdata.current[key].num}</div>
					))}
				</div>
			))}
			<Buttons action={() => {}} />
		</>
	);
}

export default App;
