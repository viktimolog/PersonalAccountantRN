import React, {Component} from "react";
import AllTransactions from "./AllTransactions.js";
import Expenses from "./Expenses.js";
import Incomes from "./Incomes.js";
import {TabNavigator} from "react-navigation";
import {NavigationActions} from "react-navigation";
import {
    Button,
    Text,
    Icon,
    Item,
    Footer,
    FooterTab,
    Label,
    Container,
    View
} from "native-base";

const MainScreenNavigator = TabNavigator(
    {
        AllTransactions: {screen: props => <AllTransactions {...props}/>},
        Expenses: {screen: props => <Expenses {...props} />},
        Incomes: {screen: props => <Incomes {...props} />}
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("AllTransactions")}
                        >
                            <Icon name="bowtie"/>
                            <Text>All</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("Expenses")}
                        >
                            <Icon name="headset"/>
                            <Text>Expenses</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("Incomes")}
                        >
                            <Icon name="briefcase"/>
                            <Text>Incomes</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    },
);

export default class MyTab extends Component {
    render() {
        return (
            <MainScreenNavigator
                screenProps={
                    {
                        navigation: this.props.navigation,
                        userId: this.props.screenProps.userId,
                        categoriesTransactions: this.props.screenProps.categoriesTransactions,
                        transactions: this.props.screenProps.transactions,
                        accounts: this.props.screenProps.accounts,
                        addNewTransaction: this.props.screenProps.addNewTransaction,
                        getIDSelectedAcc: this.props.screenProps.getIDSelectedAcc,
                        selectedAcc: this.props.screenProps.selectedAcc,
                        selectedCat: this.props.screenProps.selectedCat,
                        setSelectedAcc: this.props.screenProps.setSelectedAcc,
                        setSelectedCat: this.props.screenProps.setSelectedCat,
                        authorization: this.props.screenProps.authorization,
                        error: this.props.screenProps.error,
                        email: this.props.screenProps.email,
                        setInitialState: this.props.screenProps.setInitialState
                    }
                }
            />
        );
    }
}
