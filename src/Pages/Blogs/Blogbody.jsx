import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Blogbody.css"; // Import custom CSS for additional styling if needed
import { Link } from "react-router-dom";

const BlogPage = ({ blogs }) => {
  const ImgUrl = "http://localhost:1337";

  if (!blogs || blogs.length === 0) {
    return (
      <div
        className="container mt-5"
        style={{
          maxWidth: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <img src="not-found.png" alt="Not Found" />
      </div>
    );
  }

  return (
    <>
      {/* Blog Page Header */}

      <title>Blog Page</title>

      <div className="container mt-5">
        <div className="row">
          {blogs?.map((blog, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
              {/* Dynamic Helmet for each blog */}

              <div className="card h-100 shadow-sm">
                {/* Image URL handling */}
                <img
                  src={`${ImgUrl}${blog?.blog_image?.url}`}
                  className="card-img-top"
                  alt={blog?.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{blog?.title}</h5>
                  <p className="card-text">{blog?.description}</p>
                  <p className="card-meta text-muted">
                    {new Date(blog?.publishedAt).toLocaleDateString()} |{" "}
                    {blog?.author?.name}
                  </p>
                </div>
                <Link to={`/blogs/${blog?.slug}`} className="btn btn-primary m-2">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
