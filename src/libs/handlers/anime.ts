export function splitText(selector: string) {
  const el = document.querySelector(selector);
  if (!el) throw new Error("Element not found: " + selector);

  const words = el.textContent!.trim().split(" ");

  el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");

  return {
    $target: el,
    words: Array.from(el.querySelectorAll(".word")) as HTMLElement[],
  };
}
