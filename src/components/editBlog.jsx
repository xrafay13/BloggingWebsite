import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { txtdb } from "./firebase";
import { Button } from "@mantine/core";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function EditBlog() {
  const user = auth.currentUser;
  const [blogs, setBlogs] = useState([]);
  const [editModes, setEditModes] = useState({});

  useEffect(() => {
    if (user) {
      const q = query(
        collection(txtdb, "formData"),
        where("userId", "==", user.uid)
      );

      getDocs(q)
        .then((querySnapshot) => {
          const userBlogs = [];
          querySnapshot.forEach((doc) => {
            userBlogs.push({ id: doc.id, ...doc.data() });
          });
          setBlogs(userBlogs);
        })
        .catch((error) => {
          console.error("Error getting blogs:", error);
        });
    }
  }, [user]);

  const toggleEditMode = (blogId) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [blogId]: !prevEditModes[blogId],
    }));
  };

  const handleSave = async (blogId, updatedTitle, updatedDescription) => {
    try {
      // Update the Firestore document with the new data
      const blogRef = doc(txtdb, "formData", blogId);
      await updateDoc(blogRef, {
        titleVal: updatedTitle,
        bodyVal: updatedDescription,
      });

      // Disable edit mode after saving
      toggleEditMode(blogId);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      // Delete the blog document from Firestore
      await deleteDoc(doc(txtdb, "formData", blogId));
      // Update the state to reflect the deletion
      setBlogs((prevData) => prevData.filter((value) => value.id !== blogId));
    } catch (error) {
      alert("Error deleting blog:", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "16rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            display: "flex",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <img
            src={blog.imgURL}
            height="200px"
            width="200px"
            style={{ marginRight: "20px" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                {"Title:"}
              </h1>
              {editModes[blog.id] ? (
                <input
                  type="text"
                  value={blog.titleVal}
                  onChange={(e) => {
                    // Update the titleVal in the local state
                    const updatedTitle = e.target.value;
                    setBlogs((prevBlogs) =>
                      prevBlogs.map((prevBlog) =>
                        prevBlog.id === blog.id
                          ? { ...prevBlog, titleVal: updatedTitle }
                          : prevBlog
                      )
                    );
                  }}
                />
              ) : (
                <p
                  style={{
                    fontSize: "22px",
                    marginLeft: "8px",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  {blog.titleVal}
                </p>
              )}
              {editModes[blog.id] ? (
                <Button
                  style={{ marginLeft: "10rem" }}
                  variant="filled"
                  color="orange"
                  onClick={() =>
                    handleSave(blog.id, blog.titleVal, blog.bodyVal)
                  }
                >
                  Save
                </Button>
              ) : (
                <div style={{}}>
                  <Button
                    style={{ marginLeft: "10rem" }}
                    variant="filled"
                    color="orange"
                    onClick={() => toggleEditMode(blog.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    style={{ marginLeft: "1rem" }}
                    variant="filled"
                    color="orange"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
                {"Description:"}
              </h2>
              {editModes[blog.id] ? (
                <textarea
                  value={blog.bodyVal}
                  onChange={(e) => {
                    // Update the bodyVal in the local state
                    const updatedDescription = e.target.value;
                    setBlogs((prevBlogs) =>
                      prevBlogs.map((prevBlog) =>
                        prevBlog.id === blog.id
                          ? { ...prevBlog, bodyVal: updatedDescription }
                          : prevBlog
                      )
                    );
                  }}
                />
              ) : (
                <p style={{ fontSize: "18px", marginLeft: "8px" }}>
                  {blog.bodyVal}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditBlog;
