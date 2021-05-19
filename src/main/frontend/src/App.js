import {Container} from "react-bootstrap";
import {Route, Switch, useParams} from 'react-router-dom';
import Header from "./components/Header";
import Employees from "./components/Employees";
import Items from "./components/Items";

function App() {
    return (
        <>
            <Header/>
            <Container>
                <Switch>
                    <Route path={'/'} exact render={() => <Employees/>}/>
                    <Route path={'/employee/:id'} children={<EmployeeChild/>}/>
                </Switch>
            </Container>
        </>
    );
}

function EmployeeChild() {
    let {id} = useParams();
    return (
        <Items id={id} key={window.location.pathname}/>
    );
}

export default App;
