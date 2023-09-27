import { useTheme } from "@emotion/react";
import { ActionIcon, Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// import { AttachFile, Cancel } from "@mui/icons-material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Paperclip, X } from "tabler-icons-react";

export default function DropZone({ image, setImage }) {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const theme = useTheme();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      file.preview = URL.createObjectURL(file);
      setImage(file);
    },
  });
  return (
    <Box
      style={{
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: image == null ? 5 : 0,
        overflow: "hidden",
        borderWidth: "2px",
        borderStyle: "dashed",
        borderColor: isDragAccept ? "green" : isDragReject ? "red" : "gray",
        borderRadius: 16,
        width: "min(100%, 220px)",
        height: 220,
        outline: "none",
        transition: "border .24s ease-in-out",
        mx: "auto",
        textAlign: "center",
        "&:hover": {
          borderColor: "green",
        },
      }}
      {...getRootProps()}
    >
      {image == null ? (
        <>
          <input
            {...getInputProps()}
            capture="environment"
            onChange={(e) => {
              const file = e.target.files[0];
              file.preview = URL.createObjectURL(file);
              setImage(file);
            }}
          />
          <Paperclip size={"25%"} />
          {isDragActive ? (
            <Text fz="sm" mt="sm">
              Drop the file here ...
            </Text>
          ) : (
            <Text fz="sm" mt="sm">
              Drag and drop a file
              <br />
              or click to select a file
            </Text>
          )}
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <img
            src={image.preview || image}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <ActionIcon
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "white",
              backgroundColor: theme.primaryColor,
              padding: 3,
              borderRadius: "50%",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setImage(null);
            }}
          >
            <X />
          </ActionIcon>
        </Box>
      )}
    </Box>
  );
}
