import QRCode from "qrcode";
import { useState } from "react";
import { notify } from "./Notify";
import { Button } from "../common/Button";
import { Overlay } from "../Overlay";
import { generateJumon } from "../jumon";

export function ShowQR({ data }: { data: number[][] }) {
	const [qrsrc, setqrsrc] = useState<string>();
	const [sharesrc, setsharesrc] = useState<string>();
	const [show, setshow] = useState(false);
	const onshow = async () => {
		setshow(true);
		const jumonURLdata = generateJumon(data, "URL");
		if (!jumonURLdata) {
			notify("じゅもんを生成できませんでした");
			return;
		}
		const newsearchParams = new URLSearchParams();
		newsearchParams.set("data", jumonURLdata);
		const shareURL = new URL(`?${newsearchParams.toString()}`, location.href);
		setsharesrc(shareURL.href);
		const src = await QRCode.toDataURL(shareURL.href);
		setqrsrc(src);
	};
	return (
		<>
			{show && (
				<Overlay close={() => setshow(false)}>
					<div className="flex flex-col items-center">
						<img width={100} alt="QRCode" src={qrsrc} />
						<div>
							<input type="text" readOnly value={sharesrc} className="text-ellipsis" />
							{sharesrc && (
								<Button
									onClick={() => {
										navigator.clipboard.writeText(sharesrc);
									}}
								>
									コピー
								</Button>
							)}
						</div>
					</div>
				</Overlay>
			)}
			<Button onClick={onshow}>共有</Button>
		</>
	);
}
