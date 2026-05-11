
import "./style.scss";
// import { createRoot } from "react-dom";

document.addEventListener("DOMContentLoaded", () => {
  const wooCommerceRecentProductsEls = document.querySelectorAll(
    ".wp-block-wrp-recent-products"
  );
  wooCommerceRecentProductsEls.forEach((wooCommerceRecentProductsEl) => {
    // let attributes = {};
    try {
      // attributes = wooCommerceRecentProductsEl.dataset.attributes
      //   ? JSON.parse(wooCommerceRecentProductsEl.dataset.attributes)
      //   : {};
    } catch (error) {
      // console.error("WRP: failed to parse attributes", error);
    }
    // const {options}=attributes || {}
    // const {theme="default"}=options || {}
   

    // if(theme === 'advanced'){
      // createRoot(wooCommerceRecentProductsEl).render(
      //   <>
      //     {/* <Style attributes={attributes} id={wooCommerceRecentProductsEl.id}/> */}
      //     <Frontend attributes={"Tanin"}/>
      //     <h1>hello world</h1>
          
      //   </>
      // );
  

    // }


  
    wooCommerceRecentProductsEl?.removeAttribute("data-attributes");
  });
});
