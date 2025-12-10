import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface ReviewCardProps {
  name: string;
  src: string;
  review: string;
  id: any;
  country: string;
}

const ReviewCard = ({ name, src, review, id, country }: ReviewCardProps) => {
  return (
    <Stack
      border={"1px solid"}
      width={360}
      maxHeight={230}
      p={2}
      gap={1}
      borderColor={"secondary.main"}
      borderRadius={2}
    >
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <Image
          src={
            src ? `${process.env.NEXT_PUBLIC_API_URL}/${src}` : "/img/hotel.jpg"
          }
          alt="user-image"
          width={40}
          height={40}
          style={{ objectFit: "cover", borderRadius: 200 }}
        />
        <Stack>
          <Typography fontWeight={700}>{name}</Typography>
          <Typography className="small-text">{country}</Typography>
        </Stack>
      </Stack>
      <Stack maxHeight={200} overflow={"auto"}>
        <Typography sx={{ fontStyle: "italic" }}>{review}</Typography>
      </Stack>
      <Button
        sx={{ textTransform: "capitalize", color: "primary.main", width: 90 }}
      >
        Read more
      </Button>
    </Stack>
  );
};

export default ReviewCard;
