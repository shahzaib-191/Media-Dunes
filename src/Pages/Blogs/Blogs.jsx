import React, { useState, useEffect } from "react";
import "./Blogs.css"; // Custom styling
import { Container, Row, Col } from "react-bootstrap";
import Blogbody from "../Blogs/Blogbody";
// import Header from "../../Components/Header/Header";
// import Footer from "../../Components/Footer/Footer";
import axios from "axios";

const BlogPage = () => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered blogs
  const [selectedCategory, setSelectedCategory] = useState("all");
  console.log("Selected blogs:", blogs);

  // API Base URLs (Move to .env later)
  const apiUrl = "http://localhost:1337/api/";
  const imgUrl = "http://localhost:1337";

  // Fetch Categories
  const getBlogCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}categories`);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch All Blogs
  const handleAllBlogData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}articles?populate=*`);
      setBlogs(data.data);
      setFilteredBlogs(data.data); // Initially set filteredBlogs to all blogs
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle Category Click
  const handleCategoryClick = (category) => {
    console.log("Selected Category:", category);
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredBlogs(blogs); // Show all blogs if "ALL" is selected
    } else {
      const filtered = blogs?.filter((blog) =>
        blog.category?.name?.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  };

  useEffect(() => {
    handleAllBlogData();
    getBlogCategories();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Container className="my-5">
        {/* Blog Header */}
        <h1 className="text-center blog-h mb-5">UI/UX Design Blogs</h1>

        {/* Categories */}
        <Row className="justify-content-center mb-4">
          <Col xs="auto" className={`text-center category ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => handleCategoryClick("all")}
          >
            ALL
          </Col>
          {categories.length > 0 ? (
            categories?.map((category) => (
              <Col xs="auto" className={`text-center category ${selectedCategory === category?.name ? "active" : ""}`}
                key={category.id}
                onClick={() => handleCategoryClick(category?.name)}
              >
                {category?.name || "Unnamed Category"}
              </Col>
            ))
          ) : (
            <p className="text-center">No categories found</p>
          )}
        </Row>

        {/* Featured Blog Section */}
        <Row className="align-items-center blog-feature">
          <Col md={7}>
            <img
              className="image-placeholder"
              src={`${imgUrl}/uploads/sample-image.jpg`} // Update with dynamic featured image
              alt="Featured Blog"
            />
          </Col>
          <Col md={5}>
            <p className="text-muted">FEATURED</p>
            <h2>What is Dynamic Island Apple – An Updated Guide for iOS18</h2>
            <p>
              Are you also an Apple freak? Then you must know about the thrilling addition that has leveled up the entire vibe...
            </p>
            <p className="text-muted">
              <strong>Nida</strong> <br /> Author | Nov 08, 2024
            </p>
          </Col>
        </Row>
      </Container>

      <Blogbody blogs={filteredBlogs} /> {/* Show filtered blogs */}
      {/* <Footer /> */}
    </>
  );
};

export default BlogPage;
