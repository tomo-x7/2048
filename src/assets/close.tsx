export function Close({ width, height, color }: { width?: number; height?: number; color?: string }) {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 512 512"
			xmlSpace="preserve"
			width={width}
			height={height}
		>
			<polygon
				points="511.998,70.682 441.315,0 256.002,185.313 70.685,0 0.002,70.692 185.316,256.006 0.002,441.318 
		70.69,512 256.002,326.688 441.315,512 511.998,441.318 326.684,256.006"
				style={{ fill: color ?? "#000" }}
			/>
			<title>close</title>
		</svg>
	);
}
