import {createStore} from "redux";
import reducer from "../redux/cards/reducer"
const store=createStore(reducer)

export default store