# iOS 17 Bus Timings Widget
![License](https://img.shields.io/badge/license-CC0%201.0-blue)

<img src="https://raw.githubusercontent.com/opp100/bmw-scriptable-widgets/main/screenshots/sc_1.png](https://github.com/LZXCorp/iOSBusTimings/blob/adc02139d2ae5f056e615bbf7cc5d3c01770ab4a/pv.jpg" width="400"/>

##  INFORMATION
An iOS Widget designed to show at a glance the arrival timings of Buses directly on your lockscreen.
This only works for Singapore Public Bus Transits.

## INSTRUCTIONS
**❗REQUIRED**
- A API to use the Land Transport DataMall API key. **(DO NOT SHARE IT!!!)**
- Downloading [Scriptable](https://apps.apple.com/de/app/scriptable/id1405459188) on iOS 16 and above on your iPhone.

**🛠️ SETUP**
- Create a new Scriptable Script by clicking on the '+' icon on the top right.
- Rename the script to your liking.
- Copy & paste [BusTimingsWidget_Public.js](https://raw.githubusercontent.com/LZXCorp/iOSBusTimings/main/BusTimingsWidget_Public.js) code into the script.
- In the script, replace the 'api_key' with the key you got from Land Transport DataMall.

- Now, on your lockscreen, hold down on your screen until you are in edit mode.
- Click on the widgets portion of the lockscreen and put in a new Scriptable Widget.
- Select your Bus Timings script and input the parameters.
- Parameter Format: Parameter Format: ```<label>,<bus stop id>,<bus service>```

## ACRYONYMS
**DECK INFO**
- **S** - Single Decker
- **D** - Double Decker

**ARRIVAL INFO**
- **A** - Arrived
- **L** - Left

## ⚠️ KNOWN LIMITATIONS ⚠️
- The label is limited to 11 characters.
- The Widget is only designed for iPhone devices.
- The text might be too small and unreadable for some users.
- The updating rate of the widget ranges from 30 secs to 5 mins.

Made by LZX
