import { useState } from "react";
import { App } from "./App";
import { Newbutton } from "./Newbutton";

export function Menu() {
    const [id,setid]=useState<number>(0)
    const [size,setsize]=useState(4)
	return (
		<>
			<App key={id} size={size}/>
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
}
