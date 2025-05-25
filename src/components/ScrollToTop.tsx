import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function ScrollToTop() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, JSON.stringify(params)]);

  return null;
}

export default ScrollToTop;
