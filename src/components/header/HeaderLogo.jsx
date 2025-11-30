import { NavLink as Link } from "react-router-dom";

export function HeaderLogo({logo}){

    return(
        <div className="logo">
            <Link to={"/"}>
                 <img src={logo.image} alt="logo" />
            </Link>
      </div>
    )
}