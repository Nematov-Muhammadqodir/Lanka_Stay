export function formatKoreanWon(price: string) {
  console.log("PRICE", price);
  if (!price) return "0";

  const num = Number(price);

  return num.toLocaleString("ko-KR") + " 원";
}
