import { useState } from "react";
import { __ } from "@wordpress/i18n";

const ClipBoard = ({ shortcode }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shortcode);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");

        textArea.value = shortcode;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
      }

      setHasCopied(true);

      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section
      style={{
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          boxShadow: "0px 0px 0px transparent",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: 500,
            marginBottom: "10px",
          }}
        >
          {__(
            "Copy and paste this shortcode anywhere on your site.",
            "recent-products-block"
          )}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            border: "none",
            background: "rgb(69, 39, 164)",
            color: "#fff",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "15px",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          {hasCopied
            ? __("Copied Shortcode!", "recent-products-block")
            : shortcode}
        </button>
      </div>
    </section>
  );
};

export default ClipBoard;