import {Director, View as MillicastView} from '@millicast/sdk';
import {useEffect, useState, useRef} from 'react';
import {RTCView} from 'react-native-webrtc';
import {View, Text} from 'react-native';
import InCallManager from 'react-native-incall-manager';

const App = () => {
  const [stats, setStats] = useState<string>();
  const [streamURL, setStreamURL] = useState<string>();
  const millicastViewRef = useRef<MillicastView>();
  const streamName = `${process.env.STREAM_NAME}`;
  const streamAccountId = `${process.env.ACCOUNT_ID}`;

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
        InCallManager.start({media: 'video'});
        InCallManager.setKeepScreenOn(true);
        await millicastView.connect();

        millicastView.webRTCPeer?.initStats();

        // Capture new stats from event every second
        millicastView.webRTCPeer?.on('stats', statistics => {
          const statisticsString = JSON.stringify(statistics, null, '  ');
          console.log(statisticsString);
          setStats(statisticsString);
        });
      } catch (e) {
        console.log('Connection failed. Reason:', e);
      }
    };
    subscribe();
    const unsubscribe = async () => {
      if (millicastViewRef.current != null) {
        millicastViewRef.current.webRTCPeer?.stopStats();
        await millicastViewRef.current.stop();
        InCallManager.stop();
        InCallManager.setKeepScreenOn(false);
      }
    };

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <RTCView streamURL={streamURL} style={{flex: 1, zIndex: 1}} />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          width: 200,
          height: 350,
          backgroundColor: 'black',
          zIndex: 1000,
          opacity: 0.9,
        }}>
        <Text style={{color: 'white', fontSize: 6}}>{stats}</Text>
      </View>
    </View>
  );
};

export default App;
