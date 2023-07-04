import React, { useState } from "react";
import db from "../../../utils/db";
import Category from "../../../models/Category";
import Layout from "../../../components/admin/layout";
import List from "../../../components/admin/categories/List";
import Create from "../../../components/admin/categories/Create";
export default function Categories({ categories }) {
  const [data, setData] = useState(categories);
  return (
    <Layout>
      <div>
        <Create setCategories={setData} />
        <List categories={data} setCategories={setData}/>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    db.connectDb();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.log("error fetching categories", error);
    return {
        props: {
          categories: [],
        },
      };
  }
}
