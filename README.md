# iOS 17 Bus Timings Widget

![License](https://img.shields.io/badge/license-CC0%201.0-blue)

<img src="https://raw.githubusercontent.com/LZXCorp/iOSBusTimings/adc02139d2ae5f056e615bbf7cc5d3c01770ab4a/pv.jpg" width="140" style="border-radius: 12%"/>

##  INFORMATION

An iOS Widget designed to show at a glance arrival timings of Buses directly on your lockscreen.
This only works for Singapore Public Bus Transits.

## PATCHES

As of the November 2023 Patch,
- New ```B - Bendy``` Bus Type added, which previously did not exist.
- There is now error handling for parameters and API errors.
- Instead of a long string of text indicating 'Undefined' for arrival times, or out-right stop working whens services end, it will now show a 'SERVICE ENDED' badge.

## INSTRUCTIONS

**❗REQUIRED**

- A API to use the Land Transport DataMall API key. **(DO NOT SHARE IT!!!)**
- Downloading [Scriptable](https://apps.apple.com/de/app/scriptable/id1405459188) on iOS 16 and above on your iPhone.

\
**🛠️ SETUP**

- Create a new Scriptable Script by clicking on the '+' icon on the top right.
- Rename the script to your liking.
- Copy & paste [BusTimingsWidget_Public.js](https://raw.githubusercontent.com/LZXCorp/iOSBusTimings/main/BusTimingsWidget_Public.js) code into the script.
- In the script, replace the ```api_key``` with the key you got from Land Transport DataMall.

- Now, on your lockscreen, hold down on your screen until you are in edit mode.
- Click on the widgets portion of the lockscreen and put in a new Scriptable Widget.
- Select your Bus Timings script and input the parameters.
- Parameter Format: Parameter Format: ```<label>,<bus stop id>,<bus service>``` (Note: Do **not** leave any spacing between the parameters)

## ACRYONYMS

**DECK INFO**

- **S** - Single Decker
- **D** - Double Decker
- **B** - Bendy

\
**ARRIVAL INFO**

- **A** - Arrived
- **L** - Left

\
**BUS LOAD (TO BE ADDED)**
- **L** - Low Load (Seats Available)
- **M** - Medium Load (Standing Available)
- **H** - High Load (Limited Standing)

## ⚠️ LIMITATIONS ⚠️
- The widget is only designed for iPhone devices.
- The text might be too small and unreadable for some users.
- The updating rate of the widget ranges from 30 secs to 5 mins, making it unreliable.
- Sometimes Scriptable stops updating the widget, requiring a restart.

## WORKING ON

From the November 2023 Patch,
- [x] **BUG** - Error occurs when the service stops running, a message will be shown instead stating that service has ended.
- [x] **QOL** - Shows an error message indicating which part of the parameter is in need of modifying.

\
Still working on,
- [ ] **LIMIT** - Label limitation of 11 characters.
- [ ] **QOL** - Shows the last updated time of the widget.

\
Not-started-on features,
- [ ] **FEATURE** - Ability through parameters to change what information is shown at the bottom. (I.e. instead of showing type of bus, it will show the bus load.)

\
A simple project made by LZX.
