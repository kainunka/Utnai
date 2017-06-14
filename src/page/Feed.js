import React, { Component } from 'react';
import {
  RefreshControl,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import ProgressBar from '../_global/ProgressBar';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../actions/feed.action';
import PostButton from '../components/PostButton';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false
    }

    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillMount() {
		this._retrieveFeedData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.feed.feedData) {
			this.setState({ isLoading: false });
		}
	}

  _retrieveFeedData(isRefreshed) {
    this.props.FEED_DATA('1');
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true
    })
    this._retrieveFeedData('isRefreshed');
  }

  render() {
    const { feedData } = this.props.feed;
    const { isLoading, isRefreshing } = this.state; 
    const { imageFacebook, } = this.props;
    return (
       isLoading ? <View style={ styles.progressBar }><ProgressBar /></View> : 
       <ScrollView
          style={ styles.refresh }
          refreshControl= {
            <RefreshControl
              refreshing={ isRefreshing }
              onRefresh={ this._onRefresh }
              colors={['#01579B']}
              tintColor='white'
              title='loading...'
              titleColor='white'
              progressBackgroundColor='white'
            />
          }>
        <View>
          <PostButton cover={ imageFacebook } title='Post Status' />
        </View> 
      </ScrollView> 
 
    );
  }
}


const styles = StyleSheet.create({
  button: { padding: 20, backgroundColor: "#ccc", marginBottom: 10 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  refresh: {
    backgroundColor: '#ffffff'
  },
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  instructions: { textAlign: "center", color: "#333333", marginBottom: 5 },
  progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(Feed);
