import { NavLink as Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../config";

export function HeaderLogo({logo}){

    return(
        <div className="logo">
            <Link to={"/"}>
                 <img src={BACKEND_API_URL + logo.image} alt="logo" />
            </Link>
      </div>
    )
}