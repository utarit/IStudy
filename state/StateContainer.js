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
            "Fri Jan 18 2019": 25,
            "Sat Jan 19 2019": 70,
            "Mon Jan 21 2017": 50,
            "Tue Feb 22 2019": 120,
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
            //let tmp = {...this.state, clockIsOn: false, minutes: 25}
            await AsyncStorage.setItem('HubData', JSON.stringify(tmp));
            console.log('WRITTEN: ', tmp)
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

    startClock = () => {
        this.setState({ clockIsOn: true })
        const startMin = this.state.minutes

        timer = setInterval(() => {
            this.setState((state) => {
                //console.log(startMin)
                if (state.minutes == 0 && state.seconds == 0) {
                    clearInterval(timer)
                    this.gainPoints(startMin)
                    return { clockIsOn: false, minutes: startMin }
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
        tmp = {...tmp, studyHistory: tmp, points: this.state.points + point}
        this.setState(state => (tmp))
        this._writeState(tmp)
    }
}

export default StateContainer