import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './HeaderMenu.css'
import { Link } from 'react-router-dom';

const HeaderMenu = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">Cryptor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/playfair">Playfair</Nav.Link>
            <Nav.Link as={Link} to="/rsa">RSA</Nav.Link>
            <Nav.Link as={Link} to="/rsademo">RSA-Demo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;