import { Close } from "./assets/close";
import {useState,useEffect} from "react"
export function Overlay({ close, children }: { close: () => void; children: React.ReactNode }) {
	const [opa,setopa]=useState(0);
	const onclick=()=>{
		setopa(0);
		setTimeout(close, 600);
	}
	useEffect(()=>{
		setopa(1);
	},[])
	return (
		<div
			onClick={onclick}
			style={{
				inset: 0,
				position: "fixed",
				backgroundColor: `rgb(0 0 0 / ${opa * 0.4})`,
				zIndex: 10,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				touchAction: "none",
				transition:"background-color 500ms"
			}}
		>
			<div
				onClick={(ev) => ev.stopPropagation()}
				style={{ background: "#fff", position: "relative", padding: "20px",opacity:opa,transition:"opacity 500ms" }}
			>
				<button
					type="button"
					className="absolute right-[1px] top-[1px] p-0"
					style={{ color: "gray" }}
					onClick={onclick}
				>
					<Close width={18} color="#444" />
				</button>
				{children}
			</div>
		</div>
	);
}
