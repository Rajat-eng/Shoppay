import styles from "../../styles/product.module.scss";
import db from "../../utils/db";
import Product from "../../models/Product";
import Category from "../../models/Category";
// import SubCategory from "../../models/SubCategory";
import User from "../../models/User";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { produceWithPatches } from "immer";
import MainSwiper from "../../components/productPage/mainSwiper";
import { useState } from "react";
import Infos from "../../components/productPage/infos";
 import Reviews from "../../components/productPage/reviews";
import ProductsSwiper from "../../components/productsSwiper";

export default function ProductPage({ product, related }) {
  // console.log(product)
  const [activeImg, setActiveImg] = useState("");
  const country = {
    name: "Morocco",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
  };
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name}
            {/* {product.subCategories.map((sub,i) => (
              <span key={i}>{sub.name}</span>
            ))} */}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} />
            <Infos product={product}  />
          </div>
          <Reviews product={product} />
          {/*
          <ProductsSwiper products={related} />
          */}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id,style,size=0 } = context.query;
  db.connectDb();
  let product = await Product.findById(id)
    .populate({ path: "category", model: Category })
    // .populate({ path: "reviews.reviewBy", model: User })
    .lean();
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  let newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange: subProduct.discount
      ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
          prices[prices.length - 1] -
          prices[prices.length - 1] / subProduct.discount
        ).toFixed(2)}$`
      : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            (subProduct.sizes[size].price * subProduct.discount)/100
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .reduce((group,ele,index)=>{
        const{size}=ele;
        group[size]=group[size] ?? []
        group[size].push(ele)
        return group;
     },{})
  };

  // console.log("new",newProduct)
  // const related = await Product.find({ category: product.category._id }).lean();
  //------------
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }

  db.disconnectDb();
  // console.log("related", related);
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      // related: JSON.parse(JSON.stringify(related)),
    },
  };
}