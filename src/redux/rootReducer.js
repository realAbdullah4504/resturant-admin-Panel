// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import users from '@src/views/apps/user/store'
import deals from '@src/views/apps/Service/store'
import categories from '@src/views/apps/CategoryOptions/store'

const rootReducer = { navbar, layout, users, deals,categories }

export default rootReducer
