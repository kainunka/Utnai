import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { mapStateToProps } from '../actions/const.action';

class MapViews extends Component {
  constructor(props) {
    super(props);

    const { onLocationLat, onLocationLong } = this.props.const;

    this.state = {
      markers: [{
        key: '#1',
        title: 'Hello User Utnai',
        description: 'Test Marker',
        coordinates: {
          latitude: onLocationLat,
          longitude: onLocationLong
        },
      }],
    }
  }

  render() {
     const { onLocationLat, onLocationLong } = this.props.const;

    return ( 
     <MapView
          style={styles.map}
          initialRegion={{
              latitude: onLocationLat,
              longitude: onLocationLong,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={ marker.key }
              coordinate={ marker.coordinates }
              title={ marker.title }
              description={ marker.description }
            />
            ))}
  
        </MapView>  
    );
  }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
});

export default connect(mapStateToProps)(MapViews);
