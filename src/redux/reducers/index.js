import { combineReducers } from 'redux';
import auth from './auth';
import blog from './blog';
import categories from './categories';
import services from './services';
import serviceCategories from './serviceCategories';
import cases from './cases';
import contacts from './contacts';
import adminUsers from './adminUsers';

export default combineReducers({
    auth,
    blog,
    categories,
    services,
    serviceCategories,
    cases,
    contacts,
    adminUsers,
});
