import React, { Component } from 'react';
import LoginScreen from './LoginScreen.js';
import AccountScreen from '../AccountScreen/index.js';
import AddAccountScreen from '../AddAccountScreen/index.js';
import AddCategoryScreen from '../AddCategoryScreen/index.js';
import SideBar from '../SideBar/SideBar.js';
import { DrawerNavigator } from 'react-navigation';
import firebaseApp from '../Firebase';

const HomeScreenRouter = DrawerNavigator(
  {
    LoginScreen: {screen: LoginScreen},
    AccountScreen: {screen: AccountScreen},
    AddAccountScreen: {screen: AddAccountScreen},
    AddCategoryScreen: {screen: AddCategoryScreen}
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)

export default class MyDrawer extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.state = {
        userId:null,
        accounts:[],
        transactions:[],
        categoriesTransactions:[],
        selectedAcc:null,
        selectedCat:null,
        authorization: false,
        error: false
  }
}

setInitialState=()=>{
  this.setState({
    userId:null,
    accounts:[],
    transactions:[],
    categoriesTransactions:[],
    selectedAcc:null,
    selectedCat:null,
    authorization: false,
    error: false
  });
}

async onRegister(email, password) {
this.setInitialState();
    try {
        await firebaseApp.auth()
            .createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((response) => {
              alert("Congratulation! Your account created!");
              firebaseApp.database().ref(response.user.uid)
                    .set({email: email});
              this.onLogin(email, password);
            })
    } catch (error) {
        alert(error.toString())
        this.setState({
          error: true
        });
    }
}

async onLogin(email, password) {
this.setInitialState();
try{
await firebaseApp.auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((response) => {
              this.getDataFromDB(response.user.uid);
            })
      } catch (error) {
          alert(error.toString())
        this.setState({
          error: true
        });
      }
}

getDataFromDB=(userId)=>{
let categoriesTransactions=[], accounts=[], transactions=[],
selectedAcc, selectedCat, promises=[];

promises.push(
  firebaseApp.database().ref(userId)
       .child('accounts')
       .once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
         const childData = childSnapshot.val();
         const id=childData.id;
         accounts.push(childData);
        });
       })
);

promises.push(
  firebaseApp.database().ref(userId)
     .child('transactions')
     .once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
       const childData = childSnapshot.val();
       const id=childData.id;
       transactions.push(childData);
      });
     })
);

promises.push(
  firebaseApp.database().ref(userId)
        .child('categoriesTransactions')
        .once("value", function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        const id=childData.id;
        categoriesTransactions.push(childData);
            });
         })
);


Promise.all(promises).then(values => {
if(selectedAcc===undefined && accounts.length>0)
selectedAcc = accounts[0].name;
if(selectedCat===undefined && categoriesTransactions.length>0)
selectedCat = categoriesTransactions[0].name;

this.setState({
  accounts: accounts,
  transactions: transactions,
  categoriesTransactions: categoriesTransactions,
  selectedAcc: selectedAcc,
  selectedCat: selectedCat,
  authorization: true,
  userId: userId,
    });
});
}

addNewTransaction = (selectedAcc, selectedCat, typeTrans, sum, description='') => {
let curAcc = this.state.accounts.filter(account => account.name === selectedAcc)[0];
if(typeTrans==='expense' && curAcc.sum<sum){
alert('Sorry, You do not have enough money on this account!');
}
else{
  let newTransaction = {
  id: Math.floor(Date.now() / 1000),
  accountId: curAcc.id,
  date:  new Date(),
  type: typeTrans,
  name: selectedCat,
  sum: sum,
  description: description
  }

let newSum;

if(typeTrans==='expense'){
  newSum = parseInt(curAcc.sum) - parseInt(sum);
}
if(typeTrans==='income'){
  newSum = parseInt(curAcc.sum) + parseInt(sum);
}
const index = this.state.accounts.indexOf(curAcc);
const changedAcc = {
    id: curAcc.id,
    name: curAcc.name,
    sum: newSum
};
let updatedArrAccounts = this.state.accounts
          .filter(account => account.id !== curAcc.id);
updatedArrAccounts.splice(index, 0, changedAcc);
firebaseApp.database().ref(this.state.userId).child('transactions')
  .push(newTransaction);
firebaseApp.database().ref(this.state.userId).child('accounts')
  .set(updatedArrAccounts);
  this.setState({
    transactions: [...this.state.transactions, newTransaction],
    accounts: updatedArrAccounts
  });
}
}

addNewAccount = name => {
const newAcc = {
   id: Math.floor(Date.now() / 1000),
   name: name,
   sum: 0,
   transactions: new Array()
 }
let newArrAccounts = [...this.state.accounts];
newArrAccounts.push(newAcc);

firebaseApp.database().ref(this.state.userId)
.child('accounts').set(newArrAccounts);

const nameNewAcc = newAcc.name;

this.setState({
  accounts: newArrAccounts,
  selectedAcc: nameNewAcc
});

}

addNewCategory = name => {
const newCat = {
  id: Math.floor(Date.now() / 1000),
   name: name
 }

firebaseApp.database().ref(this.state.userId)
.child('categoriesTransactions').push(newCat);

const nameNewCat = newCat.name;

this.setState({
  categoriesTransactions: [...this.state.categoriesTransactions, newCat],
  selectedCat: nameNewCat
});
}

getIDSelectedAcc=(selectedAcc)=>{
  let curAcc = this.state.accounts
  .filter(account => account.name === selectedAcc)[0];
   return curAcc ? curAcc.id : 0;
}

setSelectedAcc=val=>{
  this.setState({
    selectedAcc: val
  });
}

setSelectedCat=val=>{
  this.setState({
    selectedCat: val
  });
}

render() {
    return (
      <HomeScreenRouter
      screenProps={
      {
        userId: this.state.userId,
        navigation: this.props.navigation,
        categoriesTransactions: this.state.categoriesTransactions,
        transactions: this.state.transactions,
        accounts: this.state.accounts,
        selectedAcc: this.state.selectedAcc,
        selectedCat: this.state.selectedCat,
        setSelectedAcc: this.setSelectedAcc,
        setSelectedCat: this.setSelectedCat,
        onRegister: this.onRegister,
        onLogin: this.onLogin,
        addNewCategory: this.addNewCategory,
        addNewAccount: this.addNewAccount,
        getIDSelectedAcc: this.getIDSelectedAcc,
        addNewTransaction: this.addNewTransaction,
        authorization: this.state.authorization,
        error: this.state.error,
        setInitialState: this.setInitialState
      }
    }
    />
  );
  }
}
