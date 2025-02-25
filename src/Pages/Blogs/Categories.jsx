"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Header from "../../Components/Header/Header";
// import Footer from "../../Components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
const Categories = () => {
  const [blogData, setBlogData] = useState();
  console.log(blogData);

  // const 1piUrl = process.env.REACT_APP_API_URL // Get API URL from .env file later
  // const imgUrl = process.env.REACT_APP_IMG_URL // Get Image URL from .env file later
  const apiUrl = "http://localhost:1337/api/";
  const imgUrl = "http://localhost:1337";

  const { slug } = useParams();
  console.log(slug, 'sluf');
  const decodedSlug = decodeURIComponent(slug);
  console.log(decodedSlug, 'decodedSlug');

  const getAllBlogs = async () => {
    // const { data } = await axios.get(`${apiUrl}/blogs?populate=*`);
    const { data } = await axios.get(`${apiUrl}articles?populate=*`);
    setBlogData(data.data);
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const filteredBlogs = blogData?.filter((post) => {
    if (!post || !post.category || !post.title) return false;

    if (!decodedSlug) {
        return true; // Show all posts if no filter is applied
    } 

    return (
        post?.category?.name?.toLowerCase().includes(decodedSlug.toLowerCase()) ||
        post?.title?.toLowerCase().includes(decodedSlug.toLowerCase())
    );
}) || []; // Ensure filteredBlogs is always an array

console.log(filteredBlogs, 'filteredBlogs');

// Show "Not Found" image when no blogs match the filter
if (filteredBlogs.length === 0) {
    return (
        <>
            {/* <Header /> */}
            <div className="container mt-5" style={{ maxWidth: "100%", justifyContent: "center", display: "flex" }}>
                <img src="/not-found.png" alt="Not Found" />
            </div>
            {/* <Footer /> */}
        </>
    );
}

 
  return (
    <>
      {/* <Header /> */}
      <title>MediaDunes | Blogs</title>
      <section className="section mt-70">
        <div className="cnt-center container">
          <div className="row flex justify-evenly gap-2">
            {filteredBlogs?.map((post) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={post.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`${imgUrl}${post?.blog_image?.url}`}
                      className="card-img-top"
                      alt={post?.title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{post?.title}</h5>
                      <p className="card-text">{post?.description}</p>
                      <p className="card-meta text-muted">
                        {Date(post?.publishedAt).slice(0, 15)} |{" "}
                        {post?.author?.name}
                      </p>
                    </div>
                    <Link
                      to={`/blogs/${post?.slug}`}
                      className="btn btn-primary m-2"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Categories;
