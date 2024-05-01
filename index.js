import {AppRegistry} from 'react-native';
import App from './App';
import {registerGlobals} from 'react-native-webrtc';

import {name as appName} from './app.json';

registerGlobals();
AppRegistry.registerComponent(appName, () => App);
