import React, { useState, useEffect, useMemo } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Range } from 'react-range';
import { useNavigate } from 'react-router-dom';


export function Filter({ categoriesLink, categories, category_name, materials, sort, onFilter, minPrice, maxPrice, items, allItems, currentLanguage }) {
    const STEP = 10;
    const MIN = 0;
    const MAX = 10000;
    const navigate = useNavigate();

    const [checkedCategories, setCheckedCategories] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [priceRange, setPriceRange] = useState([MIN, MAX]);
    const [sortBy, setSortBy] = useState('recommendations');
    const [openDropdown, setOpenDropdown] = useState(null);


    const filterTesxts = {
        en: [
            { label: "recommendations", value: "recommendations" },
            { label: "price: high to low", value: "price_high_to_low" },
            { label: "price: low to high", value: "price_low_to_high" },
        ],
        ru: [
            { label: "рекомендуемое", value: "recommendations" },
            { label: "цена: по убыванию", value: "price_high_to_low" },
            { label: "цена: по возрастанию", value: "price_low_to_high" },
        ],
        am: [
            { label: "առաջարկություններ", value: "recommendations" },
            { label: "գին՝ բարձրից ցածր", value: "price_high_to_low" },
            { label: "գին՝ ցածրից բարձր", value: "price_low_to_high" },
        ],
    };


    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    };

    const toggleCategory = (category) => {
        if ('/category/' + category_name ===  category) {
            return;
        }
        
        setCheckedCategories(category);
        navigate(category);
    };

    const toggleMaterial = (material) => {
        setSelectedMaterials((prev) =>
            prev.includes(material)
                ? prev.filter((m) => m !== material)
                : [...prev, material]
        );
    };

    const changeSort = (value) => {
        setSortBy(value);
        sort(value);
        setOpenDropdown(null);
    };

    const materialCounts = useMemo(() => {
        return materials.reduce((acc, material) => {
            const count = allItems.filter(item =>
                item?.product_material?.[currentLanguage] === material
            ).length;
            acc[material] = count;
            return acc;
        }, {});
    }, [allItems, materials, currentLanguage]);


    useEffect(() => {
        onFilter({
            categories: checkedCategories,
            materials: selectedMaterials,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
        });
    }, [checkedCategories, selectedMaterials, priceRange, onFilter]);

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    return (
        <div className="filter_box">
            <div className="filter_wrapper">
                <p className="filter_title">{categoriesLink.filter_by}</p>

                {/* Category */}
                <div className="filter_group">
                    <div className="dropdown">
                        <div className="dropdown_header" onClick={() => toggleDropdown("category")}>
                            <span>{checkedCategories.length > 0 ? ` ${checkedCategories.length}` : ''} {categoriesLink?.category}</span>
                            {openDropdown === "category" ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                        {openDropdown === "category" && (
                            <div className="dropdown_list1">
                                {categories.map((category) => (
                                    <div key={category.id} className="dropdown_item_checkbox" onClick={() => toggleCategory(category.category_name)}>
                                        <input
                                            type="checkbox"
                                            checked={category.category_name === `/category/${category_name}`}
                                            onChange={() => { }}
                                        />
                                        <span>{category.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Material */}
                <div className="filter_group">
                    <div className="dropdown">
                        <div className="dropdown_header" onClick={() => toggleDropdown("material")}>
                            <span>{selectedMaterials.length > 0 ? ` ${selectedMaterials.length}` : ''} {categoriesLink?.materials}</span>
                            {openDropdown === "material" ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                        {openDropdown === "material" && (
                            <div className="dropdown_list1">
                                {materials.map((material) => (
                                    <div key={material} className="dropdown_item_checkbox" onClick={() => toggleMaterial(material)}>
                                        <input
                                            type="checkbox"
                                            checked={selectedMaterials.includes(material)}
                                            onChange={() => { }}
                                        />
                                        <span>{material}</span>
                                        <span>({materialCounts[material] || 0})</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Price */}
                <div className="filter_group">
                    <div className="dropdown">
                        <div className="dropdown_header" onClick={() => toggleDropdown("price")}>
                            <span>{categoriesLink?.price}</span>
                            {openDropdown === "price" ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                        {openDropdown === "price" && (
                            <div className="dropdown_list2">
                                <Range
                                    step={STEP}
                                    min={MIN}
                                    max={MAX}
                                    values={priceRange}
                                    onChange={(values) => setPriceRange(values)}
                                    renderTrack={({ props, children }) => (
                                        <div className="range1" {...props}>
                                            <div
                                                className="range2"
                                                style={{
                                                    left: `${(priceRange[0] / MAX) * 100}%`,
                                                    width: `${((priceRange[1] - priceRange[0]) / MAX) * 100}%`,
                                                }}>
                                            </div>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => <div className="range3" {...props} />}
                                />
                                <div className="range-values">
                                    <div className="min">
                                        <span>{categoriesLink?.from}<br /> {priceRange[0]} ֏</span>
                                        <div className="price_line"></div>
                                    </div>
                                    <div className="max">
                                        <span>{categoriesLink?.to}<br /> {priceRange[1]} ֏</span>
                                        <div className="price_line"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sort */}
            <div className="filter_wrapper">
                <p className="filter_title">{categoriesLink?.sort_by}</p>
                <div className="filter_group">
                    <div className="dropdown">
                        <div className="dropdown_header" onClick={() => toggleDropdown("sort")}>
                            <span>{filterTesxts[currentLanguage][0].label}</span>
                            {openDropdown === "sort" ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                        {openDropdown === "sort" && (
                            <div className="dropdown_list3">
                                {filterTesxts[currentLanguage].map(({ label, value }) => (
                                    <div className="dropdown_item"
                                        key={value}
                                        onClick={() => changeSort(value)}
                                        style={{
                                            cursor: "pointer",
                                            backgroundColor: sortBy === value ? "#fff" : "transparent",
                                        }}
                                    >
                                        {sortBy === value && <span>✓ </span>}
                                        {label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
