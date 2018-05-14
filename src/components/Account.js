import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Account extends Component {
    render() {
        return (
            <Text style={{color: 'red'}}>
                {`${this.props.account.name} sum = ${this.props.account.sum}`}
            </Text>
        )
    }
}
