import { useEffect } from "react";
import { useLocation } from "react-router";

const GA_MEASUREMENT_ID = "G-5M74B80HJK";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}