import React from "react";
import { AppRegistry, View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";
import Fab from "../components/Fab.js";
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
  Form
} from "native-base";

import PickerAccounts from '../components/PickerAccounts';
import PickerCategories from '../components/PickerCategories';
import Transaction from '../components/Transaction';
import Loader from '../components/Loader';

export default class AllTransactions extends React.Component {

  constructor(props) {
    super(props);

  this.state = {
    income: false,
    expense: false,
    typeTransaction: null,
    description:'',
    sum: 0
    }
}

setTypeTransaction=type=>{
  this.setState({
    typeTransaction: type
  });
}

onSubmitTransaction=()=>{
  this.setState({
    income: false,
    expense: false,
    typeTransaction: null,
    description:'',
    sum: 0
  });
}

descriptionTextHandler = val => {
    this.setState({
      description: val
    })
}

sumTextHandler = val => {
  this.setState({
    sum: val
  })
}

onTransactionHandler = () =>{

this.onSubmitTransaction();

this.props.screenProps.addNewTransaction(
this.props.screenProps.selectedAcc, this.props.screenProps.selectedCat,
this.state.typeTransaction, this.state.sum, this.state.description)
}

onCancelHandler= () =>{
  this.onSubmitTransaction();
}

render() {

// alert('render of AllTransactions');

// alert('selectedAcc in AllTransactions render = '+this.state.selectedAcc);

// alert(this.props.screenProps.authorization);


if(!this.props.screenProps.authorization)
return(
  <Container>
    <Header>
      <Body>
<Text
style={styles.textLoader}
>
Please wait while data is loading
</Text>
      </Body>
    </Header>
<Loader/>
</Container>
);

else if(this.state.typeTransaction===null)
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.screenProps.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
              <PickerAccounts
              accounts={this.props.screenProps.accounts}
              selectedAcc={this.props.screenProps.selectedAcc}
              setSelectedAcc={this.props.screenProps.setSelectedAcc}
              />
          </Body>
        </Header>

<View style={{marginBottom: 100}}>
<ScrollView>
    {
        this.props.screenProps.transactions
        .filter(transaction=>transaction.accountId
          ===this.props.screenProps.getIDSelectedAcc(this.props.screenProps.selectedAcc))
        .map(transaction =>
            <Transaction
                transaction={transaction}
                key={transaction.id}
              />
            )
    }
</ScrollView>

<Fab
navigation = {this.props.screenProps.navigation}
test = {this.props.screenProps.test}
test1 = {this.props.screenProps.test1}
expense = {this.expense}
testSetState = {this.props.screenProps.testSetState}
setTypeTransaction = {this.setTypeTransaction}
typeTransaction = {this.state.typeTransaction}
/>
</View>
</Container>
);

// Expense or Income
else if(this.state.typeTransaction!==null)
    return (
      <Container>
        <Header>
        <Body>
  <Text
  style={styles.textLoader}
  >
  New {`${this.state.typeTransaction}`} transaction
  </Text>
        </Body>
        </Header>
        <Content>
        <Form>
        <Item>
          <Input
          placeholder="Description"
          autoFocus={true}
          onChangeText={this.descriptionTextHandler}
          value={this.state.description}
          />
        </Item>
        <Item last>
          <Input placeholder="Sum"
          keyboardType = 'numeric'
          onChangeText={this.sumTextHandler}
          value={`${this.state.sum}`}
          />
        </Item>
      <View style={styles.container}>
          <Button
            onPress={this.onTransactionHandler}>
            <Text>Add transaction</Text>
          </Button>
          <Button
            onPress={this.onCancelHandler}>
            <Text>Cancel</Text>
          </Button>
        </View>
        <PickerCategories
        categoriesTransactions={this.props.screenProps.categoriesTransactions}
        selectedCat={this.props.screenProps.selectedCat}
        setSelectedCat={this.props.screenProps.setSelectedCat}
        />
        </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textLoader: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28
  },
  containerInput: {
    paddingLeft: '8%',
    width: '92%',
    paddingTop: 40
  },
  containerText: {
    paddingTop: 50
  },
  textCenter: {
    fontSize: 16,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    // justifyContent: 'center',
    // alignSelf:'center',
    flexDirection: 'row',
    height: 72,
    borderWidth: 0.5,
    borderColor: 'lightgray'
  }
})
