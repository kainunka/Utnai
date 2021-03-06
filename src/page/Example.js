import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Example extends Component {
  static navigationOptions = {
    title: 'Example'
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <View style={styles.container}>
        <Text>Example</Text>
      </View>
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
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  instructions: { textAlign: "center", color: "#333333", marginBottom: 5 }
});

export default Example;
