import axios from "../axios";
import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { Item } from "../components/item/Item";
import { Link, useParams } from "react-router-dom";
import { Filter } from "../components/item/Filter";
import { Pagination } from "../components/item/Pagination";
import { CartContext } from "../contexts/CartContext";
import { HeartContext } from "../contexts/HeartContext";

export function ListCategory() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [header, setHeader] = useState(null);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category_name } = useParams();
    const selectedCategories = category_name ? category_name.split('/') : [];
    const currentLanguage = localStorage.getItem("lang") || "en";
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sortBy, setSortBy] = useState('recommendations');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const { addToBasket } = useContext(CartContext);
    const { handleHeartIcon } = useContext(HeartContext);
    const [categoriesLink, setCategoriesLink] = useState([]);

    /////////////////////////////////////////////////////////
    useEffect(() => {
        const loadingData = async () => {
            try {
                setLoading(true);
                const resCategoriesLink = await axios.get('categories_link?lang=' + currentLanguage);
                setCategoriesLink(resCategoriesLink.data[0]);

                const resHeader = await axios.get(`items_header?lang=${currentLanguage}&category_name=${category_name}`);

                setHeader(resHeader.data?.[0] || null);


                const resItems = await axios.get(`items?category=${category_name}`);

                const fetchedItems = resItems.data.reverse() || [];

                const resCategories = await axios.get(`categories?lang=${currentLanguage}`);
                setCategories(resCategories.data);

                // _-----------------_----_-----Paylaki hamar_____________--_---__--_____

                const correctionMap = {
                    "Cribe": "Cribs",
                    "Сlothes": "Clothes", // ռուսերեն С → անգլերեն C
                };

                const fixCategory = (str) => correctionMap[str] || str;

                const processedItems = fetchedItems
                    .filter(item => fixCategory(item.category_name) === category_name)
                    .map(item => ({
                        ...item,
                        priceNumber: item.price,
                    }));
                // _-----------------_----_-----Paylaki hamar_____________--_---__--_____

                const uniqueMaterials = [...new Set(processedItems.map(item =>
                    item.product_material[currentLanguage]
                ))];
                setMaterials(uniqueMaterials);

                const prices = processedItems.map(item => item.priceNumber);
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));

                setItems(processedItems);
                setFilteredItems(processedItems);


            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadingData();
    }, [currentLanguage, category_name]);

    const onFilter = useCallback((filters) => {
        const filtered = items.filter(item => {
            const matchesMaterial = filters.materials.length === 0 ||
                filters.materials.includes(item.product_material[currentLanguage]);

            const matchesCategory = filters.categories.length === 0 ||
                filters.categories.includes(item.category_name[currentLanguage]);

            const matchesPrice = item.priceNumber >= filters.minPrice &&
                item.priceNumber <= filters.maxPrice;

            return matchesMaterial && matchesCategory && matchesPrice;
        });
        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [items, currentLanguage]);

    const sortedItems = useMemo(() => {
        const sorted = [...filteredItems];
        switch (sortBy) {
            case 'price_high_to_low':
                return sorted.sort((a, b) => b.priceNumber - a.priceNumber);
            case 'price_low_to_high':
                return sorted.sort((a, b) => a.priceNumber - b.priceNumber);
            default:
                return sorted;
        }
    }, [filteredItems, sortBy]);

    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <>
            {header && header.image && (
                <div className="items_header">
                    <img src={header.image} alt={header.title} />
                    <div className="items_text">
                        <h2 className="items_title">{header.title}</h2>
                        <div className="items_descr">{header.descr}</div>
                    </div>
                </div>
            )}
            <div id="items">
                <div className="container">
                    <div className="items_heading">
                        <Link to='/' className="items_heading1">{categoriesLink?.main}</Link>/
                        <Link className="items_heading2">{header?.title}</Link>
                    </div>
                    {loading && <div>Loading...</div>}

                    {!loading && (
                        <>
                            <Filter
                                categoriesLink={categoriesLink}
                                categories={categories}
                                materials={materials}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                onFilter={onFilter}
                                category_name={category_name}
                                sort={setSortBy}
                                checkedCategories={selectedCategories}
                                items={filteredItems}
                                allItems={items}
                                currentLanguage={currentLanguage}
                            />

                            <div className="line"></div>

                            <div className="box_container">
                                
                                {currentItems.length > 0 ? (
                                    currentItems.map((item) => (
                                        <Item key={item.id} item={item} handleHeartIcon={handleHeartIcon} addToBasket={addToBasket} currentLanguage={currentLanguage} />
                                    ))
                                ) : (
                                    <div>No items found</div>
                                )}
                            </div>

                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={sortedItems.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
