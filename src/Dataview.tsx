import { color } from "./Cells"

export function Dataview({data}:{data:number[][]}) {
    const boxsize=100;
    const size=boxsize/data.length
    return <>{data.map(arr=>arr.map(value=>(<div
        style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRight: "solid black 5px",
            borderBottom: "solid black 5px",
        }}
    >
        <div
            style={{
                width: "100%",
                height: "100%",
                color: value ? (color[value]?.[0] ?? "white") : "white",
                backgroundColor: value ? (color[value]?.[1] ?? "gray") : "white",
                border: "solid black 2px",
                margin: "-2px",
                fontSize: `${Math.min(size / Math.ceil(Math.log10(value)), size / 1.7)}px`,
                textAlign: "center",
                fontFamily: "gkktt",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {value || ""}
        </div>
    </div>)))}</>
}