import NetInfo from "@react-native-community/netinfo";
import { AsyncStorage } from "react-native";


export const isConntectedAtHome = () => {
    if(getWifi() == fetchWifiSSID()){
        return true;
    } else {
        return false;
    }
}

function getWifi() {
    if(checkStoredSSID() != null){
        // Wifi already in database
        return checkStoredSSID();
    } else {
        ssidName = fetchWifiSSID();
        // function that saves data asyncronously
        _storeData = async (ssidName) => {
            try {
                await AsyncStorage.setItem('ssid', ssidName);
            } catch (error) {
                console.log("An unknown error appeared while saving the SSID.");
            }
        }
    }   
}

function fetchWifiSSID() {
    try {
        NetInfo.fetch("wifi").then(state => {
            return state.details.ssid;
        });
    } catch (error) {
        console.log("An unknown error appeared while fetching the wifi.");
        return null;
    }
}

function checkStoredSSID() {
    // fetch the data back asyncronously
    _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('ssid');
                if (value !== null) {
                    console.log("Fetched SSID successfully.");
                    return value;
                } else {
                    return null;
                }
            } catch (error) {
                console.log("An unknown error appeared while catching the SSID.");
                return null;
            }
        }
}
