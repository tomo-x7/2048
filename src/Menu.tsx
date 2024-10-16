import { useState, useEffect } from "react";
import { App } from "./App";
import { Newbutton } from "./Newbutton";
import { cell } from "./Cells";
import { Header } from "./Header";

export function Menu() {
	const [id, setid] = useState<number>(0);
	const [data, setdata] = useState<{ size: number; saved: number[][] | undefined }>({ size: 4, saved: undefined });
	useEffect(() => {
		const raw = localStorage.getItem("autosave");
		if (raw) {
			const { size, data }: { size: number; data: { num: number }[][] } = JSON.parse(raw);
			setdata({ size, saved: data.map((v) => v.map((v) => v.num)) });
		}
	}, []);
	return (
		<>
			<Header
				Newbutton={<Newbutton size={data.size} setsize={(p) => setdata({ size: p, saved: undefined })} setid={setid} />}
			/>
			<App key={id} size={data.size} savedata={data.saved} />
			<div style={{ margin: "8px" }}>
				<h2>使い方</h2>
				<ul>
					<li>タッチ、矢印キー、WASD、画面上のボタンで操作できます</li>
					<li>保存機能、ふっかつのじゅもん機能、一手戻す機能などを今後実装予定</li>
				</ul>
			</div>
		</>
	);
}
