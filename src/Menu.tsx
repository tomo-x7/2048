import { useState,useEffect } from "react";
import { App } from "./App";
import { Newbutton } from "./Newbutton";
import { cell } from "./Cells";

export function Menu() {
    
    const [id,setid]=useState<number>(0)
    const [size,setsize]=useState(4)
    let savedata:cell[][]|undefined=undefined;
    const raw=localStorage.getItem("save")
    try{
        if(raw){
        const {size,data}:{size:number,data:{num:number}[][]}=JSON.parse(raw)
        setsize(size)
        savedata=data.map(v=>v.map(v=>(new cell(v.num))))
    }

    return (
		<>
			<App key={id} size={size} savedata={savedata}/>
            <Newbutton size={size} setsize={setsize} setid={setid} />
            <div>
                <h2>使い方</h2>
                <ul>
                    <li>タッチ、矢印キー、WASD、画面上のボタンで操作できます</li>
                    <li>保存機能、ふっかつのじゅもん機能、一手戻す機能などを今後実装予定</li>
                </ul>
            </div>
		</>
	);
}catch(e){
    window.alert(e)
}
}
