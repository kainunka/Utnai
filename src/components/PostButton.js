import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class PostButton extends Component {
  render() {
    return (
      <TouchableOpacity style={ styles.postButton }>
        <View style={styles.inline}>
            <Image source={{ uri: 'https://graph.facebook.com/'+this.props.cover+'/picture?type=small' }} style={ styles.cover } />
            <Text style={ styles.buttonText }>  { this.props.title } </Text> 
        </View>
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    postButton: {
        padding: 8,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#F5F5F5'
    },
    cover: {
        width: 40,
        height: 40  
    },
    buttonText: {
        fontSize: 15
    },
    inline: {
        flexDirection: 'row'
    },
});

export default PostButton;
