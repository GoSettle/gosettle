import { useEffect } from 'react';

export default function useSEO({ title, description, keywords }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | GoSettle`;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
  }, [title, description, keywords]);
}
