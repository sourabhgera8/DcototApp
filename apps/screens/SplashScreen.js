import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';


export default function SplashScreen({ route, navigation }) {

    useEffect(() => {

        setInterval(() => {
              navigation.navigate('CreateRecord')
        }, 2000)

    }, [])


    return (
        <View>
            <ImageBackground
                source={require('../assets/background1.jpg')}
                style={{ width: '100%', height: '100%' }}
            >

                <Text style={{ marginTop: 45, marginBottom: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>
                    {"Save Life..."}
                </Text>

                <View style={{ marginTop: 200, justifyContent: 'center', alignItems: 'center', }}  >
                    <Image
                        style={{ width: 300, height: 500, alignItems: 'center' }}
                        resizeMode="contain"
                        source={require('../assets/background.jpg')}
                    />
                </View>



            </ImageBackground>
        </View>
    );

}