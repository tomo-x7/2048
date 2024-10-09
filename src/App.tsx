import { useEffect, useState,useRef } from "react";
import { Buttons } from "./Buttons";
import { cell } from "./cell";
const size = 4;

function App() {
	const rawdata=useRef<Record<string,cell>>();
	const views=useRef<{left:string[][],right:string[][],top:string[][],bottom:string[][]}>()
	const [data, setdata] = useState<cell[][]>();
	useEffect(() => {
		const arr1:string[][]=[];
		for (let i = 0; i < size; i++) {
			const arr2:string[];
			for(let j=0;j<size;j++){
				const key="hoge"
				rawdata.current[key]=new cell();
				arr2.push(key);
			}
			arr1.push(arr2)
		}
		views.left=arr1.slice();
		views.right=arr1.map(v=>v.slice().reverse());
	}, []);
	console.log(data);
	return (
		<>
			{data?.map((arr) => (
				<div key={crypto.getRandomValues(new Uint16Array(1))[0].toString()}>
					{arr.map((data) => (
						<div key={crypto.getRandomValues(new Uint16Array(1))[0].toString()}>{data.num}</div>
					))}
				</div>
			))}
			<Buttons action={()=>{}} />
		</>
	);
}

export default App;
