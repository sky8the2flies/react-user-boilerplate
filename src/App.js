import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import userService from './services/userService';
import profileApi from './services/profileApi';

import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
    const [user, setUser] = useState(userService.getUser());
    const [profile, setProfile] = useState(null);

    const handleLogout = () => {
        userService.logout();
        setUser(null);
    };

    const handleLoadUser = () => {
        setUser(userService.getUser());
    };

    /* Lifetime Events */
    useEffect(() => {
        async function fetchProfile() {
            const profile = await profileApi.getProfile(user);
            setProfile(profile);
        }
        if (user) fetchProfile();
    }, [user]);

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
                <Route
                    exact
                    path="/accounts/profile"
                    render={({ history }) => (
                        <ProfilePage
                            user={user}
                            other={false}
                            profile={profile}
                            history={history}
                            handleLoadUser={handleLoadUser}
                        />
                    )}
                />
                <Route
                    path="/accounts/profile/:id"
                    render={({ history }) => (
                        <ProfilePage
                            user={user}
                            other={true}
                            profile={profile}
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
