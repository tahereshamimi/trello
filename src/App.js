import React from 'react';
import './App.css';
import './styles/boardStyle.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from "./Components/Board";
import {Provider} from 'react-redux';
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Board/>
            </div>
        </Provider>

    );
}

export default App;
