/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {  ListItem, Body } from 'native-base';
import  SQlite  from 'react-native-sqlite-storage';
let db;
export default class  StudentList extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersList : [],
    };
    db = SQlite.openDatabase(
      {
      name:'users.db',
      createFromLocation:1,
    },
      this.successToOpenDB.bind(this),
      this.failsToOpenDB

    );
  }
successToOpenDB(){
  db.transaction(tx => {
      tx.executeSql('SELECT * FROM users',[], (tx, results)=>{
        let dataLength = results.rows.length;
       // alert(dataLength);
       if (dataLength > 0){
         let helperArray = [];
         for (let i = 0; i < results.rows.length; i++){
            helperArray.push(results.rows.item(i));

         }
         this.setState({ usersList:helperArray});
       }

          });
  });

}
failsToOpenDB(err){
console.log(err);
}

  render() {
  return (
    <View style={styles.container}>
    <Text>NameList</Text>
    {this.state.usersList.map((item,index )=>{
      <ListItem >
    <Body>
      <Text>{item.name}</Text>
      <Text note>{item.location}</Text>
    </Body>
   </ListItem>
  })}
  
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
