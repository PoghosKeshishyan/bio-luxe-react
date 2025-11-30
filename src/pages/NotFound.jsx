import { Link } from "react-router-dom";





export function NotFound() {

  const currentLanguage = localStorage.getItem('lang') || 'en';

    let title1 ={
    en:"Page Not Found",
    ru:"Страница не найдена",
    am:"Էջը չի գտնվել"
}

  let title2 ={
    en:"The page you are looking for does not exist.",
    ru:"Страница, которую вы ищете, не существует.",
    am:"Այն էջը, որը փնտրում եք, գոյություն չունի։"
}

      let title3 ={
    en:"🏠 Go Back Home",
    ru:"🏠 Вернуться на главную страницу",
    am:"🏠 Վերադառնալ գլխավոր էջ "
}

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>{title1[currentLanguage]}</h2>
      <p>{title2[currentLanguage]}</p>

      <Link to="/" className="notfound-btn">
        {title3[currentLanguage]}
      </Link>
    </div>
  );
}
