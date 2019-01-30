import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity

} from 'react-native';
import { Icon } from 'native-base';
import { Subscribe } from 'unstated';
import PureChart from 'react-native-pure-chart';
import StateContainer from '../state/StateContainer';

// const profile = {
//     username: "utarit",
//     points: 140,
//     studyGroup: 'CengoTayfa',
//     studyHistory: {}
// }


function isEarly(a, b) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec']
    const index_a = months.indexOf(a)
    const index_b = months.indexOf(b)
    if (index_a < index_b) {
        return -1
    } else if (index_a > index_b) {
        return 1
    } else {
        return 0
    }
}


export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    };



    // studyList = (history) => {
    //     const hist = Object.entries(history)
    //     return hist.map((entry) => {

    //         console.log(label)
    //         return (
    //             <Text key={label}>{label}: {entry[1]}</Text>
    //         )
    //     })

    // }

    render() {

        return (

            <Subscribe to={[StateContainer]}>
                {
                    (profile) => {
                        const historyData = Object.entries(profile.state.studyHistory).map(entry => {
                            let labelArr = entry[0].split(' ')
                            let label = labelArr[2] + " " + labelArr[1] + " '" + labelArr[3].substr(2)
                            return (
                                { x: label, y: entry[1] }
                            )
                        })

                        const historyDataSorted = historyData.sort((a, b) => {
                            let label1 = a.x.split(' ')
                            let label2 = b.x.split(' ')
                            if (label1[2] < label2[2]) {
                                return -1
                            } else if (label1[2] > label2[2]) {
                                return 1
                            } else if (isEarly(label1[1], label2[1]) == -1) {
                                return -1
                            } else if (isEarly(label1[1], label2[1]) == 1) {
                                return 1
                            } else if (label1[0] > label2[0]) {
                                return 1
                            } else {
                                return -1
                            }
                        })

                        // console.log("DATA: ", historyData)
                        // console.log("SORTED: ",historyDataSorted)
                        return (
                            <ScrollView
                                scrollEnabled={true}
                                style={{ flex: 1 }}
                            >
                                <View style={{ flex: 2, marginBottom: 20, marginBottom: 100 }}>
                                    <ImageBackground style={{ width: '100%' }} source={require("../assets/pp_back.jpg")} >
                                        <View style={styles.infoContainer}>
                                            <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white' }}>{profile.state.username}</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{profile.state.studyGroup}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                                                <Icon type="AntDesign" name="star" style={{ color: 'white', fontSize: 20 }} />
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}> {profile.state.points}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.imageContainer}>
                                            <TouchableOpacity style={styles.imageBorder} >
                                                <Image style={{ resizeMode: 'contain', width: '80%' }} source={require("../assets/robot.png")} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>

                                </View>

                                <View styles={styles.chartContainer}>
                                <Text style={{fontSize: 30, marginLeft: 30, marginBottom: 15}}>Study History</Text>
                                    <PureChart
                                        numberOfYAxisGuideLine={10}
                                        height={200}
                                        data={historyDataSorted}
                                        type='line'
                                        showEvenNumberXaxisLabel={true}
                                        gap={50}
                                    // customValueRenderer={(index, point) => {
                                    //     //if (index % 2 === 0) return null
                                    //     return (
                                    //       <Text style={{textAlign: 'center', fontSize: 11 }}>{point.y}</Text>
                                    //     )
                                    //   }}
                                    />
                                </View>

                            </ScrollView>
                        )
                    }
                }
            </Subscribe>
        )
    }
}


const styles = StyleSheet.create({
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        marginBottom: 20
    },
    imageBorder: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 150,
        overflow: 'hidden',
    },
    headerText: {
        fontWeight: 'bold'
    },
    imageContainer: {
        position: 'relative',
        bottom: -60,
        left: 130,
    },
    infoContainer: {
        alignItems: 'center',
        paddingTop: 10,
    },
    chartContainer: {
        flex: 1,
    }
})