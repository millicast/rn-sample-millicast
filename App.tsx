import {Director, View as MillicastView} from '@millicast/sdk';
import {useEffect, useState, useRef} from 'react';
import {RTCView} from 'react-native-webrtc';
import KeepAwake from 'react-native-keep-awake';
import {View} from 'react-native';

const App = () => {
  const streamName = 'multiview';
  const streamAccountId = 'k9Mwad';

  const [streamURL, setStreamURL] = useState<string>();
  const millicastViewRef = useRef<MillicastView>();

  function changeKeepAwake(shouldBeAwake) {
    if (shouldBeAwake) {
      KeepAwake.activate();
    } else {
      KeepAwake.deactivate();
    }
  }

  useEffect(() => {
    const subscribe = async () => {
      const tokenGenerator = () =>
        Director.getSubscriber({
          streamName,
          streamAccountId,
        });

      // Create a new instance
      const millicastView = new MillicastView(streamName, tokenGenerator);
      millicastViewRef.current = millicastView;

      // Set track event handler to receive streams from Publisher.
      millicastView.on('track', event => {
        const videoUrl = event.streams[0].toURL();
        if (videoUrl) {
          setStreamURL(videoUrl);
        }
      });

      try {
        await millicastView.connect();
      } catch (e) {
        console.log('Connection failed. Reason:', e);
      }
    };
    subscribe();
    changeKeepAwake(true);
    const unsubscribe = async () => {
      if (millicastViewRef.current != null) {
        millicastViewRef.current.webRTCPeer?.stopStats();
        await millicastViewRef.current.stop();
        changeKeepAwake(false);
      }
    };

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <RTCView streamURL={streamURL} style={{flex: 1, zIndex: 1}} />
    </View>
  );
};

export default App;
