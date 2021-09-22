import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, FlatList, TextInput, Dimensions, Button, StyleSheet, View, Text,
    TouchableOpacity, Animated, Image, ActivityIndicator,
} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import DATABASE_NAME from '../utils/config'
var db = openDatabase({ name: DATABASE_NAME });

export default function ReportScreen({ route, navigation }) {

    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [datafromDatabase, setDatafromDatabase] = useState([]);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        console.log("K________ useEffect is called");
        setLoading(true);
        getDataFromDatabase();
    }, [])


    const getDataFromDatabase = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_user',
                [],
                (tx, results) => {
                    console.log("K________ 1", tx);
                    console.log("K________ 2", results);
                    console.log("K________  results.rows.length", results.rows.length);
                    var temp = [];

                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                        setDatafromDatabase(temp);
                        if (results.rows.length >= 1) {
                            setEmpty(false);
                        } else {
                            setEmpty(true)
                        }
                        console.log('item', temp)
                    }
                }
            );
        });
        console.log("K_________66 _________ setDatafromDatabase  ", datafromDatabase);
        setLoading(false);
    }

    renderRow = ({ index, item }) => {
        return (
            <View style={styles.itemRow}>
                <Text style={styles.itemText}> {++index}). {item.low_Bp}/{item.high_Bp} {item.sugar} {item.recordDate} </Text>
            </View>
        )
    }

    const emptyMSG = () => {
        console.log("fdsjkfhdksdfhfds   emptyMSG =============== ");
        return (
          <View style={{backgroundColor:'red', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
    
            <Text style={{ fontSize: 25, textAlign: 'center' }}>
              No Record Inserted Database is Empty...
              </Text>
    
          </View>
        );
      }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

         
            {/* {loading ?
                <Text>In Progress...............</Text>
                : */}
                <FlatList
                    style={styles.container}
                    numColumns={2}
                    // data={datafromDatabase.length ==0? emptyMSG : datafromDatabase}
                    data={datafromDatabase}
                    renderItem={renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    // refreshing={loading}
                // onRefresh={getDataFromDatabase}
                />
            {/* } */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f5fcff'
    },
    itemRow: {
        flex: 1,
        width: '100%',
        // borderBottomColor: '',
        marginBottom: 5,
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 16,
        padding: 2
    },
    loader: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});