import { useState, useEffect } from "react"
import { Dataview } from "./Dataview";

export function Datalist({ action }: { action: () => void }) {
    const [data, setdata] = useState<(number[][] | undefined)[]>([...new Array(10)].map(v => undefined))
    useEffect(() => {
        const raw = localStorage.getItem("savedata")
        if (!raw) {
            return;
        }
        const savedata: number[][][] = JSON.parse(raw)
        const a = [...savedata, ...[...new Array(10)].map(v => undefined)].slice(0, 10)
        setdata(a)
    }, [])
    return (<>
        <div>
            {data.map(savedata => (<button type="button" onClick={action}><Dataview data={savedata} /></button>))}
        </div>
    </>)
}