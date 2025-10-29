import { Button, Dialog, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploaderMenuProps {
  open: boolean;
  handleClose: () => void;
}

const ImageUploaderMenu: React.FC<ImageUploaderMenuProps> = ({
  open,
  handleClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        sx: { borderRadius: 2, p: 3, width: 380 },
      }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        gap={3}
      >
        <Image
          src={previewUrl ?? "/img/logo/uniface.jpg"}
          alt="user-image"
          width={130}
          height={130}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid",
            borderColor: "#FFB700",
          }}
        />
        <Stack gap={1}>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Select an image to upload
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            onClick={handleSelectFile}
            sx={{ alignSelf: "start", textTransform: "capitalize" }}
          >
            Select file
          </Button>
          <Button variant="contained" sx={{ color: "primary.contrastText" }}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ImageUploaderMenu;
