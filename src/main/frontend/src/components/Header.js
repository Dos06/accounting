import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <Link to={'/'}>
                    <img
                        alt={''}
                        src="https://img.icons8.com/plasticine/2x/ffffff/accounting.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Link>
            </Navbar.Brand>
        </Navbar>
    )
}
