import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

class Example extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                style={{ marginTop: 20 }}
                renderTabBar={() => <DefaultTabBar /> }
            >
                <Text tabLabel='Tab #1'> My  </Text>
                <Text tabLabel='Tab #2'> Favourite </Text>
                <Text tabLabel='Tab #3'> Project </Text>
            </ScrollableTabView>
        )
    }

}

/*
<View style={ styles.container }>
                    <Text style={ styles.content }>Test Tab View</Text>
                </View>
*/ 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        fontSize: 20
    }
})

export default Example;