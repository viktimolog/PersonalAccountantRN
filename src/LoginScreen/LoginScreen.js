import React, {Component} from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
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
import { login, reg, exit, next } from '../constants';
import firebaseApp from '../Firebase';

export default class LoginScreen extends Component {
  constructor () {
    super();
    // this.onLogin = this.onLogin.bind(this);
    // this.onRegister = this.onRegister.bind(this);

    this.state = {
        // userId: null,
        email:'q10@test.net',
        password:'qwerty'
    }
  }



next=()=>{

this.props.navigation.navigate('AccountScreen', {
  userId: this.state.userId
});

  }


exit=()=>{
  this.setState({
    authentication: false
  });
}


onLoginHandler=()=>{

this.props.screenProps.onLogin(this.state.email, this.state.password);
this.next();

}

onRegisterHandler=()=>{
  this.props.screenProps.onRegister(this.state.email, this.state.password);
  this.onLoginHandler();
}

emailTextHandler = val => {
    this.setState({
      email: val
    })
}

passwordTextHandler = val => {
  this.setState({
    password: val
  })
}


test=()=>{
  alert('This is the test from LoginScreen');
}

testPropsFromIndex=()=>{//ok working
  // this.props.screenProps.test2();
  alert(this.props.screenProps.userId);
}

getContent = () =>{
if(!this.state.authentication)
return(
  <Form>
  <Item>
    <Input
    placeholder="Email"
    autoFocus={true}
    onChangeText={this.emailTextHandler}
    value={this.state.email}
    />
  </Item>
  <Item last>
    <Input placeholder="Password"
    onChangeText={this.passwordTextHandler}
    value={this.state.password}
    />
  </Item>
  <View style={styles.container}>
    <Button
      onPress={this.onLoginHandler}>
      <Text>{login}</Text>
    </Button>
    <Button
      onPress={this.onRegisterHandler}>
      <Text>{reg}</Text>
    </Button>
  </View>
  </Form>
);

return(
  <Form>
  <Item last>
    <Input

    value={this.state.email}
    />
  </Item>
  <View style={styles.container}>
    <Button
      onPress={this.exit}>
      <Text>{exit}</Text>
    </Button>
  </View>
  </Form>
);
}

render() {
    return (
      <Container>
        <Header>
      {  /*  <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>*/}
          <Body>
            <Title style={styles.textTitle}>Login Screen</Title>
          </Body>
        </Header>
<Content>
{this.getContent()}
</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    alignSelf: 'center'
  },
  addButton: {
    // backgroundColor: 'green',
    // width: 50,
    // height: 50,
    // borderRadius: 50,
    // borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
    // marginBottom: 96,
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
