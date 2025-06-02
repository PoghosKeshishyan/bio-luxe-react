import { Category } from "./Category";

export function Categories({ categories, c_heading }) {

    const currentLanguage = localStorage.getItem('lang') || 'en';


    return (
        <div id="categories">
            <div className="container">
                <h2 className="heading">
                    <span>{c_heading}</span>
                    <div className="line"></div>
                </h2>
                <div className="box_container">
                    {categories.map((category, index) => (
                        category.lang === currentLanguage && <Category key={category.id} category={category} isReversed={index % 2 === 0} />
                    ))}
                </div>
            </div>
        </div>
    );
}
