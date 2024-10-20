import { useState, useEffect } from "react";
import { App } from "./App";
import { Newbutton } from "./UI/Newbutton";
import { Header } from "./Header";
import { useRef } from "react";
import { notify, Notifyelem } from "./UI/Notify";
import { parseJumon } from "./jumon";

export function Menu() {
	const [id, setid] = useState<number>(0);
	const [data, setdata] = useState<{ size: number; saved: number[][] | null }>({ size: 4, saved: null });
	const topdata = useRef<number[][]>(null);
	useEffect(() => {
		try {
			const urldata = new URL(location.href).searchParams.get("data");
			if (urldata) {
				const parseddata = parseJumon(urldata, "URL");
				if (!parseddata) {
					notify("共有されたデータの読み込みに失敗しました");
				} else {
					setdata({ size: parseddata.length, saved: parseddata });
					return;
				}
			}
		} catch (e) {
			notify("共有されたデータの読み込みに失敗しました");
		}
		try {
			const raw = localStorage.getItem("save");
			if (raw) {
				const { size, data }: { size: number; data: { num: number }[][] } = JSON.parse(raw);
				setdata({ size, saved: data.map((v) => v.map((v) => v.num)) });
			}
		} catch (e) {
			console.error(e);
			notify("オートセーブデータの読み込みに失敗しました");
		}
	}, []);
	const load = (data: number[][]) => {
		setdata({ size: data.length, saved: data });
	};
	return (
		<>
			<Header
				topdata={topdata}
				load={load}
				Newbutton={
					<Newbutton size={data.size} setsize={(p) => setdata({ size: p, saved: null })} setid={setid} />
				}
			/>
			<div className="w-full flex items-center flex-col">
				<App key={id} size={data.size} savedata={data.saved} topdata={topdata} />
			</div>
			<div style={{ margin: "8px" }}>
				<h2>使い方</h2>
				<ul>
					<li>タッチ、矢印キー、WASD、画面上のボタンで操作できます</li>
					<li>保存機能、ふっかつのじゅもん機能、一手戻す機能などを今後実装予定</li>
				</ul>
			</div>
			<Notifyelem />
		</>
	);
}
