# FakeStore

Please note only android version works at this moment.
## Building Android:
Add `ocal.properties` under `android` folder. It should contain path to your jdk eg:
```
sdk.dir=~/Library/Android/sdk
```
Open simulator or connected device and run command:
```
adb reverse tcp:8081 tcp:8081
```
On root project directory run:
```
yarn && yarn android
```

## Testing:
To run jest tests run following command:
```
yarn test
```
To update jest snupshots run:
```
yarn test -u
```

## Road map

- Presistant storage native module on iOS - use UserDefaults.
- Jest tests for all views
- Remove from cart
- network context - control whenever device is online
- call add remove cart endpoints
- Code Optimisations:
	- use type templates for get and post in api,
	- clean views - eg. create shared add remove item with counter.