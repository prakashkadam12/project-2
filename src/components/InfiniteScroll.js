import React, { useEffect } from 'react';

const InfiniteScroll = ({ onScroll, hasMore, children }) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        onScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScroll, hasMore]);

  return <>{children}</>;
};

export default InfiniteScroll;
