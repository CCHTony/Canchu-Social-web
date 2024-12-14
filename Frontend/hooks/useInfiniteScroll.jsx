import { useEffect, useState } from "react";

const useInfiniteScroll = (callback, distance = 100) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkScrollPosition = async () => {
      // 如果已經滾動到接近頁面底部（距離底部 100px 內），執行 callback 函數
      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop;
      const pageHeight = document.documentElement.offsetHeight;
      const isScrollToPosition = scrollBottom >= pageHeight  - distance;

      // console.log(`loading 狀態: ${isLoading}`);
      if (isScrollToPosition && !isLoading) {
        // console.log(`有 scroll 到定點嗎: ${isScrollToPosition}`);
        setIsLoading(true);
        // console.log(`execute callback`);
        await callback();
        setIsLoading(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      // console.log('remove Listener');
      window.removeEventListener("scroll", checkScrollPosition)
    }
      ;
  }, [callback]);

  return isLoading;
};

export default useInfiniteScroll;
