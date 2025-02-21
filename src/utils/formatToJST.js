export const formatToJST = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  };
  

  