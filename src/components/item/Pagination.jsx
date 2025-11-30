export function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    
    return pages;
  };


  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <ul className="pagination_ul">
        <li>
          <button
            className="pagination_btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
        </li>

        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="pagination_ellipsis">...</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                style={{
                  fontWeight: currentPage === number ? "bold" : "normal",
                  color: currentPage === number ? "#50a2aa" : "#50a2aa",
                }}
              >
                {number}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            className="pagination_btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </li>
      </ul>
    </div>
  );
}
