import { Container } from 'unstated';


class StateContainer extends Container {
    state = {
        username: "utarit",
        points: 140,
        studyGroup: 'CengoTayfa',
        studyHistory: {
            "Mon Jan 21 2019": 50,
            "Tue Jan 22 2019": 120,
            "Wed Jan 23 2019": 30,
        },
        minutes: 1,
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
        }, 250) //1000 olacak burası!!
    }

    gainPoints = (point) => {
        const date = new Date(Date.now());
        const dateStr = date.toDateString();
        let tmp = { ...this.state.studyHistory }
        if (!(dateStr in this.state.studyHistory)) {
            tmp[dateStr] = 0
        }
        tmp[dateStr] += point
        this.setState(state => ({ studyHistory: tmp, points: state.points + point }))
    }
}

export default StateContainer