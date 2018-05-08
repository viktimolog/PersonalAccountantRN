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

handleExpense=()=>{
  this.props.setTypeTransaction('expense');
}

handleIncome=()=>{
  this.props.setTypeTransaction('income');
}

  render() {
    return (
      <View style = {{position: 'absolute', left: 0, right: 0,bottom: 50}}>
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
