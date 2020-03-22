import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const ScoreTableHeading = ({}) => (
    <View style={styles.row}>
        <View style={[styles.row1Element, styles.row1ElementTop]}>
            <Image
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginTop: 20,
                }}
                source={require('_assets/icons/Pokal.png')}
            />
        </View>
        <View style={styles.row2Element}>
            <Image
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginTop: 20,
                }}
                source={require('_assets/icons/Paper.png')}
            />
        </View>
        <View style={[styles.row3Element, styles.row3ElementTop]}>
            <Image
                style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginTop: 20,
                }}
                source={require('_assets/icons/group.png')}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row1Element: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginRight: 7,
    },
    row1ElementTop: {
        borderTopLeftRadius: 10,
    },
    row2Element: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    row3Element: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 7,
    },
    row3ElementTop: {
      borderTopRightRadius: 10,
    },
});

export default ScoreTableHeading;
