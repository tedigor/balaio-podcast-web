import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./shared/components/header/Header";
import Sidenav from './shared/components/sidenav/Sidenav';
import EpisodeIframe from './shared/components/episode-iframe/EpisodeIframe';
import SecurityContext from './contexts/SecurityContext';
import { EpisodeProvider } from "./contexts/EpisodeContext";

const Login = lazy(() => import("./modules/public/login/Login"));
const Home = lazy(() => import("./modules/public/home/Home"));
const Episode = lazy(() => import("./modules/public/episode/Episode"));
const Episodes = lazy(() => import("./modules/private/episodes/Episodes"));
const EpisodesForm = lazy(() => import("./components/episodes-form/EpisodesForm"));

const fallback = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            className="loading-screen"
        >
            <h1>Carregando</h1>
        </div>
    );
};


const Routes = () => {

    const { isUserAuthenticated } = useContext(SecurityContext);

    return (
        <Router>
            <div className="app">
                <EpisodeProvider>
                    <Header />
                    <div className="page">
                        <Sidenav>
                            <Switch>
                                <Suspense fallback={fallback()}>
                                    {
                                        !isUserAuthenticated() ?
                                            <Route exact path={"/login"}>
                                                <Login />
                                            </Route> :
                                            null
                                    }
                                    <Route exact path={"/episodes/:id"}>
                                        <Episode />
                                    </Route>
                                    <Route exact path={"/"}>
                                        <Home />
                                    </Route>
                                    <Route exact path={"/private/episodes"}>
                                        <Episodes />
                                    </Route>
                                    <Route exact path={"/private/episodes/new"}>
                                        <EpisodesForm />
                                    </Route>
                                    <Route exact path={"/private/episodes/edit/:id"}>
                                        <EpisodesForm />
                                    </Route>
                                </Suspense>
                            </Switch>
                        </Sidenav>
                    </div>
                    <EpisodeIframe />
                </EpisodeProvider>
            </div>
        </Router>
    );
}

export default Routes;

