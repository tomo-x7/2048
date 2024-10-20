import { useState } from "react";
import { LoadJumon } from "./LoadJumon";
import { Datalist } from "./UI/Datalist";
import { Button, HeaderButton } from "./common/Button";
import { Help } from "./Help";

export function Header({
	Newbutton,
	topdata,
	load,
}: {
	Newbutton: React.ReactNode;
	topdata: React.MutableRefObject<number[][] | null>;
	load: (data: number[][]) => void;
}) {
	const [saveload, setsaveload] = useState<"saveload" | "jumon" | "help" | undefined>();
	const close = () => {
		setsaveload(undefined);
	};
	return (
		<>
			<div
				className="sticky top-0 left-0 right-0 mb-[15px] flex justify-between h-fit items-start sp:flex-col"
				style={{ backgroundColor: "white", borderBottom: "solid 2px #0000001f" }}
			>
				<h2 className="text-4xl text-black" style={{ fontFamily: "gkktt" }}>
					2048パズル
				</h2>
				<div className="flex h-[40px] text-white justify-start items-center">
					<HeaderButton onClick={() => setsaveload("saveload")}>データ</HeaderButton>
					<HeaderButton onClick={() => setsaveload("jumon")}>じゅもんを読み込む</HeaderButton>
					{Newbutton}
					<HeaderButton onClick={() => setsaveload("help")}>?</HeaderButton>
				</div>
			</div>
			{(() => {
				switch (saveload) {
					case "saveload":
						return <Datalist close={close} load={load} nowdata={topdata.current} />;
					case "jumon":
						return <LoadJumon close={close} load={load} />;
					case "help":
						return <Help close={close} />;
				}
			})()}
		</>
	);
}
