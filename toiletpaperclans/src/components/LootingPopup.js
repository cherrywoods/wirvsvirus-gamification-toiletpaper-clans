import React, { Component } from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity } from 'react-native';
 
export default class LootingPopup extends Component {
 constructor(props) {
   super(props);
   this.state = {
     // Content 0: invisible, Content 1: Attack a Team!, Content 2: Got Value, Content 3: Lost Value
     content: props.content,
     value: props.value
   };
 }
 
 componentHide = () => {
   this.setState({ content: 0 });
 };
 
 render() {
   let popup
   if (this.state.content == 1) {
     popup  =  <View style={styles.popup}>
           <Text style={{fontWeight: "bold",fontSize: 18,color:"white"}}>ATTACK A TEAM!</Text>
           <View style={{flexDirection:"row",justifyContent:"center"}}>
           <Image style={{
            width: 35,
            height: 35,
            resizeMode: 'contain'}}
          source={{
            uri:
              'https://media.discordapp.net/attachments/690844505821151263/691015836021948434/sanduhr.png',
          }}
        />
           <Text style={{color:"white",fontSize: 18,marginTop:4}}>300 Minutes</Text>
           </View>
 
           <TouchableOpacity style={styles.button} onPress={this.componentHide}>
             <Text style={{fontWeight: "bold",fontSize:18}}>LOOT THEM!</Text>
           </TouchableOpacity>
         </View>
   } 
   if (this.state.content == 2) {
     popup  =  <View style={styles.popup}>
           <Text style={{fontWeight: "bold",fontSize: 18,color:"white"}}>GRATULATION!</Text>
           <View>
           <Image style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'}}
          source={{
            uri:
              'https://media.discordapp.net/attachments/690844505821151263/690972885275115641/Paper.png',
          }}
        />
           <Text style={{color:"#db9f44",fontSize: 30,fontWeight: "bold",marginTop:-33,marginLeft:-17,position:"relative"}}>+{ this.state.value }</Text>
           </View>
 
           <TouchableOpacity style={styles.button} onPress={this.componentHide}>
             <Text style={{fontWeight: "bold",fontSize:18}}>COLLECT IT!</Text>
           </TouchableOpacity>
         </View>
       
   } 
   if (this.state.content == 3) {
     popup  =  <View style={styles.popup}>
           <Text style={{fontWeight: "bold",fontSize: 18,color:"white"}}>THINGS MISSED UP!</Text>
           <View>
           <Image style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'}}
          source={{
            uri:
              'https://media.discordapp.net/attachments/690844505821151263/690972885275115641/Paper.png',
          }}
        />
           <Text style={{color:"#db9f44",fontSize: 30,fontWeight: "bold",marginTop:-33,marginLeft:-17,position:"relative"}}>-{this.state.value}</Text>
           </View>
 
           <TouchableOpacity style={styles.button} onPress={this.componentHide}>
             <Text style={{fontWeight: "bold",fontSize:18}}>OKAY</Text>
           </TouchableOpacity>
         </View>
       
   } 
   return (
     <View style={styles.container}>
       {popup}
     </View>
   );
 }
}
 
const styles = StyleSheet.create({
 popup: {
   backgroundColor: 'red',
   height: '100%',
   width: '100%',
   alignItems: "center",
   opacity: .7,
   flex: 1,
   justifyContent: "space-around",
   flexDirection: 'column'
 },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   width: '90%',
   marginLeft: '5%',
 },
 button: {
   alignItems: 'center',
   backgroundColor: '#ffffff',
   padding: 10,
   borderRadius: 10,
 }
});
