import { Overlay } from "./Overlay";
import { useRef, useEffect } from "react"

export function Screenshot({ close,data,cellsize }: { close: () => void,data:number[][],cellsize:number }) {
    const canvasref = useRef<HTMLCanvasElement>()
    useEffect(() => {
        if (!canvasref.current) { return }
        const canvas=(canvasref.current as HTMLCanvasElement)
        const ctx=canvas.getContext("2d")
    }, [data])
    return (<Overlay close={close}>
        <div>
            <canvas ref={canvasref} />
        </div>
    </Overlay>)
}