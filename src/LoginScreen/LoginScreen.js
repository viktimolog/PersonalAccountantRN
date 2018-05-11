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
import { login, reg, exit } from '../constants';
import firebaseApp from '../Firebase';
import Loader from '../components/Loader';

export default class LoginScreen extends Component {
  constructor () {
    super();
    this.state = {
        email:'e1@test.net',
        password:'qwerty',
        // email:'',
        getUser: false
    }
  }

componentDidUpdate(){

if(this.props.screenProps.authorization)
this.props.navigation.navigate('AccountScreen');

if(this.props.screenProps.error && this.state.getUser)
this.OnOffgettingUser();
}

onExitHandler=()=>{
  this.props.screenProps.setInitialState();
}

OnOffgettingUser=()=>{
  this.setState({
    getUser: !this.state.getUser
  });
}

onLoginHandler=()=>{
this.props.screenProps.onLogin(this.state.email, this.state.password);
this.OnOffgettingUser();
}

onRegisterHandler=()=>{
this.props.screenProps.onRegister(this.state.email, this.state.password);
this.OnOffgettingUser();
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

getContent = () =>{
if(!this.props.screenProps.authorization)
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

if(this.props.screenProps.authorization)
return(
  <Form>
  <Item last>
    <Input
    value={this.props.screenProps.email}
    />
  </Item>
  <View style={styles.container}>
    <Button
      onPress={this.onExitHandler}>
      <Text>{exit}</Text>
    </Button>
  </View>
  </Form>
);
}

render() {
if(this.state.getUser)
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

return (
      <Container>
        <Header>
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
  textLoader: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
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
    flexDirection: 'row',
    height: 72,
    borderWidth: 0.5,
    borderColor: 'lightgray'
  }
})
