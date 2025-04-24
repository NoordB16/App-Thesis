const iconDictionary: Record<string, string> = {
  meeting: '📅',
  call: '📞',
  gym: '🏋️',
  workout: '🏋️',
  study: '📚',
  read: '📖',
  shopping: '🛒',
  cook: '👨‍🍳',
  clean: '🧹',
  write: '✍️',
  code: '💻',
  design: '🎨',
  music: '🎵',
  movie: '🎬',
  travel: '✈️',
  default: '📝',
};

export function generateTaskIcon(title: string): string {
  const lowercaseTitle = title.toLowerCase();
  
  for (const [keyword, icon] of Object.entries(iconDictionary)) {
    if (lowercaseTitle.includes(keyword)) {
      return icon;
    }
  }

  return iconDictionary.default;
}