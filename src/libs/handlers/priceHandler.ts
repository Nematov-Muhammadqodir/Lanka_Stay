export function formatKoreanWon(price: string) {
  if (!price) return "0";

  const num = Number(price);

  return num.toLocaleString("ko-KR") + " 원";
}
