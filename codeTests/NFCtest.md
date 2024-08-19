// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container_center}>
//       <Text style={styles.title}>First test in React Native</Text>
//     </View>
//   )
// }
//
// const styles = StyleSheet.create({
//   container_center: {
//     backgroundColor: 'blue',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
//
// })


//     const hasSupportNfc = async () => {
//         const supported = await nfcManager.isSupported()
//         if (!supported) {
//             console.log("its not supported")
//             setTimeout(() => {
//                 set
//             })
//             return
//         }
//         await nfcManager.start()
//         readNdef()
//     }
//
//     const readNdef = () => {
//         let tag: TagEvent | null
//         try {
//             await nfcManager.requestTechnology(NfcTech.Ndef)
//             tag = await nfcManager.getTag()
//             if (tag) {
//                 const status = await nfcManager.ndefHandler.getNdefStatus()
//                 if(Platform.OS = "ios") {
//                     await nfcManager.setAlertMessageIOS("TAG DETECTED...")
//                     console.log(tag, status)
//                 }
//             }
//         } catch (ex) {
//             console.log(ex)
//         } finally {
//             nfcManager.cancelTechnologyRequest()
//         }
//     }