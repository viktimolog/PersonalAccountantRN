import React, {Component} from 'react';
import {StyleSheet, Picker, Dimensions} from "react-native";
import {
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Left,
    Right,
    Icon,
    Title,
    Input,
    InputGroup,
    Item,
    Tab,
    Tabs,
    Footer,
    FooterTab,
    Label,
    View
} from "native-base";

export default class PickerAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        };
    }

    handlerOrientation = () => {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        });
    }

    componentWillMount() {
        Dimensions.addEventListener('change', this.handlerOrientation);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.handlerOrientation);
    }

    loadAccounts = () => {
        return this.props.accounts.map(account => (
            <Picker.Item
                label={account.name + ', sum = ' + account.sum}
                value={account.name}
                key={account.id}
            />
        ))
    }

    getWidthMargin = () => {
        let margin = this.state.height < this.state.width
            ? -160
            : -80
        return {
            marginLeft: margin,
            width: this.state.width - 40
        }
    }

    render() {
        return (
            <View style={this.getWidthMargin()}>
                <Picker
                    style={styles.picker}
                    selectedValue={this.props.selectedAcc}
                    onValueChange={(itemValue) =>
                        this.props.setSelectedAcc(itemValue)}
                >
                    {this.loadAccounts()}
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        color: 'white',
        height: 55
    }
});
