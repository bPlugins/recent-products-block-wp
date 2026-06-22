
import "./style.scss";


document.addEventListener("DOMContentLoaded", () => {
  const wooCommerceRecentProductsEls = document.querySelectorAll(
    ".wp-block-wrp-recent-products"
  );
  wooCommerceRecentProductsEls.forEach((wooCommerceRecentProductsEl) => {





    wooCommerceRecentProductsEl?.removeAttribute("data-attributes");
  });
});
