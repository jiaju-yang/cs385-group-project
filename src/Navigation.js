import { Component } from "react";
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const tabs = [
  {
    icon: faSearch,
    route: "/search",
  },
  {
    icon: faUserCircle,
    route: "/intake"
  }
]

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-light w-100" role="navigation">
        <Nav className="w-100" defaultActiveKey="/search">
          <div className="d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) => (
                <Nav.Item key={`tab-${index}`}>
                  <Nav.Link href={tab.route} className="nav-link" activeClassName="active">
                    <div className="justify-content-center flex-column d-flex align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon} />
                    </div>
                  </Nav.Link>
                </Nav.Item>
              ))
            }
          </div>
        </Nav>
      </nav>
    );
  }
}

export default Navigation;
