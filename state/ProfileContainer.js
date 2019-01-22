import {Container} from 'unstated';


class ProfileContainer extends Container {
    state = {
        username : "utarit",
        points: 140,
        studyGroup: 'CengoTayfa',
        studyHistory: {},
        profile_pic: require("../assets/robot.png")
    }
  
    increment = () => {
      this.setState({ count: this.state.count + 1 })
    }
  
    decrement = () => {
      this.setState({ count: this.state.count - 1 })
    }
  }
  
  export default ProfileContainer