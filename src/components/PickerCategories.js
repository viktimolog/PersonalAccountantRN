import React, {Component} from 'react';
import {Picker, Dimensions} from "react-native";
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

export default class PickerCategories extends Component {
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

    loadCategories = () => {
        return this.props.categoriesTransactions.map(category => (
            <Picker.Item
                label={'category:  ' + category.name}
                value={category.name}
                key={category.id}
            />
        ))
    }

    getWidth = () => {
        return {
            width: this.state.width
        }
    }

    render() {
        return (
            <View style={this.getWidth()}>
                <Picker
                    selectedValue={this.props.selectedCat}
                    style={{height: 55}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.setSelectedCat(itemValue)
                    }>
                    {this.loadCategories()}
                </Picker>
            </View>
        );
    }
}
