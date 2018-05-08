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

export default class PickerAccounts extends Component {

loadAccounts=()=> {
  return this.props.accounts.map(account => (
     <Picker.Item
      label={account.name + ', sum = ' + account.sum}
       value={account.name}
       key={account.id}
        />
  ))
}

render() {
    return (
    <Container>
    <View>
    <Picker
      style={{
        color: 'white',
        height: 55,
        width: 320,
         marginLeft:-80
      }}
      selectedValue={this.props.selectedAcc}
      onValueChange={(itemValue, itemIndex) =>
      this.props.setSelectedAcc(itemValue) }
        >
      {this.loadAccounts()}
    </Picker>
    </View>
      </Container>
    );
  }
}
