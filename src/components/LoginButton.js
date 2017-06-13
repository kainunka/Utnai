import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginButton extends Component {
  render() {

    return (
      <TouchableOpacity 
        style={[ styles.transparentButton, { borderColor: this.props.color } ] }
        onPress={ this.props.login } 
       >
        <View style={styles.inline}>
            <Icon name={ this.props.icon } size={30} color={ this.props.color } />
            <Text style={[styles.buttonBlueText, styles.buttonBigText, { color: this.props.color }]}>  { this.props.status } </Text> 
            <Text style={[styles.buttonBlueText, { color: this.props.color }]}> { this.props.social }</Text>
        </View>
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    transparentButton: {
        padding: 8,
        borderWidth: 2,
        width: 310,
        marginTop: 10
    },
    buttonBlueText: {
        fontSize: 20,
    },
    buttonBigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inline: {
        flexDirection: 'row'
    },
});
