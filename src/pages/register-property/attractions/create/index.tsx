import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  styled,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { useReactiveVar, useMutation } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { CREATE_ATTRACTION, UPDATE_ATTRACTION } from "@/apollo/user/mutation";
import {
  sweetErrorAlert,
  sweetTopSuccessAlert,
  sweetMixinErrorAlert,
} from "@/src/libs/sweetAlert";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getPartnerJwtToken } from "@/src/libs/auth";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ATTRACTION_TYPES = [
  { value: "TOUR", label: "Tour" },
  { value: "MUSEUM", label: "Museum" },
  { value: "THEME_PARK", label: "Theme Park" },
  { value: "SHOW", label: "Show" },
  { value: "ACTIVITY", label: "Activity" },
  { value: "LANDMARK", label: "Landmark" },
  { value: "WATER_PARK", label: "Water Park" },
  { value: "ZOO", label: "Zoo" },
];

const CreateAttraction = () => {
  const router = useRouter();
  const partner = useReactiveVar(partnerVar);
  const [createAttraction, { loading }] = useMutation(CREATE_ATTRACTION);
  const [updateAttraction] = useMutation(UPDATE_ATTRACTION);
  const token = getPartnerJwtToken();

  const [form, setForm] = useState({
    attractionName: "",
    attractionType: "",
    attractionDescription: "",
    attractionCountry: "",
    attractionRegion: "",
    attractionCity: "",
    attractionAdultPrice: "",
    attractionChildPrice: "",
    attractionDuration: "",
    maxParticipants: "",
    attractionHighlights: "",
    freeCancellation: false,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!partner?._id) {
      router.push("/register-property/create-account");
    }
  }, [partner]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[] | null> => {
    try {
      const formData = new FormData();
      const fileCount = imageFiles.length;

      const operations = {
        query: `
          mutation ImagesUploader($files: [Upload!]!, $target: String!) {
            imagesUploader(files: $files, target: $target)
          }
        `,
        variables: {
          files: new Array(fileCount).fill(null),
          target: "attractions",
        },
      };

      formData.append("operations", JSON.stringify(operations));

      const map: Record<string, string[]> = {};
      for (let i = 0; i < fileCount; i++) {
        map[i] = [`variables.files.${i}`];
      }
      formData.append("map", JSON.stringify(map));

      for (let i = 0; i < fileCount; i++) {
        formData.append(String(i), imageFiles[i]);
      }

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_GRAPHQL_URL!,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "apollo-require-preflight": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data.imagesUploader;
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!form.attractionName.trim()) {
      await sweetErrorAlert("Please enter an attraction name");
      return;
    }
    if (!form.attractionType) {
      await sweetErrorAlert("Please select an attraction type");
      return;
    }
    if (imageFiles.length === 0) {
      await sweetErrorAlert("Please upload at least one image");
      return;
    }

    try {
      setUploading(true);

      // 1. Upload images first
      const uploadedUrls = await uploadImages();
      if (!uploadedUrls || uploadedUrls.length === 0) {
        await sweetErrorAlert("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }

      // 2. Create attraction
      const input: any = {
        partnerId: partner._id,
        attractionName: form.attractionName,
        attractionType: form.attractionType,
        attractionDescription: form.attractionDescription,
        attractionCountry: form.attractionCountry,
        attractionRegion: form.attractionRegion,
        attractionCity: form.attractionCity,
        attractionDuration: form.attractionDuration,
        freeCancellation: form.freeCancellation,
        attractionImages: uploadedUrls,
        attractionHighlights: form.attractionHighlights
          ? form.attractionHighlights
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [],
      };

      if (form.attractionAdultPrice) {
        input.attractionAdultPrice = Number(form.attractionAdultPrice);
      }
      if (form.attractionChildPrice) {
        input.attractionChildPrice = Number(form.attractionChildPrice);
      }
      if (form.maxParticipants) {
        input.maxParticipants = Number(form.maxParticipants);
      }

      await createAttraction({
        variables: { input },
      });

      await sweetTopSuccessAlert("Attraction created successfully!", 1500);
      router.push("/register-property/dashboard");
    } catch (err: any) {
      console.error("Create attraction error:", err);
      await sweetErrorAlert(err.message || "Failed to create attraction");
    } finally {
      setUploading(false);
    }
  };

  if (!partner?._id) return null;

  return (
    <LayoutCreateAccountMain>
      <Stack
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          alignItems: "center",
          pb: 6,
        }}
      >
        <Stack width={600} mt={4} gap={3}>
          <Typography fontWeight={700} fontSize={26}>
            Create New Attraction
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            Fill in the details below to list your attraction.
          </Typography>

          <Stack gap={2.5}>
            <TextField
              label="Attraction Name"
              value={form.attractionName}
              onChange={(e) => handleChange("attractionName", e.target.value)}
              fullWidth
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Attraction Type</InputLabel>
              <Select
                value={form.attractionType}
                label="Attraction Type"
                onChange={(e) => handleChange("attractionType", e.target.value)}
              >
                {ATTRACTION_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Description"
              value={form.attractionDescription}
              onChange={(e) =>
                handleChange("attractionDescription", e.target.value)
              }
              fullWidth
              multiline
              rows={4}
            />

            <Stack direction="row" gap={2}>
              <Stack flex={1} gap={0.5}>
                <Typography fontSize={13} fontWeight={500}>
                  Country
                </Typography>
                <CountryDropdown
                  value={form.attractionCountry}
                  onChange={(val) => {
                    handleChange("attractionCountry", val);
                    handleChange("attractionRegion", "");
                  }}
                  style={{
                    padding: 14,
                    fontSize: 16,
                    borderRadius: 4,
                    borderColor: "#c4c4c4",
                    border: "1px solid #c4c4c4",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                />
              </Stack>
              <Stack flex={1} gap={0.5}>
                <Typography fontSize={13} fontWeight={500}>
                  Region
                </Typography>
                <RegionDropdown
                  country={form.attractionCountry}
                  value={form.attractionRegion}
                  onChange={(val) => handleChange("attractionRegion", val)}
                  style={{
                    padding: 14,
                    fontSize: 16,
                    borderRadius: 4,
                    borderColor: "#c4c4c4",
                    border: "1px solid #c4c4c4",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                  disableWhenEmpty={true}
                />
              </Stack>
              <Stack flex={1}>
                <Typography fontSize={13} fontWeight={500} mb={0.5}>
                  City
                </Typography>
                <TextField
                  value={form.attractionCity}
                  onChange={(e) =>
                    handleChange("attractionCity", e.target.value)
                  }
                  fullWidth
                  placeholder="Enter city"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": { height: 49 },
                  }}
                />
              </Stack>
            </Stack>

            <Stack direction="row" gap={2}>
              <TextField
                label="Adult Price"
                type="number"
                value={form.attractionAdultPrice}
                onChange={(e) =>
                  handleChange("attractionAdultPrice", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Child Price"
                type="number"
                value={form.attractionChildPrice}
                onChange={(e) =>
                  handleChange("attractionChildPrice", e.target.value)
                }
                fullWidth
              />
            </Stack>

            <Stack direction="row" gap={2}>
              <TextField
                label="Duration (e.g. 2 hours)"
                value={form.attractionDuration}
                onChange={(e) =>
                  handleChange("attractionDuration", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Max Participants"
                type="number"
                value={form.maxParticipants}
                onChange={(e) =>
                  handleChange("maxParticipants", e.target.value)
                }
                fullWidth
              />
            </Stack>

            <TextField
              label="Highlights (comma-separated)"
              value={form.attractionHighlights}
              onChange={(e) =>
                handleChange("attractionHighlights", e.target.value)
              }
              fullWidth
              placeholder="e.g. Scenic views, Guided tour, Lunch included"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.freeCancellation}
                  onChange={(e) =>
                    handleChange("freeCancellation", e.target.checked)
                  }
                />
              }
              label="Free Cancellation"
            />

            {/* Image Upload Section */}
            <Stack
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2.5,
                backgroundColor: "background.paper",
              }}
              gap={2}
            >
              <Typography fontWeight={700} fontSize={16}>
                Attraction Photos *
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                Upload at least 1 photo. Supported formats: JPG, JPEG, PNG (max
                15MB each).
              </Typography>

              <Stack
                sx={{
                  border: "2px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                  px: 2,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                <PhotoCameraIcon
                  sx={{ fontSize: 50, color: "text.disabled", mb: 1 }}
                />
                <Typography fontSize={14} color="text.secondary" mb={1}>
                  Drag and drop or
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Upload Photos
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageSelect}
                  />
                </Button>
              </Stack>

              {imagePreviews.length > 0 && (
                <Stack direction="row" flexWrap="wrap" gap={1.5} mt={1}>
                  {imagePreviews.map((src, index) => (
                    <Stack
                      key={src}
                      position="relative"
                      sx={{
                        width: 130,
                        height: 130,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: index === 0 ? "2px solid" : "1px solid",
                        borderColor:
                          index === 0 ? "primary.main" : "divider",
                      }}
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {index === 0 && (
                        <Typography
                          fontSize={10}
                          fontWeight={700}
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "primary.main",
                            color: "white",
                            textAlign: "center",
                            py: 0.3,
                          }}
                        >
                          MAIN
                        </Typography>
                      )}
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "white",
                          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          width: 22,
                          height: 22,
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || uploading}
              sx={{
                height: 50,
                backgroundColor: "#086CE4",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: 18,
                color: "white",
              }}
            >
              {uploading
                ? "Uploading Images..."
                : loading
                ? "Creating..."
                : "Create Attraction"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutCreateAccountMain>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ko", ["common"])),
  },
});
export default CreateAttraction;
