/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import StudentList from './student'
import {name as appName} from './app.json';

 AppRegistry.registerComponent(appName, () => StudentList);
//AppRegistry.registerComponent(StudentList);
