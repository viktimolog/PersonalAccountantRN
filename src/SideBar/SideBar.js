import React, {Component} from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

const routes = ["LoginScreen", "AccountScreen", "AddAccountScreen","AddCategoryScreen"];

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            square
            style={{
              height: 120,
              width: '100%',
              position: "absolute",
              alignSelf: "center",
              // top: 20
            }}
            source={require('../../assets/logo.png')}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>
                  {data}
                  </Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
