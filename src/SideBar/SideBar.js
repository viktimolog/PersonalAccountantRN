import React, {Component} from "react";
import {AppRegistry, Image, StatusBar, StyleSheet} from "react-native";
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon,
    View
} from "native-base";

const routes = [
    {
        name: 'Log In - Log Out',
        route: 'LoginScreen'
    },
    {
        name: 'Accounts - Transactions',
        route: 'AccountScreen'
    },
    {
        name: 'Add new account',
        route: 'AddAccountScreen'
    },
    {
        name: 'Add new category',
        route: 'AddCategoryScreen'
    }
];

export default class SideBar extends Component {
    render() {
      if(this.props.screenProps.authorization)
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
                        }}
                        source={require('../../assets/logo.png')}
                    />
                    <List
                        dataArray={routes}
                        contentContainerStyle={{marginTop: 120}}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data.route)}
                                >
                                    <Text>
                                        {data.name}
                                    </Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
        return(
          <View style={styles.container}>
              <Text>Log In, please!</Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    }
})
