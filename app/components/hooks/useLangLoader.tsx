import React, { useEffect } from 'react'

function useLangLoader() {

  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    
    // Set the script src to the external script URL
    script.src = 'https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&amp;pageLang=en&amp;widgetTheme=light&amp;autoMode=false';
    
    // Optional: Add attributes like async or defer
    script.async = true;
    
    // Append the script to the document body or head
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty dependency array ensures this runs only on mount

  return (
    <div />
  )
}

export default useLangLoader