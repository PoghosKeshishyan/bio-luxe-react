import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../config";

export function Category({ category }) {
    return (
        <Link className="box" to={`${category.category_name}`}>
            <img src={BACKEND_API_URL + category.image} alt={category.title} />
            <div className="content">
                <h3 className="title">{category.title}</h3>
                <p className="descr">{category.descr}</p>
            </div>
        </Link>
    );
}