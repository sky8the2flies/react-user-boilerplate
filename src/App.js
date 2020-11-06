import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import userService from './services/userService';

import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
    const [user, setUser] = useState(userService.getUser());

    const handleLogout = () => {
        userService.logout();
        setUser(null);
    };

    const handleLoadUser = () => {
        setUser(userService.getUser());
    };

    return (
        <div>
            <Switch>
                <Route
                    exact
                    path="/accounts/signup"
                    render={({ history }) => (
                        <SignupPage
                            history={history}
                            handleLoadUser={handleLoadUser}
                        />
                    )}
                />
                <Route
                    exact
                    path="/accounts/login"
                    render={({ history }) => (
                        <LoginPage
                            history={history}
                            handleLoadUser={handleLoadUser}
                        />
                    )}
                />
            </Switch>
        </div>
    );
}

export default App;
