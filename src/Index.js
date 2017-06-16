import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { mapStateToProps,  mapDispatchToProps} from './actions/const.action';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import BackgroundGeolocation from "react-native-background-geolocation";
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MapViews from './page/MapViews';
import Profile from './page/Profile';
import Feed from './page/Feed';
import ProgressBar from './_global/ProgressBar';


class Index extends Component {
  static navigationOptions = () => ({
    title: 'Utnai ::: Welcome ' ,
    headerLeft: (<Image source={ require('./img/android/drawable-ldpi.png') } style={{ marginLeft: 10, marginRight: 10 }}  />),
    headerRight: <TouchableOpacity  onPress={() => alert('About us') }><Text style={{ marginRight: 10, color: '#ffffff', opacity: 0.5 }}>About</Text></TouchableOpacity>,
    headerStyle: {
       backgroundColor: '#01579B', 
       elevation: null
    },
    headerTintColor: "#ffffff",
    
  });

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

    const { onLocationLat, onLocationLong } = this.props.const;

    this.state = {
      index: 0,
      routes: [
        { key: '1', icon: 'md-map' },
        { key: '2',  icon: 'md-paper' },
        { key: '3',  icon: 'md-person' }
      ],
      isLoading: true
    }
  }


  logout() {
    const { CHECK_LOGIN, USER_PROFILE } = this.props;
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userProfile');
    AsyncStorage.removeItem('picture');
    AsyncStorage.getItem('token').then((logout) => {
          if (!logout) {
            CHECK_LOGIN(false);
          }        
    }); 
  }

  _handleChangeTab = index => this.setState({ index })
  _renderIcon = ({ route }: any) => { return <Icon name={ route.icon } size={20} color='#757575' />;  }
  _renderHeader = props => <TabBar { ...props } style={{ backgroundColor: '#ffffff' }} renderIcon={ this._renderIcon }  />;

  FirstRoute = () =>  { return  <MapViews />; }
  SecondRoute = () => { 
    const { userProfile } = this.props.const;
    return <Feed imageFacebook={userProfile.id} />;
  }
  ThirdRoute = () => { return <Profile />; }
  
  _renderScene = SceneMap({
      '1': this.FirstRoute,
      '2': this.SecondRoute,
      '3': this.ThirdRoute
  })
  
  componentWillMount() {
    AsyncStorage.getItem('token').then((getToken) => {
        console.log(getToken);
    });
    BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this));
		this._retrieveIndex();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.const.onLocationLat && nextProps.const.onLocationLong) {
			this.setState({ isLoading: false });
		}
	}

   async _retrieveIndex() {
    const { onLocationLat, onLocationLong } = this.props.const;
    const { ON_LOCATION_LAT, ON_LOCATION_LONG, USER_PROFILE } = this.props;

    try {
      await AsyncStorage.getItem('userProfile').then((getProfile) => {
        USER_PROFILE(JSON.parse(getProfile));
      }); 
    } catch (error) {
      console.log('Error: = ' + error);  
    }
    

    BackgroundGeolocation.on('location', (location, taskId) => {
       var coords    = location.coords,
          timestamp   = location.timestamp
          latitude    = coords.latitude,
          longitude   = coords.longitude,
          speed       = coords.speed;
       ON_LOCATION_LAT(latitude);
       ON_LOCATION_LONG(longitude);
       BackgroundGeolocation.finish(taskId);
 
    });
    BackgroundGeolocation.on('error', this.onError);
    BackgroundGeolocation.on('motionchange', (location) => {
      ON_LOCATION_LAT(location.location.coords.latitude);
      ON_LOCATION_LONG(location.location.coords.longitude);
    });
    BackgroundGeolocation.on('activitychange', this.onActivityChange);
    BackgroundGeolocation.on('providerchange', this.onProviderChange);
    BackgroundGeolocation.configure({
      // Geolocation Config
    
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 1,
      locationUpdateInterval: 1000,
      fastestLocationUpdateInterval: 10000,
      heartbeatInterval: 60 * 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?",
        "latitude": onLocationLat,
        "longitude": onLocationLong
      },

    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  goBack() {
    try {
       this.props.navigation.goBack();
    } catch(error) {
      console.log('error' + error);
    }

    return false;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this));
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    ok: "YES",
    cancel: "NO"
    }).then(function(success) {        
       console.log("LOCATION STATUS OPEN");   
      }.bind(this)
    ).catch((error) => {
        console.log(error.message);
    });
  }

  componentWillUnMount() {
    const { ON_LOCATION_LAT, ON_LOCATION_LONG } = this.props;

    BackgroundGeolocation.un('location', (location) => {
       ON_LOCATION_LAT(location.coords.latitude);
       ON_LOCATION_LONG(location.coords.longitude);
    });
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', (location) => {
      ON_LOCATION_LAT(location.location.coords.latitude);
      ON_LOCATION_LONG(location.location.coords.longitude);
    });
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }
  onError(error) {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  }
  onActivityChange(activityName) {
    console.log('TESTSS5', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('TESTSS6', provider.enabled);    
  }


  render() {
    return (
      this.state.isLoading ? <View style={ styles.progressBar }><ProgressBar /></View> : 
      <View style={ styles.container } >
         <TabViewAnimated
          style={ styles.tabView }
          navigationState={ this.state }
          renderScene={ this._renderScene }
          renderHeader={ this._renderHeader }
          onRequestChangeTab={ this._handleChangeTab }
         />
      </View>
      
    );
  }
}


/*
 <Button
    onPress={ () => this.props.navigation.navigate('Example') }
    title="Go to Example"
  />
*/ 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    flex: 1
  },
  tabView: {
    flex: 1
  },
  actionButton: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
   progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
