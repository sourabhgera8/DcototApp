import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, FlatList, TextInput, Dimensions, Button, StyleSheet, View, Text,
    TouchableOpacity, Animated, Image, ActivityIndicator,
} from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import DATABASE_NAME from '../utils/config'
import moment from 'moment';

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

    onListHeaderComponent = () => {
        return (
            <View style={styles.itemRowHeader}>
                <Text style={styles.itemTextSno}> {"S no"}). </Text>
                <Text style={styles.itemTextBp}> {"Low "}/{"High Bp"}  </Text>
                <Text style={styles.itemTextSugar}> {"Sugar"} </Text>
                <Text style={styles.itemTextDate}> {"Date"} </Text>
            </View>
        )
    }
    renderRow = ({ index, item }) => {
  			var myDate =  moment(item.recordDate,"YYYY-MM-DD").format("DD-MMM-YYYY");

        return (
            // <View style={styles.itemRow}>
            //     <Text style={styles.itemText}> {++index}). {item.low_Bp}/{item.high_Bp} {item.sugar} {item.recordDate} </Text>
            // </View>
						<View style={{flex: 1,
							flexDirection:'row',
							width: '95%',
							minHeight: 50,
							borderRadius:10,
							marginHorizontal:10,
							backgroundColor: item.low_Bp >100 ? 'red' : item.high_Bp >150 ? 'red' : item.sugar >180 ? 'orange' :'green',
							marginBottom: 5,
							borderBottomWidth: 1,}}>
                <Text style={styles.itemTextSno}> {++index}). </Text>
                <Text style={styles.itemTextBp}> {item.low_Bp}/{item.high_Bp}  </Text>
                <Text style={styles.itemTextSugar}> {item.sugar} </Text>
                <Text style={styles.itemTextDate}> {myDate} </Text>
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
    
            <Text style={{ fontSize: 25, textAlign: 'center' }}>
              No Record Inserted Database is Empty...
              </Text>
    
          </View>
        );
      }

    return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

				<FlatList
					style={styles.container}
					data={datafromDatabase}
					ListHeaderComponent={onListHeaderComponent}
					renderItem={renderRow}
					keyExtractor={(item, index) => index.toString()}
				/>

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
				minHeight: 50,
        // borderBottomColor: '',
        borderBottomWidth: 0.5,
				paddingBottom:100,
    },
    itemRowHeader: {
        flex: 1,
				flexDirection:'row',
				width: '95%',
				marginLeft:10,
				minHeight: 50,
        // borderBottomColor: '',
        marginBottom: 5,
        borderBottomWidth: 1,
				// backgroundColor:'red'
    },
    itemStyle: {
        // flex: 1,
				// flexDirection:'row',
        // width: '100%',
				// minHeight: 50,
        // backgroundColor:'green',
        // marginBottom: 5,
        // borderBottomWidth: 1,
    },
    itemTextSno: {
				flex: 0.7,
        fontSize: 16,
        padding: 2,
				textAlign:'center',
				paddingVertical:18,
    },
    itemTextBp: {
				flex:1.5,
        fontSize: 16,
				textAlign:'center',
				paddingVertical:18,
        padding: 2
    },
    itemTextSugar: {
				flex:1,
        fontSize: 16,
        padding: 2,
				textAlign:'center',
				paddingVertical:18,
    },
    itemTextDate: {
				flex:2,
			fontSize: 16,
        padding: 2,
				textAlign:'center',
				paddingVertical:18,
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
