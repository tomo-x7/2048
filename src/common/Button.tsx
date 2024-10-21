import modstyle from "./Button.module.css";
export function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
	return (
		<button
			type="button"
			className={"text-sm sp:text-xs mt-2 p-1 px-2 sp:px-1 rounded-full mx-1 bg-white text-black "}
			style={{ border: "solid black 1px" }}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
export function HeaderButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
	return (
		<button
			type="button"
			className={`text-sm p-1 h-full px-3 bg-white hover:bg-gray-200 text-black ${modstyle.HeaderButton}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
