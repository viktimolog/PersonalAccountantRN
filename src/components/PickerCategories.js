import React, { Component } from 'react';
import { Picker } from "react-native";
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

loadCategories=()=> {
return this.props.categoriesTransactions.map(category => (
     <Picker.Item
      label={'category:  '+category.name}
       value={category.name}
       key={category.id}
        />
  ))
}

  render() {
    return (
      <Container>
    <View>
    <Picker
      selectedValue={this.props.selectedCat}
      style={{ height: 50, width: 360 }}
      onValueChange={(itemValue, itemIndex) =>
        this.props.setSelectedCat(itemValue)
      }>
      {this.loadCategories()}
    </Picker>
    </View>
      </Container>
    );
  }
}
