import { useEffect, useState } from "react";
import { Buttons } from "./Buttons";
import { cell } from "./cell";
const size = 4;

function App() {
	const [data, setdata] = useState<cell[][]>();
	useEffect(() => {
		setdata([...Array(size)].map((_v) => [...Array(size)].map((_v) => (new cell()))));
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
