import { sweetMixinErrorAlert } from "./sweetAlert";

export function formatMessageTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export const likeTargetPropertyHandler = async (
  likeTargetProperty: any,
  id: string
) => {
  try {
    await likeTargetProperty({
      variables: {
        input: id,
      },
    });
  } catch (err: any) {
    console.log("ERROR, likeTargetPropertyHandler:", err.message);
    sweetMixinErrorAlert(err.message).then();
  }
};

export function formatShortDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar...

  return `${day} ${month}`;
}
