import { useEffect, useState } from "react";
import style from "./notify.module.css";
let setmessageglobal: React.Dispatch<React.SetStateAction<string | undefined>> | undefined = undefined;
export function Notifyelem() {
	const [message, setmessage] = useState<string>();
	setmessageglobal = setmessage;
	useEffect(() => {
		if (message) {
			const timeout = setTimeout(() => {
				setmessage(undefined);
			}, 1000);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [message]);
	if (!message) {
		return <></>;
	}
	return (
		<span>
			<div
				key={message}
				style={{ backgroundColor: "#000A" }}
				className={`flex justify-center items-center text-white px-6 py-2 m-4 fixed bottom-0 right-0 text-xl z-50 ${style.notify}`}
			>
				{message}
			</div>
		</span>
	);
}

export function notify(message: string) {
	setmessageglobal?.(message);
}
