// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bus;

// Bus Timings Widget, Made by LZX
// Use this with the Scriptable Application.

// NOTE: THIS IS DESIGNED TO BE USED ON THE LOCKSCREEN ONLY
// Valid Configuration:	all lockscreen widget sizing
// Parameter Format:	<label>,<bus stop id>,<bus service>
// e.g. STADIUM,80199,11

const api_key = "";		// API key for the bus API

// check: widget params
let param;
try {
	param = args.widgetParameter;
} catch {
	let widget = await createErrWidget("No Params");
	Script.setWidget(widget);
	Script.complete();
}

paramArray = param.split(",");
if (paramArray.length !== 3) {
	let widget = await createErrWidget("Invalid Params");
	Script.setWidget(widget);
	Script.complete();
}

// query bus timing API
const [loc_label, busStopId, service] = paramArray;

// verify: verify widget params
if (loc_label.length >= 12) {
	let widget = await createErrWidget("Invalid Params");
	Script.setWidget(widget);
	Script.complete();
}

let busInfo = await getBusTimings(busStopId, service);
if (!busInfo) { 
	let widget = await createErrWidget("Invalid Params");
	Script.setWidget(widget);
	Script.complete();
}

let { arrivalTimes, busDeckTypes } = busInfo;

// check: widget configs
if (!config.runsInAccessoryWidget) {
	let widget = await createErrWidget("Invalid Widget");
	Script.setWidget(widget);
	Script.complete();
}

let widget;
if (config.widgetFamily === 'accessoryCircular') {
	widget = await createMainWidget(loc_label, service, arrivalTimes, busDeckTypes);
} else if (config.widgetFamily === 'accessoryRectangular') {
	widget = await createRecMainWidget(loc_label, service, arrivalTimes, busDeckTypes);
} else {
	widget = await createErrWidget("Invalid Widget");
	Script.setWidget(widget);
	Script.complete();
}

// end
Script.setWidget(widget);
Script.complete();


