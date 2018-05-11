import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Form,
  Item,
  Input,
  View
} from "native-base";
import { NavigationActions } from "react-navigation";
import firebaseApp from '../Firebase';
import Account from '../components/Account';

export default class AddAccountScreen extends Component {
  constructor () {
    super();
    this.state = {
          name:''
    }
  }

nameTextHandler = val => {
    this.setState({
      name: val
    })
}

addAccountHandler=()=>{
  if(this.state.name.length>0)
  this.props.screenProps.addNewAccount(this.state.name);
}

render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Add new account</Title>
          </Body>
        </Header>
<Content>
<Form>
<Item last>
<Input placeholder="Input account name"
autoFocus={true}
onChangeText={this.nameTextHandler}
value={this.state.newAccName}
/>
</Item>
<View style={styles.container}>
  <Button
    onPress={this.addAccountHandler}>
    <Text>Create new account</Text>
  </Button>
</View>
</Form>

<ScrollView>
{
this.props.screenProps.accounts.map(account =>
<Account
account={account}
key={account.id}
/>
      )
    }
</ScrollView>
</Content>
</Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 72,
    borderWidth: 0.5,
    borderColor: 'lightgray'
  }
})
