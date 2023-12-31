import React, { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import "./addBlog.css";
import RichText from "./richTextEditor";
import ImageUpload from "./dropzone";
import DropZone from "./dropzone";
import { imgdb } from "./firebase";
import { txtdb } from "./firebase";
import { v4 } from "uuid";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "./firebase";
import { updateCurrentUser } from "firebase/auth";
const content = '<h2 style="text-align: center;">..</h2>';

function AddBlog() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");

  const user = auth.currentUser;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  const handlePublishClick = async () => {
    const imgs = ref(imgdb, `Imgs/${v4()}`);

    const data = await uploadBytes(imgs, image);
    const val = await getDownloadURL(data.ref);
    setImageURL(val);
    console.log(val);

    const valRef = collection(txtdb, "formData");
    await addDoc(valRef, {
      userId: user.uid,
      titleVal: title,
      bodyVal: editor.getText(),
      imgURL: val,
    });

    alert("Data added successfully");
  };

  return (
    <div className="addBlog-container">
      <div className="addBlog-form">
        <div className="addBlog-header">Create Blog</div>
        <div className="addBlog-content">
          <TextInput
            className="title-input"
            styles={{
              label: {
                marginRight: "40rem",
                fontSize: "20px",
                fontWeight: "bold",
              },
            }}
            variant="default"
            size="md"
            label="Enter Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="content-heading">Enter Blog Content</p>

          <div className="richbox">
            <RichText editorProp={editor} />
          </div>
          <p className="content-heading">Upload Image</p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50rem",
            marginTop: "-1rem",
          }}
        >
          <DropZone image={image} setImage={setImage} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
            color="red"
            size="lg"
            onClick={() => handlePublishClick()}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
