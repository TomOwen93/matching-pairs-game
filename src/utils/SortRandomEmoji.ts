export function randomSortEmoji(arr: string[]): string[] {
  const randomEmojis: string[] = [...arr];

  for (let i = randomEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = randomEmojis[i];
    randomEmojis[i] = randomEmojis[j];
    randomEmojis[j] = temp;
  }

  return randomEmojis;
}
