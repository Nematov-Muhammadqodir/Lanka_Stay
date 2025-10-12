import { Stack, Typography } from "@mui/material";
import Image from "next/image";

const ExploreCard = () => {
  return (
    <Stack
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack height={135} width={170}>
        <Image
          src="/img/tangerine.jpg"
          alt="user-image"
          width={170}
          height={135}
          style={{ objectFit: "cover", borderRadius: 15 }}
        />
      </Stack>
      <Stack height={65} paddingY={1}>
        <Typography fontWeight={700}>Jeju</Typography>
        <Typography>218 properties</Typography>
      </Stack>
    </Stack>
  );
};

export default ExploreCard;
