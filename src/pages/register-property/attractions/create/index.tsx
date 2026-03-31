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
} from "@mui/material";
import { useRouter } from "next/router";
import { useReactiveVar, useMutation } from "@apollo/client";
import { partnerVar } from "@/apollo/store";
import { CREATE_ATTRACTION } from "@/apollo/user/mutation";
import { sweetErrorAlert, sweetTopSuccessAlert } from "@/src/libs/sweetAlert";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";

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

  useEffect(() => {
    if (!partner?._id) {
      router.push("/register-property/create-account");
    }
  }, [partner]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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

    try {
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
        attractionHighlights: form.attractionHighlights
          ? form.attractionHighlights.split(",").map((s: string) => s.trim()).filter(Boolean)
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
              <TextField
                label="Country"
                value={form.attractionCountry}
                onChange={(e) =>
                  handleChange("attractionCountry", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Region"
                value={form.attractionRegion}
                onChange={(e) =>
                  handleChange("attractionRegion", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="City"
                value={form.attractionCity}
                onChange={(e) => handleChange("attractionCity", e.target.value)}
                fullWidth
              />
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

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                height: 50,
                backgroundColor: "#086CE4",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: 18,
                color: "white",
              }}
            >
              {loading ? "Creating..." : "Create Attraction"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutCreateAccountMain>
  );
};

export default CreateAttraction;
