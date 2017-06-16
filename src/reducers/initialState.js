import { AppNavigator } from '../navigators/AppNavigator';
import { AsyncStorage }  from 'react-native';

let f;
let s;
let a;

console.log('test 1111a = ' + a);

console.log('test 1111 = ' + f);
console.log('test 1111 = ' + s);


const firstAction = AppNavigator.router.getActionForPathAndParams(f);
const secondAction = AppNavigator.router.getActionForPathAndParams(s);
const tempNavState = AppNavigator.router.getStateForAction(firstAction);

export default {
	nav: AppNavigator.router.getStateForAction(secondAction,
		tempNavState
	),
	auth: {
		isLoggedIn: false,
		clearToken: AsyncStorage.getItem('token').then((getToken) => { getToken })
	},
	const: {
		checkLogin: false,
		onLocationLat: 18.84275358804239,
		onLocationLong: 99.01151022951632,
		userProfile: [],
	},
	feed: {
		feedData: ''
	}
};
