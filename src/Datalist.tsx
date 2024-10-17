import { useState, useEffect } from "react";
import { Dataview } from "./Dataview";

export function Datalist({ action }: { action: (index:number,data:(number[][]|null)[]) => void }) {
	const [data, setdata] = useState<(number[][] | null)[]>([...new Array(10)].map((v) => null));
	useEffect(() => {
        try{
		const raw = localStorage.getItem("savedata");
		if (!raw) {
			localStorage.setItem("savedata",JSON.stringify([...new Array(10)].map((v) => null)))
            return;
		}
		const savedata: number[][][] = JSON.parse(raw);
		const a = [...savedata, ...[...new Array(10)].map((v) => null)].slice(0, 10);
		setdata(a);
    }catch(e){window.alert(e)}
	}, []);
	return (
		<>
			<div style={{display:"flex",flexDirection:"column"}}>
				{data.map((savedata, i) => (
					<button style={{height:"120px",width:"250px",border:"solid black 1px"}} type="button" key={`${i}${JSON.stringify(savedata)}`} onClick={()=>action(i,data)}>
						{savedata ? <Dataview data={savedata} /> : <div>no data</div>}
					</button>
				))}
			</div>
		</>
	);
}
