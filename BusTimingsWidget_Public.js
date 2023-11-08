// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
// Bus Timings Widget, Made by LZX
// Use this with the Scriptable Application.

// NOTE: THIS WAS DESIGNED TO BE USED ON THE LOCKSCREEN
// Parameter Format: <label>,<bus stop id>,<bus service>
// e.g. STADIUM,80199,11

let param = args.widgetParameter;

let paramArray = [];
if (param !== null) {
    paramArray = param.split(',');
}

if (paramArray.length !== 3) {
    let widget = await createMsgWidget("Invalid Parameters");
    Script.setWidget(widget);
    Script.complete();
    return;
}

let loc_label = paramArray[0];
let busStopId = paramArray[1];
let service = paramArray[2];

let busInfo = await getBusTimings(busStopId, service);
if (busInfo !== null) { return; }

let { arrivalTimes, busDeckTypes } = busInfo;

console.log(arrivalTimes);
console.log(busDeckTypes);

let widget = null;
try {
    widget = await createWidget(loc_label, service, arrivalTimes, busDeckTypes);
} catch (e) {
    console.log(e);
    widget = await createMsgWidget("Unknown");
}

Script.setWidget(widget);
Script.complete();

async function getBusTimings(busStopID, service) {
    let api_key = ""; // API key for the bus API
    if (api_key.length === 0) {
        let widget = await createMsgWidget("No API Key");
        Script.setWidget(widget);
        Script.complete();
        return;
    }

    let params = `BusStopCode=${busStopID}&ServiceNo=${service}`;
    let url = `http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?${params}`;
    let headers = {
        "accept": "application/json",
        "AccountKey": api_key
    };
    
    let req = new Request(url);
    req.headers = headers;

    data = await req.loadJSON();

    if (!data || !data.Services || data.Services.length === 0) {
        let widget = await createMsgWidget("API Request Failed");
        Script.setWidget(widget);
        Script.complete();
        return;
    }

    let services = data.Services;
    let firstService = services[0];
    let arrivalTimes = [];
    let busDeckTypes = [];

    for (let i = 1; i <= 3; i++) {
        let nextBus = firstService[`NextBus${i === 1 ? '' : i}`];
        let estimatedArrival = nextBus.EstimatedArrival || '-';
        let busDeckType = nextBus.Type || '-';

        arrivalTimes.push(estimatedArrival);
        busDeckTypes.push(busDeckType);
    }

    return { arrivalTimes, busDeckTypes };
}

async function createWidget(loc, service, arrivalTimes, busDeckTypes) {
    let widget = new ListWidget();
    widget.setPadding(2, 2, 2, 2);

    let nextRefresh = Date.now() + 1000*30; // add 30 second to now
	widget.refreshAfterDate = new Date(nextRefresh);

    // add bus service and arrival time
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

    console.log(arrivalTimes)
    let arrivalTimeText = arrivalTimes.map(time => {
        if (time === '-') {
            return '--';
        }
        let arrivalTime = new Date(time);
        let now = new Date();
        let diff = Math.floor((arrivalTime - now) / 1000 / 60);
        if (diff === 0) {
            return 'A';
        } else if (diff < 0) {
            return 'L';
        } else {
            return diff.toString().padStart(2, '0');
        }
    }).join(" ");

    let arrivalTime = widget.addText(arrivalTimeText);
    
    arrivalTime.font = Font.boldSystemFont(8);
    arrivalTime.centerAlignText();
    
    let busDeckSizeText = busDeckTypes.map(type => {
        if (type === 'SD') {
            return 'S';
        } else if (type === 'DD') {
            return 'D';
        } else if (type === 'BD') {
            return 'B'
        } else {
            return '-';
        }
    }).join('  ');

    let busDeckSize = widget.addText(busDeckSizeText);
    busDeckSize.font = Font.boldSystemFont(10);
    busDeckSize.centerAlignText();

    widget.addSpacer();
    return widget;
}

async function createMsgWidget(msg) {
    let widget = new ListWidget();
    widget.setPadding(2, 2, 2, 2);

    let title = widget.addText("ERROR");
    title.font = Font.boldSystemFont(8);
    title.centerAlignText();

    let msgTB = widget.addText(msg);
    msgTB.font = Font.boldSystemFont(6);
    msgTB.centerAlignText();

    return widget;
}