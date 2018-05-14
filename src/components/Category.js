import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Category extends Component {
    render() {
        return (
            <Text>
                {this.props.category.name}
            </Text>
        )
    }
}
