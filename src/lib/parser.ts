export const dateParser = (date: string): string | null => {
  try {
    const formatDate = new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formatDate;
  } catch (err) {
    return null;
  }
};


export const keywordsParser = (keywords: string) => {
  try {
    const parsedKeywords = keywords.split(',')
    return parsedKeywords.map((keyword) => keyword.trim());
  } catch (err) {

  }
}