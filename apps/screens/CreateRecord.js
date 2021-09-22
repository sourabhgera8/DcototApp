import React, { useState, useEffect } from 'react';
import { View,Text, TextInput,Button,Alert } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import DATABASE_NAME from '../utils/config'
import DatePicker from 'react-native-datepicker'

// var db = openDatabase({ name: 'PateintReport.db' });
var db = openDatabase({ name: DATABASE_NAME });


function CreateRecord({ route, navigation }) {

    const[lowbp, setLowbp] = useState('')
    const[highbp , setHighbp] = useState('')
    const[sugar, setSugar] = useState('')
    const [selectedDate, setSelectedDate] = useState("");


    useEffect(() => {
        createTable();
       
    }, [])

    

    
    function createTable() {
        console.log('data', db)
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.item(0));
                    console.log("hi come here");
                    if (res.rows.length == 0) {
                        console.log("hi come here");
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(record_id INTEGER PRIMARY KEY AUTOINCREMENT, low_Bp INT(3), high_Bp INT(3), sugar INT(3), recordDate VARCHAR(100))',
                            []
                        );
                    }
                }
            );
        });
    }

    const onViewReport = () => {     
        // alert(" come ")  
        navigation.push('ReportScreen')
    }
    const handleClick = () => {       
      console.log("K______", lowbp);
      console.log("K______", highbp);
      console.log("K______", sugar);
      console.log("K______", selectedDate);

      if(lowbp ===''){
        alert(' Low bp cannot be blank');
        return;
      }else if(highbp ===''){
        alert(' High Bp cannot be blank');
        return;
      }else if(sugar ===''){
        alert(' Sugar cannot be blank');
        return;
      }else if(selectedDate ==='' ){
        alert(' date cannot be blank');
        return;
      }

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (low_Bp, high_Bp, sugar,recordDate) VALUES (?,?,?,?)',
          [lowbp,highbp,sugar,selectedDate],
          (tx, results) => {
            console.log('Results_____________________ cretare', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log("hi")
              setLowbp('');
              setHighbp('');
              setSugar('');
              setSelectedDate('');
              Alert.alert(
                'Success',
                'You are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.push('ReportScreen'),
                    // onPress: () => {alert(" 22222")}
                  },
                ],
                { cancelable: false }
              );
            } else alert('Registration Failed');
          }
        );
      });
    }


    return(
         <View style={{marginTop:40}}>
            
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Low BP'}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    maxLength={50}
                    keyboardType={'numeric'}
                    placeholder={'like 80'}
                    maxLength={3}
                    value={lowbp}
                    onChangeText={text => setLowbp(text)}
                    defaultValue={lowbp}
                    secureTextEntry={false}
                />
            </View>

            
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'High BP '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    maxLength={50}
                    placeholder={'like 120'}
                    value={highbp}
                    maxLength={3}
                    onChangeText={text => setHighbp(text)}
                    defaultValue={highbp}
                    secureTextEntry={false}
                />
            </View>

            
             <View style={{ marginBottom: 20, marginHorizontal: 40 }}>
                <Text>{'Sugar '}</Text>
                <TextInput
                    style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'grey', height: 40, }}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType={'numeric'}
                    maxLength={3}
                    placeholder={'like 80 to 500'}
                    value={sugar}
                    onChangeText={text => setSugar(text)}
                    defaultValue={sugar}
                    secureTextEntry={false}
                />
            </View>

            <View style={{ padding: 10, }}>
                <DatePicker
                    style={{ marginLeft: 30 }}
                    date={selectedDate}
                    maxDate={new Date()}
                    onDateChange={(date) => { setSelectedDate(date) }}
                />
            </View>

            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                    color='#228B22'
                    title="Create record"
                    onPress={handleClick}
                    />
            </View>

            <View style={{ marginHorizontal: 40, marginTop: 30, marginVertical: 5 }}>
                <Button style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
                     color='#32CD32'
                    title="View report"
                    onPress={onViewReport}
                />
            </View>

         </View>
    );
}

export default CreateRecord