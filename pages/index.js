import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import db from "../utils/db";
import ProductCard from "../components/productCard";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";
// const inter = Inter({ subsets: ["latin"] });
import Product from "../models/Product";

export default function Home({ country, products }) {
  // const {data:session}=useSession();
  // console.log(data)
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
            <Category header="Shoes" products={women_shoes} background="pink" />
          </div>
          <div className={styles.products}>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products;
  try {
    products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        country: {
          name: "India",
          flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}
