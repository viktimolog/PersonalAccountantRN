import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Transaction extends Component {

render() {
          return (
            <View style={styles.container}>
              <Text style={styles.text}>{this.props.transaction.date.toLocaleString()}</Text>
              <Text style={styles.text}>Type: {this.props.transaction.type}</Text>
              <Text style={styles.text}>Category: {this.props.transaction.name}</Text>
              <Text style={styles.text}>Sum: {this.props.transaction.sum}</Text>
              <Text style={styles.text}>Description: {this.props.transaction.description}</Text>
            </View>
                  )
          }
    }

    const styles = StyleSheet.create({
        container: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1
            // alignItems: 'center',
            // flexDirection: 'row',
            // height: 72
        },
        text: {
            fontSize: 16,
            color: 'black'
        }
    });
