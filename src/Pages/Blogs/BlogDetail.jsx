import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate, useParams, useRoutes } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import "./BlogDetails.css"; // Import your main CSS file
import AuthorBox from "./AuthorBox";

const BlogsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singlePost, setSinglePost] = useState();
  const [recentPost, setRecentPost] = useState();
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState("");
  console.log(singlePost)

  // const 1piUrl = process.env.REACT_APP_API_URL // Get API URL from .env file later
  // const imgUrl = process.env.REACT_APP_IMG_URL // Get Image URL from .env file later
  const apiUrl = "http://localhost:1337/api/";
  const imgUrl = "http://localhost:1337";

  useEffect(() => {
    const getBlogData = async () => {
      const { data } = await axios.get(
        `${apiUrl}articles?filters[slug][$eq]=${id}&populate=*`
      );
      setSinglePost(data.data[0]);
    };
    const getRecentBlogPosts = async () => {
      const { data } = await axios.get(
        `${apiUrl}articles?pagination[limit]=2&_start=0&sort=createdAt:DESC&populate=*`
      );
      setRecentPost(data.data);
    };
    const getBlogCategories = async () => {
      const { data } = await axios.get(`${apiUrl}categories`);
      setCategories(data.data);
    };

    getBlogData();
    getRecentBlogPosts();
    getBlogCategories();
  }, [id]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleKeyUp = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    // router.push(`/category/${search}`);
    navigate(`/category/${search}`);
  };

  const publishedAt = new Date(singlePost?.publishedAt);
  const publishedDate = publishedAt.toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
  });

  if (!singlePost) {
    return (
      <div
        className="container mt-5"
        style={{
          maxWidth: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {" "}
        <img src="not-found.png" alt="Not Found" />
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="blog-layout">
          {/* Main Content */}
          <div className="main-content">
            <div className="blog-card">
              <img
                src={`${imgUrl}${singlePost?.blog_image?.url}`}
                alt="Blog Thumbnail"
                className="blog-image"
              />
              <h1 className="blog-title">{singlePost?.title}</h1>
              <p className="blog-date">{publishedDate}</p>
              <hr className="divider" />
              <div className="blog-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {singlePost?.description}
                </ReactMarkdown>
              </div>
              <div>
                <AuthorBox singlePost={singlePost} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            {/* Search Bar */}
            <div
              className="my-8 gap-2  "
              style={{
                display: "flex",
              }}
            >
              <div
                className="flex items-center justify-center rounded bg-gray-500 p-2"
                style={{
                  backgroundColor: "#f1f1f1",
                  width: "40px",
                }}
              >
                <BsSearch color="black" size={20} />
              </div>
              <form onSubmit={handleKeyUp} className="w-full" style={{
                width: "100%",
              }}>
                <input
                  type="text"
                  placeholder="Search blogs....."
                  className="w-full rounded border p-2 "
                  style={{
                    width: "100%",
                  }}
                  onChange={handleSearch}
                />
              </form>
            </div>

            {/* Categories */}
            <div className="categories">
              <h3>Categories</h3>
              <div className="category-list">
                {categories?.map((category) => (
                  <Link
                    key={category?.id}
                    //  to={`/pages/blogs/categories/${category?.attributes?.title}`}
                    to={`/category/${category?.slug}`}
                    className="category-item"
                  >
                    {category?.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="recent-posts">
              <h3>Recent Posts</h3>
              {recentPost?.map((post) => (
                <div className="recent-post-item" key={post?.id}>
                  <Link to={`/pages/blogs/${post?.slug}`}>
                    <h4>{post?.title}</h4>
                    <img
                      src={`${imgUrl}${post?.blog_image?.url}`}
                      alt="Thumbnail"
                      className="recent-post-image"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BlogsDetailsPage;
