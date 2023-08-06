// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import users from '@src/views/apps/user/store'
import services from '@src/views/apps/Service/store';

const rootReducer = { navbar, layout,users,services }

export default rootReducer
