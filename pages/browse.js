import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/browse.module.scss";
import db from "../utils/db";
import {
  filterArray,
  randomize,
  removeDuplicates,
} from "../utils/arrays_utils";
import Product from "../models/Product";
import Category from "../models/Category";
import Header from "../components/header";
import SubCategory from "../models/SubCategory";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/browse/categoryFilter";
import SizesFilter from "../components/browse/sizesFilter";
import ColorsFilter from "../components/browse/colorsFilter";
import BrandsFilter from "../components/browse/brandsFilter";
import StylesFilter from "../components/browse/stylesFilter";
import PatternsFilter from "../components/browse/patternsFilter";
import MaterialsFilter from "../components/browse/materialsFilter";
import GenderFilter from "../components/browse/genderFilter";
import HeadingFilters from "../components/browse/headingFilters";
import { Pagination } from "@mui/material";
import { debounce } from "../utils/arrays_utils";
import { Filter2Outlined } from "@mui/icons-material";
import { throttle } from "../utils/arrays_utils";
const Browse = ({
  categories,
  country,
  subCategories,
  products,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials,
  paginationCount
}) => {
  const router = useRouter();
  const headerRef = useRef(null);
  const el = useRef(null);
  const filters = {
    search: "",
    category: "",
    brand: "",
    style: "",
    size: "",
    color: "",
    pattern: "",
    material: "",
    gender: "",
    price: "",
    shipping: "",
    rating: "",
    sort: "",
    page: "",
  };
  const filter = ({ ...filters }) => {
    const path = router.pathname;
    const { query } = router;
    const {
      search,
      category,
      brand,
      style,
      size,
      color,
      gender,
      price,
      shipping,
      rating,
      sort,
      page,
    } = filters;
    if (search) {
      if (Object.keys(search).length === 0) {
        delete query.search;
      } else {
        query.search = search;
      }
    }
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    // if (pattern) query.pattern = pattern;
    // if (material) query.material = material;
    if (gender) {
      if (Object.keys(gender).length === 0) {
        delete query.gender;
      } else {
        query.gender = gender;
      }
    }
    if (price) {
      if(price=="_"){
        delete query.price;
      }else{
        query.price = price;
      }
    }
    if (shipping) query.shipping = shipping;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    if (page) query.page = page;
    // console.log(query);
    router.push({
      pathname: path,
      query: query,
    });
  };

  const throttledFilter=throttle(filter,1000)

  const searchHandler = (search) => {
    if (search !== "") {
      filter({ ...filters, search });
    } else {
      filter({ ...filters, search: {} });
    }
  };
  const categoryHandler = (category) => {
    filter({ ...filters, category });
  };
  const brandHandler = (brand) => {
    filter({ ...filters, brand });
  };
  const styleHandler = (style) => {
    filter({ ...filters, style });
  };
  const sizeHandler = (size) => {
    filter({ ...filters, size });
  };
  const colorHandler = (color) => {
    filter({ ...filters, color });
  };
  // const patternHandler = (pattern) => {
  //   filter({ ...filters, pattern });
  // };
  // const materialHandler = (material) => {
  //   filter({ ...filters, material });
  // };
  const genderHandler = (gender) => {
    if (gender == "Unisex") {
      filter({ gender: {} });
    } else {
      filter({ gender });
    }
  };
  const sortHandler = (sort) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };
  const pageHandler = (e, page) => {
    filter({ page });
  };

  const priceHandler = (price, type) => {
    let priceQuery = router.query.price?.split("_") || "";
    let min = priceQuery[0] || "";
    let max = priceQuery[1] || "";
    let newPrice = "";
    if (type == "min") {
      newPrice = `${price}_${max}`;
    } else {
      newPrice = `${min}_${price}`;
    }
    // const debouncedFilter=debounce(filter,1000)
    throttledFilter({price:newPrice})
  };
  
  return (
    <div className={styles.Browse}>
      <div ref={headerRef}>
        <Header searchHandler={searchHandler} country={country} />
      </div>
      <div className={styles.browse__container}>
        <div ref={el}>
          <div className={styles.browse__path}>Home / Browse</div>
          <div className={styles.browse__tags}>
            {categories.map((c) => (
              <Link href="" key={c._id}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.browse__store}>
          <div className={styles.browse__store_filters}>
            <button
              className={styles.browse__clearBtn}
              onClick={() => router.push("/browse")}
            >
              Clear All
            </button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
              categoryHandler={categoryHandler}
              // replaceQuery={replaceQuery}
            />
            {/* <SubcategoryFilter 
              subcategories={subcategories}
            /> */}
            <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />
            <ColorsFilter
              colors={colors}
              colorHandler={colorHandler}
              // replaceQuery={replaceQuery}
            />
            <BrandsFilter
              brands={brands}
              brandHandler={brandHandler}
              // replaceQuery={replaceQuery}
            />
            <StylesFilter
              data={stylesData}
              styleHandler={styleHandler}
              // replaceQuery={replaceQuery}
            />
            {/* <PatternsFilter
              patterns={patterns}
              // patternHandler={patternHandler}
              // replaceQuery={replaceQuery}
            />
            <MaterialsFilter
              materials={materials}
              // materialHandler={materialHandler}
              // replaceQuery={replaceQuery}
            /> */}
            <GenderFilter
              genderHandler={genderHandler}
              // replaceQuery={replaceQuery}
            />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters
              priceHandler={priceHandler}
              sortHandler={sortHandler}
            />
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination
                count={paginationCount}
                defaultPage={Number(router.query.page) || 1}
                onChange={pageHandler}
                variant="outlined"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  db.connectDb();
  const { query } = ctx;
  const pageSize = 10;
  const page = query.page || 1;
  const searchQuery = query.search || "";
  const categoryQuery = query.category || "";
  const genderQuery = query.gender || "";
  const brandQuery = query.brand || "";
  const sortQuery = query.sort || "";
  const ratingQuery = query.rating || "";
  const styleQuery = query.style?.split("_") || "";
  const sizeQuery = query.size?.split("_") || "";
  const colorQuery = query.color?.split("_") || "";
  const priceQuery = query.price?.split("_") || "";

  // search by name
  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  // serach by category
  const category =
    categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};

  // search by gender
  const gender =
    genderQuery && genderQuery !== ""
      ? {
          "details.value": genderQuery,
        }
      : {};

  // search by Brand
  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: brandQuery,
        }
      : {};

  // search by style
  const style =
    styleQuery && styleQuery !== ""
      ? {
          "details.value": { $in: [...styleQuery] },
        }
      : {};

  // search by color
  const color =
    colorQuery && colorQuery !== ""
      ? {
          "subProducts.color.color": {
            $in: [...colorQuery],
          },
        }
      : {};
  // search by size
  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          "subProducts.sizes.size": {
            $in: [...sizeQuery],
          },
        }
      : {};
  // search by price
  const price =
    priceQuery && priceQuery !== ""
      ? {
          "subProducts.sizes.price": {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};
  //search by rating
  const rating =
    ratingQuery && ratingQuery !== ""
      ? {
          rating: {
            $gte: Number(ratingQuery),
          },
        }
      : {};

  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.price": 1 }
      : {};

  let productsDb = await Product.find({
    ...search,
    ...category,
    ...gender,
    ...brand,
    ...style,
    ...price,
    ...size,
    ...rating,
    ...size,
    ...color
  }) 
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .lean();

  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();

  let colors = await Product.find({ ...category }).distinct(
    "subProducts.color.color"
  );
  let brandsDb = await Product.find({ ...category }).distinct("brand");
  let sizes = await Product.find({ ...category }).distinct(
    "subProducts.sizes.size"
  );
  let details = await Product.find({ ...category }).distinct("details");
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);
  let totalProducts = await Product.countDocuments({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...gender,
    ...price,
    ...rating,
  });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(productsDb)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
      paginationCount: Math.ceil(totalProducts / pageSize),
      country: {
        name: "India",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
      },
    },
  };
}

export default Browse;
