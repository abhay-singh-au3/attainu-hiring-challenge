import React from 'react';
import Students from './Students';
import { store } from '../store/store';
import { Provider } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    {/* <Header /> */}
                    <Students />
                </div>
            </Provider>
        )
    }
}

export default App;