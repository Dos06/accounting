import {Container} from "react-bootstrap";
import {Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import Employees from "./components/Employees";

function App() {
    return (
        <>
            <Header/>
            <Container>
                <Switch>
                    <Route path={'/'} exact render={() => <Employees/>}/>
                </Switch>
            </Container>
        </>
    );
}

export default App;
