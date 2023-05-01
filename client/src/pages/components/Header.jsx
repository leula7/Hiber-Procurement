import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function Header() {
  const {authData} = useSelector((state) => state.authReducer);
  let span="default";
  if(authData.position ==="supplier"){
    span="Supplier";
  }else if(authData.position ==="marketofficer"){
    span="Head Office";
  }
  const clear = ()=>{
    console.log(authData.branch_name)

    localStorage.clear('store');
  }
 
  return (
    <Navbar className='navbar' bg='dark' expand="lg" fixed="top">
    <Navbar.Brand href="/">
      <img
        src="/logo.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt=""
      /><span>{authData?.branch_name===undefined?span:authData?.branch_name}</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link  href={authData.position} >Tasks</Nav.Link>
        <Nav.Link  href="chat">Chat</Nav.Link>
      </Nav>
      <Nav>
        <NavDropdown
          title={authData.username}
          id="dropdown-menu">
          <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/login" onClick={clear}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
