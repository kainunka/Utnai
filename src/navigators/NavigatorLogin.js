import { StackNavigator } from 'react-navigation';
import Login from '../Login';

const NavigatorLogin = StackNavigator({
    Login: { screen: Login }
})

export default NavigatorLogin;
