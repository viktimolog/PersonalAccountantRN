import React, { Component } from 'react';
import { Container, View, Button, Icon, Fab } from 'native-base';
import firebaseApp from '../Firebase';

export default class FAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  handleTest = () => {
      this.props.test();
  }

  handleNavigate=()=>{
    this.props.navigation.navigate("Expenses");
  }

  handleTest1 = () => {
      this.props.test1();
  }

handleExpense=()=>{
  this.props.setTypeTransaction('expense');
}

handleIncome=()=>{
  this.props.setTypeTransaction('income');
}

  render() {
    return (
      <View>
          <Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#3B5998'}}
            onPress={this.handleIncome}
            >
              <Icon name="navigate"
              style={{color: 'yellow', transform: [{ rotate: '180deg' }]}}
              />
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }}
            onPress={this.handleExpense}
            >
              <Icon name="navigate"
              style={{color: 'blue'}}
               />
            </Button>
          </Fab>
        </View>
    );
  }
}
