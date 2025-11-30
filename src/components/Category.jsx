import { Link } from "react-router-dom";

export function Category({ category }) {
    return (
        <Link className="box" to={`${category.category_name}`}>
            <img src={category.image} alt={category.title} />
            <div className="content">
                <h3 className="title">{category.title}</h3>
                <p className="descr">{category.descr}</p>
            </div>
        </Link>
    );
}