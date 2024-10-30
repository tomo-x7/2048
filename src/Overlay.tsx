import { Close } from "./assets/close";
import {useState,useEffect} from "react"
export function Overlay({ close, children }: { close: () => void; children: React.ReactNode }) {
	const [opa,setopa]=useState(0);
	const onclick=()=>{
		setopa(0);
		setTimeout(close, 100);
	}
	useEffect(()=>{
		setopa(0.4);
	},[])
	return (
		<div
			onClick={onclick}
			style={{
				inset: 0,
				position: "fixed",
				backgroundColor: "#0006",
				zIndex: 10,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				touchAction: "none",
				opacity:opa,
				transition:"opacity 500ms"
			}}
		>
			<div
				onClick={(ev) => ev.stopPropagation()}
				style={{ background: "#fff", position: "relative", padding: "20px" }}
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
