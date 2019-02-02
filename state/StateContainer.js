import { Container } from 'unstated';
import { AsyncStorage} from 'react-native';

class StateContainer extends Container {
    state = {
        username: "utarit",
        points: 140,
        studyGroup: 'CengoTayfa',
        studyHistory: {
            "Tue Jan 27 2019": 120,
            "Tue Jan 22 2019": 120,
            "Wed Jan 16 2019": 150,
            "Sat Jan 19 2019": 70,
            "Mon Jan 21 2017": 50,
            "Wed Jan 23 2019": 30,
        },
        minutes: 25,
        seconds: 0,
        clockIsOn: false,
        quote: "",
        quotes: [
            'JUST DO IT!',
            'Your friends are not dying!',
            'Stay away your Whatsapp. Nobody is having a party',
            'Do not think the big picture. Focus on small goals.',
            'When you finish this, you may look up the news.',
            'Why are you looking your phone ???',
            "This phone is not going to fly away, don't worry"
        ]

    }

    _writeState = async (tmp) => {
        try {
            const strData = await AsyncStorage.getItem('HubData');
            const value = JSON.parse(strData)
            value['studyHistory'] = tmp
            await AsyncStorage.setItem('HubData', JSON.stringify(value));
            console.log('WRITTEN: ', value)
          } catch (error) {
            console.log('ERROR: ', error)
          }
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('HubData');
          if (value !== null) {
            // We have data!!
            this.setState(JSON.parse(value));
            console.log('RETRIEVED!')
            console.log('DATA:', value);
          }
         } catch (error) {
           // Error retrieving data
           console.log('ERROR: ', error)
         }
      }

    incrementMin = () => {
        this.setState((state) => {
            if (state.minutes < 120) {
                return { minutes: state.minutes + 5 }
            } else {
                return state
            }

        })
    }


    decrementMin = () => {
        this.setState((state) => {
            if (state.minutes > 5) {
                return { minutes: state.minutes - 5 }
            } else {
                return state
            }
        })
    }

    resetData = async () => {
        const defaultState = {
            username: "utarit",
            points: 140,
            studyGroup: 'CengoTayfa',
            studyHistory: {
                "Tue Jan 27 2019": 120,
                "Tue Jan 22 2019": 120,
                "Wed Jan 16 2019": 150,
                "Sat Jan 19 2019": 70,
                "Mon Jan 21 2017": 50,
                "Wed Jan 23 2019": 30,
            },
            minutes: 25,
            seconds: 0,
            clockIsOn: false,
            quote: "",
            quotes: [
                'JUST DO IT!',
                'Your friends are not dying!',
                'Stay away your Whatsapp. Nobody is having a party',
                'Do not think the big picture. Focus on small goals.',
                'When you finish this, you may look up the news.',
                'Why are you looking your phone ???',
                "This phone is not going to fly away, don't worry"
            ]
    
        }

        try {
            await AsyncStorage.setItem('HubData', JSON.stringify(defaultState));
            console.log('RESET: ', defaultState)
          } catch (error) {
            console.log('ERROR: ', error)
          }
        
        this.setState(defaultState)
    }

    startClock = () => {
        this.setState({ clockIsOn: true })
        const startMin = this.state.minutes

        timer = setInterval(() => {
            this.setState((state) => {
                //console.log(startMin)
                if (state.minutes == 0 && state.seconds == 0) {
                    clearInterval(timer)
                    newHistory = this.gainPoints(startMin)
                    return { clockIsOn: false, minutes: startMin, points: state.points + startMin, studyHistory: newHistory }
                } else if (state.seconds == 0) {
                    if (state.minutes % 5 == 0) {
                        let index = Math.floor(Math.random() * this.state.quotes.length)
                        return { minutes: state.minutes - 1, seconds: 59, quote: this.state.quotes[index] }
                    }
                    return { minutes: state.minutes - 1, seconds: 59 }
                } else {
                    return { seconds: state.seconds - 1 }
                }
            })
        }, 100) //1000 olacak burası!!
    }

    gainPoints = (point) => {
        const date = new Date(Date.now());
        const dateStr = date.toDateString();
        let tmp = { ...this.state.studyHistory }
        if (!(dateStr in this.state.studyHistory)) {
            tmp[dateStr] = 0
        }
        tmp[dateStr] += point
        this._writeState(tmp)
        return tmp
        
    }

    _updateData = async (newState) => {
        try {
            await AsyncStorage.setItem('HubData', JSON.stringify(newState));
            console.log('QUOTE: ', defaultState)
          } catch (error) {
            console.log('ERROR: ', error)
          }
    }

    addQuote = (quote) => {
        let tmp = this.state.quotes
        tmp.push(quote)
        this.setState({quotes: tmp})
        let tmpState = {...this.state, quotes: tmp}
        this._updateData(tmpState)
    }

    removeQuote = (index) => {
        let tmp = this.state.quotes
        tmp.splice(index, 1)
        this.setState({quotes: tmp})
        let tmpState = {...this.state, quotes: tmp}
        this._updateData(tmpState)
    }
}

export default StateContainer