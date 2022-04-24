import React, {useState, useEffect} from 'react';
import {View, Text, Button, Linking, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WebView} from 'react-native-webview';

const config = {
  screens: {
    Home: {
      path: 'home/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    Profile: {
      path: 'profile',
      // parse: {
      //   id: id => `${id}`,
      // },
    },
  },
};

const linking = {
  prefixes: ['demo://app'],
  config,
};

const ProfileScreen = ({navigation}) => {
  // const {
  //   params: {id},
  // } = route;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ProfileScreen Screen</Text>
      {/* {id != 1 && <Text style={styles.attributeTitle}>Deeplink id = {id}</Text>} */}
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

function HomeScreen({navigation}) {
  // const {
  //   params: {id},
  // } = route;

  const [Url, setUrl] = useState('https://reactnative.dev/docs/linking');
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(
      "https://reactnative.dev/docs/linking'",
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  useEffect(() => {
    openExternalLink();
    return () => {};
  }, [Url]);

  const openExternalLink = (url = '') => {
    const isHTTPS = url.search('https://') !== -1;

    if (isHTTPS) {
      console.log(true);
    } else {
      if (url.startsWith('test://')) {
        this.props.navigation.navigate('Home');
      }
      console.log(false);
    }
  };
  return <WebView source={{uri: Url}} />;
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
