er = (val) =>
// 	window.crypto.subtle
// 		.digest("SHA-256", new TextEncoder("utf-8").encode(val))
// 		.then((h) => {
// 			let hexes = [],
// 				view = new DataView(h);
// 			for (let i = 0; i < view.byteLength; i += 4)
// 				hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
// 			return hexes.join("");
// 		});

// const val = 'my name is sangwoo' + '927491'

// hashBrowser(
// 	JSON.stringify(val)
// ).then(console.log);