import { NavLink as Link } from "react-router-dom"

export function HeaderNavBar({navbar}){

    return(
          <nav className="nav_bar">
            <ul>
              {navbar.map((item) => (
                <li key={item.id} className="nav-item">
                  <Link to={item.route}>{item.title}</Link>

                  {item.submenus.length > 0 && (
                    <ul className="submenu">
                      {
                        item.submenus.map((elem, index) => (
                          <li key={index}>
                            <Link to={`${elem.route}`}>{elem.title}</Link>
                          </li>
                        ))
                      }
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
    )
}