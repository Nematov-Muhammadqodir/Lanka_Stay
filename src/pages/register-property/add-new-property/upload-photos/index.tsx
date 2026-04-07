import React, { useEffect, useState } from "react";
import withLayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import { Button, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import LayoutCreateAccountMain from "@/src/libs/components/layout/registerProperty/create-account/CreateAccountMainLayout";
import axios from "axios";
import { getJwtToken, getPartnerJwtToken } from "@/src/libs/auth";
import { sweetMixinErrorAlert } from "@/src/libs/sweetAlert";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { UPDATE_PARTNER_PROPERTY } from "@/apollo/user/mutation";
import { GET_PARTNER_PROPERTY_BY_HOTEL_OWNER } from "@/apollo/user/query";
import { partnerVar } from "@/apollo/store";
import { T } from "@/src/libs/types/common";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UploadPhotos = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [images, setImages] = useState<string[]>([]);
  const token = getPartnerJwtToken();
  const partner = useReactiveVar(partnerVar);
  const [partnerPropertyId, setPartnerPropertyId] = useState("");
  console.log("partnerPropertyId", partnerPropertyId);

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /** APOLLO REQUESTS **/
  const [updatePartnerProperty] = useMutation(UPDATE_PARTNER_PROPERTY);

  /** APOLLO REQUESTS **/
  const {
    loading: getPartnerPropertyByHotelOwnerLoading,
    data: getPartnerPropertyByHotelOwnerData,
    error: getPartnerPropertyByHotelOwnerError,
    refetch: getPartnerPropertyByHotelOwnerRefetch,
  } = useQuery(GET_PARTNER_PROPERTY_BY_HOTEL_OWNER, {
    fetchPolicy: "network-only",
    variables: { input: partner?._id },
    skip: !partner._id,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (getPartnerPropertyByHotelOwnerData) {
      setPartnerPropertyId(
        getPartnerPropertyByHotelOwnerData.getPartnerPropertyByHotelOwner._id
      );
    }
  }, [getPartnerPropertyByHotelOwnerData]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newOrder = reorder(
      images,
      result.source.index,
      result.destination.index
    );
    setImages(newOrder);
  };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  async function uploadImages(selectedFiles: FileList) {
    try {
      if (!selectedFiles || selectedFiles.length === 0) {
        throw new Error("Please select images to upload.");
      }

      const formData = new FormData();
      const fileCount = selectedFiles.length;

      const operations = {
        query: `
          mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
            imagesUploader(files: $files, target: $target)
          }
        `,
        variables: {
          files: new Array(fileCount).fill(null),
          target: "partnerProperties",
        },
      };

      formData.append("operations", JSON.stringify(operations));

      const map: Record<string, string[]> = {};
      for (let i = 0; i < fileCount; i++) {
        map[i] = [`variables.files.${i}`];
      }
      formData.append("map", JSON.stringify(map));

      for (let i = 0; i < fileCount; i++) {
        const file = selectedFiles[i]; // properly typed!
        formData.append(String(i), file);
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

      await updatePartnerProperty({
        variables: {
          input: {
            _id: partnerPropertyId,
            propertyImages: response.data.data.imagesUploader,
          },
        },
      });

      console.log("response.data", response.data.data.imagesUploader);

      return response.data.data.imagesUploader;
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
      return null;
    }
  }

  return (
    <LayoutCreateAccountMain>
      <Stack sx={{ backgroundColor: "#FAF8FA", height: "auto", pb: 20 }}>
        <Stack className="container">
          <Stack sx={{ mt: 10, gap: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              What does your hotel look like?
            </Typography>
            <Stack sx={{ flexDirection: "row", gap: 3 }}>
              <Stack
                width={500}
                height={"auto"}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={1.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Typography className="bold-text-medium">
                  Upload at least 5 photos of your property. The more you
                  upload, the more likely you are to get bookings. You can add
                  more later.
                </Typography>

                <Stack
                  sx={{
                    width: "450px",
                    height: "auto",
                    border: "2px dashed",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <Stack
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 70, color: "#EDEDED" }} />
                    <Typography className="bold-text-medium">
                      Grag and drop or
                    </Typography>
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{ color: "primary.main", mt: 1 }}
                    >
                      Upload files
                      <VisuallyHiddenInput
                        type="file"
                        multiple
                        onChange={async (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const files = event.target.files;
                          if (!files) return;

                          // Preview
                          const imageUrls = Array.from(files).map((file) =>
                            URL.createObjectURL(file)
                          );
                          setImages((prev) => [...prev, ...imageUrls]);

                          // Upload
                          await uploadImages(files);
                        }}
                      />
                    </Button>
                    <Typography className="small-text" sx={{ mt: 1 }}>
                      jpg/jpeg or png, maximum 47MB each
                    </Typography>
                  </Stack>
                </Stack>

                {images.length > 0 && (
                  <Stack>
                    <Stack sx={{ gap: 2 }}>
                      <Typography className="small-text">
                        Choose a main photo that will make a good first
                        impression
                      </Typography>
                      <Typography className="small-text">
                        Click and drag the photos to arrange them in the order
                        you would like guests to see them
                      </Typography>
                    </Stack>

                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="images" direction="horizontal">
                        {(provided) => (
                          <Stack
                            className="uploaded-photos"
                            sx={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              gap: 1,
                              mt: 2,
                            }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {images.map((src, index) => (
                              <Draggable
                                key={src}
                                draggableId={src}
                                index={index}
                              >
                                {(provided) => (
                                  <img
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    src={src}
                                    style={{
                                      width: 220,
                                      height: 220,
                                      objectFit: "cover",
                                      borderRadius: 6,
                                      border: "1px solid #E7E7E7",
                                      ...provided.draggableProps.style,
                                    }}
                                  />
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Stack>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Stack>
                )}
              </Stack>

              <Stack
                width={400}
                height={310}
                border={"1px solid black"}
                sx={{ backgroundColor: "white" }}
                p={2}
                gap={1.5}
                borderRadius={2}
                borderColor={"#E7E7E7"}
              >
                <Stack gap={1} sx={{ flexDirection: "row" }}>
                  <LightbulbIcon />
                  <Typography className="bold-text-medium">
                    What if I don't have professional photos?
                  </Typography>
                </Stack>

                <Typography>
                  No problem! You can use a smartphone or a digital camera.Here
                  are some tips for taking great photos of your property
                </Typography>
                <Button
                  sx={{
                    alignItems: "start",
                    textAlign: "start",
                  }}
                  onClick={handleClickOpen("paper")}
                >
                  <Typography
                    sx={{ textTransform: "initial", color: "primary.main" }}
                  >
                    Here are some tips for taking great photos of your property
                  </Typography>
                </Button>

                <Typography>
                  If you don’t know who took a photo, it's best to avoid using
                  it. Only use photos others have taken if you have permission.
                </Typography>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                  <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      <Stack sx={{ gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                          Here are some tips on taking great photos of your
                          property
                        </Typography>

                        <Stack gap={2}>
                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <CheckIcon />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Getting your first booking
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                For your property to appear and to start getting
                                bookings on our website, your photos should show
                                how your property looks now.
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <CheckIcon />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                The perfect property photo
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                The best selection of photos should feature the
                                interior and exterior of your property,
                                including any living rooms, bedrooms, bathrooms,
                                gardens, the kitchen, and facilities such as the
                                swimming pool or spa. And if you’ve got a great
                                view from the window or balcony, show it off!
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <CheckIcon />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Landscape over portrait
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                Take your photos in landscape format, this will
                                help you capture as much of your space as
                                possible in the photos.
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <CheckIcon />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Day shots
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                Take your photos during the day. Open your
                                curtains and turn on all the lights to shine the
                                best light on your property.
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <DoNotDisturbIcon sx={{ color: "red" }} />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Writing and screens
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                For privacy protection, make sure that your
                                photos don’t feature vehicle licence plates, tv,
                                computer, or laptop screens.
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <DoNotDisturbIcon sx={{ color: "red" }} />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Screenshots and maps
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                We’ll provide your guests with maps and
                                directions, so there’s no need to add
                                screenshots of websites or maps yourself.
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            sx={{
                              flexDirection: "row",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <DoNotDisturbIcon sx={{ color: "red" }} />
                            <Stack>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                Watermarks and logos
                              </Typography>
                              <Typography sx={{ color: "gray", fontSize: 15 }}>
                                Avoid putting watermarks, hotel rates or logos
                                that aren’t from your property on your photos.
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 500,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  height: 40,
                  fontWeight: "bold",
                  width: "30%",
                }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/add-property-rooms/room-name"
                  )
                }
              >
                <KeyboardArrowLeftIcon />
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: 40,
                  color: "white",
                  fontWeight: "bold",
                  width: "68%",
                }}
                onClick={() =>
                  router.push(
                    "/register-property/add-new-property/property-details-complete"
                  )
                }
              >
                Continue
              </Button>
            </Stack>
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
export default UploadPhotos;
