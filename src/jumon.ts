export const jumon64dict =
	"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだでどばびぶべぼ";
export const jumonURLdict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const log2 = (num: number, start = 0) => {
	if (num <= 0) {
		return 0;
	}
	if (num === 1) {
		return start;
	}
	return log2(num / 2, start + 1);
};
export function generateJumon(rawdata: number[][], mode: "jumon" | "URL" = "jumon") {
	const data = rawdata.flat().map((v) => log2(v));
	const bytestr = data.map((v) => v.toString(2).padStart(5, "0")).join("");
	const bytearr = bytestr.padEnd(Math.ceil(bytestr.length / 6) * 6, "0").match(/.{6}/g);
	if (!bytearr) {
		return;
	}
	const jumonbase = bytearr.map((v) => v.padStart(6, "0")).map((v) => Number.parseInt(v, 2));

	switch (mode) {
		case "jumon":
			return jumonbase.map((v) => jumon64dict[v]).join("");
		case "URL":
			return jumonbase.map((v) => jumonURLdict[v]).join("");
	}
}
export function parseJumon(jumon: string, mode: "jumon" | "URL" = "jumon") {
	let rawdata: number[];
	switch (mode) {
		case "jumon":
			rawdata = Array.from(jumon).map((v) => jumon64dict.indexOf(v));
			break;
		case "URL":
			rawdata = Array.from(jumon).map((v) => jumonURLdict.indexOf(v));
			break;
	}
	if (rawdata.length !== rawdata.filter((v) => typeof v === "number" && 0 <= v).length) {
		return;
	}
	const rawdata2 = rawdata
		.map((v) => v.toString(2).padStart(6, "0"))
		.join("")
		.match(/.{5}/g);
	if (!rawdata2) {
		return;
	}
	const data = rawdata2.map((v) => Number.parseInt(v, 2)).map((v) => (v === 0 ? 0 : 2 ** v));
	const size = Math.sqrt(data.length);
	if (!Number.isSafeInteger(size)) {
		return;
	}
	const ndata: number[][] = [];
	for (let i = 0; i < size; i++) {
		ndata.push(data.slice(size * i, size * (i + 1)));
	}
	return ndata;
}
