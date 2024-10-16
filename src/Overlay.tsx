import { Close } from "./assets/close";

export function Overlay({ close, children }: { close: () => void; children: React.ReactNode }) {
	return (
		<div
			onClick={close}
			style={{
				inset: 0,
				position: "fixed",
				backgroundColor: "#0006",
				zIndex: 10,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				touchAction: "none",
			}}
		>
			<div
				onClick={(ev) => ev.stopPropagation()}
				style={{ background: "#fff", position: "relative", padding: "20px" }}
			>
				<button
					type="button"
					style={{
						position: "absolute",
						right: "1px",
						top: "1px",
						border: "none",
						background: "none",
						color: "gray",
						padding: 0,
					}}
					onClick={close}
				>
					<Close width={18} />
				</button>
				{children}
			</div>
		</div>
	);
}
