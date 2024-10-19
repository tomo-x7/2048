export function Button({
	onClick,
	children,
	style,
}: { onClick: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
	return (
		<button
			type="button"
			className="text-sm p-1 rounded-lg mx-1 bg-blue-600 text-white"
			style={{ border: "black 1px solid", ...style }}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
