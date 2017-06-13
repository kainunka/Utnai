import {
  AppRegistry
} from 'react-native';


const BackgroundGeolocationHeadlessService = async (event) => {
    // do stuff

     console.log('BackgroundGeolocationHeadlessService: '+ event);
  
    switch (event.name) {
        case 'boot':
            break;
        case 'terminate':
            break;
        case 'heartbeat':
            break;
        case 'motionchange':
            break;
        case 'location':
            break;
        case 'geofence':
            break;
        case 'http':
            break;
        case 'schedule':
            break;
        case 'activitychange':
            break;
        case 'providerchange':
            break;
        case 'geofenceschange':
            break;
    }
};

AppRegistry.registerHeadlessTask('BackgroundGeolocation', () => BackgroundGeolocationHeadlessService);