async function getBusTimings(busStopID, service) {
	let params = `BusStopCode=${busStopID}&ServiceNo=${service}`;
	let url = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?${params}`;
	let headers = {
		accept: "application/json",
		AccountKey: api_key,
	};

	let req = new Request(url, timeoutInterval=15);
	req.headers = headers;

	data = await req.loadJSON();
	
	if (req.response['statusCode'] !== 200) {
		return null;
	}

	let services = data.Services;
	let firstService = services && services.length > 0 ? services[0] : undefined;
	let arrivalTimes = [];
	let busDeckTypes = [];

	for (let i = 1; i <= 3; i++) {
		let nextBus =
			firstService === undefined
				? null
				: firstService[`NextBus${i === 1 ? "" : i}`];
		let estimatedArrival = nextBus === null ? null : nextBus.EstimatedArrival;
		let busDeckType = nextBus === null ? "" : nextBus.Type;

		arrivalTimes.push(estimatedArrival);
		busDeckTypes.push(busDeckType);
	}

	return { arrivalTimes, busDeckTypes };
}

async function createMainWidget(loc, service, arrivalTimes, busDeckTypes) {
	let widget = new ListWidget();
	widget.setPadding(2, 2, 2, 2);

	let nextRefresh = Date.now() + 1000 * 10;
	widget.refreshAfterDate = new Date(nextRefresh);

	let location = widget.addText(loc);
	location.font = Font.boldSystemFont(6);
	location.centerAlignText();

	let busService = widget.addText(service);
	if (service.length > 2) {
		busService.font = Font.boldSystemFont(22 - 4 * (service.length - 2));
	} else {
		busService.font = Font.boldSystemFont(22);
	}
	busService.centerAlignText();

	let title = widget.addText("ARRIVAL - MIN");
	title.font = Font.boldSystemFont(5);
	title.centerAlignText();

	console.log(arrivalTimes);
	let arrivalTimeText = arrivalTimes
		.filter(time => time !== null)
		.map((time) => {
			if (!time) {
				return "";
			}

			let arrivalTime = new Date(time);
			let now = new Date();
			let diff = Math.floor((arrivalTime - now) / 1000 / 60);
			if (diff === 0) {
				return "A";
			} else if (diff < 0) {
				return "L";
			} else {
				return diff.toString().padStart(2, "0");
			}
		})
		.join(" ");

	console.log(arrivalTimeText);

	const NO_SERVICE = arrivalTimeText.trim().length === 0;
	if (NO_SERVICE) {
		arrivalTimeText = "NO SERVICE";
	}
	let arrivalTime = widget.addText(arrivalTimeText);

	if (NO_SERVICE) {
		arrivalTime.font = Font.boldSystemFont(6);
	} else {
		arrivalTime.font = Font.boldSystemFont(8);
	}
	arrivalTime.centerAlignText();

	let busDeckSizeText = busDeckTypes
		.map((type) => {
			if (type === "SD") {
				return "S";
			} else if (type === "DD") {
				return "D";
			} else if (type === "BD") {
				return "B";
			} else {
				return "";
			}
		})
		.join("  ");

	let busDeckSize = widget.addText(busDeckSizeText);
	busDeckSize.font = Font.boldSystemFont(10);
	busDeckSize.centerAlignText();

	widget.addSpacer();
	return widget;
}

async function createRecMainWidget(loc, service, arrivalTimes, busDeckTypes) {
	let widget = new ListWidget();
	widget.setPadding(2, 2, 2, 2);

	let nextRefresh = Date.now() + 1000 * 10;
	widget.refreshAfterDate = new Date(nextRefresh);

	let mainStack = widget.addStack();
	mainStack.layoutHorizontally();
	mainStack.centerAlignContent();

	// Bus Information (Left - 1/4 of space)
	let leftStack = mainStack.addStack();
	leftStack.layoutVertically();
	leftStack.size = new Size(60, 0); // Reduced width (1/4 of total width)
	leftStack.spacing = 2;

	let busService = leftStack.addText(service);
	if (service.length > 2) {
		busService.font = Font.boldSystemFont(24 - 4 * (service.length - 2)); // Slightly smaller
	} else {
		busService.font = Font.boldSystemFont(24); // Slightly smaller
	}
	busService.leftAlignText();

	let location = leftStack.addText(loc);
	location.font = Font.boldSystemFont(9);
	location.leftAlignText();

	mainStack.addSpacer(5); // Add spacing between left and right stacks

	// Arrival Information (Right - 3/4 of space)
	let rightStack = mainStack.addStack();
	rightStack.layoutVertically();
	rightStack.spacing = 2;
	
	let title = rightStack.addText("ARRIVAL (MIN)");
	title.font = Font.boldSystemFont(8);
	title.centerAlignText();
	
	// Process arrival times
	let arrivalTimeText = arrivalTimes
		.filter(time => time !== null)
		.map((time) => {
			if (!time) {
				return "";
			}

			let arrivalTime = new Date(time);
			let now = new Date();
			let diff = Math.floor((arrivalTime - now) / 1000 / 60);
			if (diff === 0) {
				return "A";
			} else if (diff < 0) {
				return "L";
			} else {
				return diff.toString();
			}
		})
		.join(", ");

	const NO_SERVICE = arrivalTimeText.trim().length === 0;
	if (NO_SERVICE) {
		arrivalTimeText = "NO SERVICE";
	}
	
	let arrivalTime = rightStack.addText(arrivalTimeText);
	if (NO_SERVICE) {
		arrivalTime.font = Font.boldSystemFont(10);
	} else {
		arrivalTime.font = Font.boldSystemFont(14);
	}
	arrivalTime.centerAlignText();
	
	// Bus deck types
	let busDeckSizeText = busDeckTypes
		.filter((_, index) => arrivalTimes[index] !== null)
		.map((type) => {
			if (type === "SD") {
				return "S";
			} else if (type === "DD") {
				return "D";
			} else if (type === "BD") {
				return "B";
			} else {
				return "";
			}
		})
		.join(", ");

	if (busDeckSizeText) {
		let busDeckSize = rightStack.addText(busDeckSizeText);
		busDeckSize.font = Font.boldSystemFont(8);
		busDeckSize.centerAlignText();
	}
	
	return widget;
}

async function createErrWidget(msg) {
	let widget = new ListWidget();
	widget.setPadding(2, 2, 2, 2);

	let title = widget.addText("ERROR");
	title.font = Font.boldSystemFont(8);
	title.centerAlignText();

	let widMsg = widget.addText(msg);
	widMsg.font = Font.boldSystemFont(6);
	widMsg.centerAlignText();

	return widget;
}
