<p>
    <h1 align="center">SG Bus Lockscreen Widget<br></h1>
    <p align="center">Have the Bus Timings shown on your lockscreen!</p>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/LZXCorp/iOSBusTimings/adc02139d2ae5f056e615bbf7cc5d3c01770ab4a/pv.jpg" width="140"/>
</p>

<p align="center">
    <a>
      <img alt="License" src="https://img.shields.io/badge/license-CC0%201.0-blue" />
    </a>
</p>

## Information

This iOS Widget shows at a glance the Bus arrival timings of Buses directly on your lockscreen!

This only works for Singapore Public Bus Transits.

## Instructions

**❗REQUIRED**

- A API to use the Land Transport DataMall API key. **(DO NOT SHARE IT!!!)**
- Downloading [Scriptable](https://apps.apple.com/sg/app/scriptable/id1405459188) on iOS 16 and above on your iPhone.

\
**🛠️ SETUP**

- Create a new Scriptable Script by clicking on the '+' icon on the top right.
- Rename the script to your liking.
- Copy & paste [BusTimingsWidget_Public.js](https://raw.githubusercontent.com/LZXCorp/iOSBusTimings/main/BusTimingsWidget_Public.js) code into the script.
- In the script, replace the `api_key` with the key you got from Land Transport DataMall.

- Now, on your lockscreen, hold down on your screen until you are in edit mode.
- Click on the widgets portion of the lockscreen and put in a new Scriptable Widget.
- Select your Bus Timings script and input the parameters.
- Parameter Format: Parameter Format: `<label>,<bus stop id>,<bus service>` (Note: Do **not** leave any spacing between the parameters)

## Acronyms

### Deck Information

| Acryonym | Full Name     |
| :------: | ------------- |
|    S     | Single Decker |
|    D     | Double Decker |
|    B     | Bendy         |

### Arrival Information

| Acryonym | Full Name |
| :------: | --------- |
|    A     | Arrived   |
|    L     | Left      |

### Bus Crowdedness

| Acryonym | Full Name                        |
| :------: | -------------------------------- |
|    L     | Low Load (Seats Available)       |
|    M     | Medium Load (Standing Available) |
|    H     | High Load (Limited Standing)     |

## ⚠️ Limitations ⚠️

- The widget is only designed for iPhone devices.
- The text might be too small and unreadable for some users.
- The updating rate of the widget ranges from 30 secs to 5 mins, making it unreliable.
- Sometimes Scriptable stops updating the widget, requiring a restart.

## Current Patches

As of the 25Q1 Patch,

- Switched from the HTTP BusArrivalV2 Endpoint to HTTPS BusArrivalV3 Endpoint
- Fixed a ton of mistakes made in the previous patch (causing errors and unintended functionality to occur)
- Better error handling for params and other components of the script

## Feature Tracking

All features are now being tracked in [Issues](https://github.com/LZXCorp/iOSBusTimings/issues).

\
*A simple project made by LZX.*
