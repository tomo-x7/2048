import { useState } from "react";
import { LoadJumon } from "./LoadJumon";
import { Datalist } from "./UI/Datalist";
import { Button } from "./common/Button";

export function Header({
	Newbutton,
	topdata,
	load,
}: {
	Newbutton: React.ReactNode;
	topdata: React.MutableRefObject<number[][] | null>;
	load: (data: number[][]) => void;
}) {
	const [saveload, setsaveload] = useState<"saveload" | "jumon" | undefined>();
	const close = () => {
		setsaveload(undefined);
	};
	return (
		<>
			<div
				className="sticky top-0 left-0 right-0 mb-[15px] flex justify-between h-fit items-start max-[480px]:flex-col"
				style={{ backgroundColor: "#666" }}
			>
				<h2 className="text-4xl text-white" style={{ fontFamily: "gkktt" }}>
					2048パズル
				</h2>
				<div className="flex-1 flex gap-3 h-full w-full text-white justify-end items-center">
					<Button onClick={() => setsaveload("saveload")}>データ</Button>
					<Button onClick={() => setsaveload("jumon")}>じゅもんを読み込む</Button>
					{Newbutton}
				</div>
			</div>
			{(() => {
				switch (saveload) {
					case "saveload":
						return <Datalist close={close} load={load} nowdata={topdata.current} />;
					case "jumon":
						return <LoadJumon close={close} load={load} />;
				}
			})()}
		</>
	);
}
