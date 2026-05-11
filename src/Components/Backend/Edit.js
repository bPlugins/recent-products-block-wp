import { useEffect, useMemo, useState } from "react";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { Disabled, Spinner } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";

import { tabController } from "../../../../bpl-tools/utils/functions";
import Frontend from "../Frontend/Frontend";
import Settings from "./Settings/Settings";
import { useBlockProps } from "@wordpress/block-editor";
import ClipBoard from "./Settings/ClipBoard";

/**
 * Remove empty / default-ish values to reduce payload size.
 * This is optional but strongly recommended.
 */
const pruneEmpty = (value) => {
  if (value === null || value === undefined) return undefined;

  // Keep booleans/numbers
  if (typeof value === "boolean" || typeof value === "number") return value;

  // Remove empty strings
  if (typeof value === "string") return value.trim() === "" ? undefined : value;

  // Arrays
  if (Array.isArray(value)) {
    const arr = value
      .map(pruneEmpty)
      .filter((v) => v !== undefined && v !== null);
    return arr.length ? arr : undefined;
  }

  // Objects
  if (typeof value === "object") {
    const out = {};
    Object.keys(value).forEach((k) => {
      const v = pruneEmpty(value[k]);
      if (v !== undefined) out[k] = v;
    });
    return Object.keys(out).length ? out : undefined;
  }

  return value;
};

const PostServerSideRender = ({
  block,
  attributes,
  LoadingResponsePlaceholder,
}) => {
  const [rendered, setRendered] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Optional: prune to shrink payload (helps performance and avoids huge requests)
  const cleanAttributes = useMemo(() => {
    const pruned = pruneEmpty(attributes);
    // If everything was pruned (unlikely), keep original
    return pruned && typeof pruned === "object" ? pruned : attributes;
  }, [attributes]);

  useEffect(() => {
    let alive = true;

    setIsLoading(true);
    setErrorMsg("");

    apiFetch({
      path: `/wp/v2/block-renderer/${block}?context=edit`,
      method: "POST",
      data: {
        attributes: cleanAttributes,
      },
    })
      .then((res) => {
        if (!alive) return;
        setRendered(res?.rendered ?? "");
        setIsLoading(false);
      })
      .catch((err) => {
        if (!alive) return;

        // This catches 414, 500, HTML responses, etc.
        setRendered("");
        setIsLoading(false);

        const msg =
          err?.message ||
          __(
            "Error loading block preview. Please check console/server logs.",
            "recent-products",
          );

        setErrorMsg(msg);
      });

    return () => {
      alive = false;
    };
  }, [block, cleanAttributes]);

  const Placeholder = LoadingResponsePlaceholder;

  return (
    <Placeholder showLoader={isLoading}>
      {errorMsg ? (
        <div className="wrpError">
          <strong>{__("Error:", "recent-products")}</strong> {errorMsg}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: rendered }} />
      )}
    </Placeholder>
  );
};

const Edit = (props) => {
  const {
    name,
    attributes,
    setAttributes,
    clientId,
    isSelected,
    allCategories,
    deviceDetect,
    CPTType,
    currentPostId,
  } = props || {};

  const { options } = attributes || {};
  const { theme = "default" } = options || {};
  const shortcode = `[wrpb id=${currentPostId}]`;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId.substring(0, 10) });
  }, [clientId]);

  useEffect(() => tabController(), [isSelected]);

  return (
    <div {...useBlockProps({ draggable: false })}>
      <Settings
        attributes={attributes}
        device={deviceDetect}
        setAttributes={setAttributes}
        allCategories={allCategories}
      />
      {CPTType === "wrpb" && <ClipBoard shortcode={shortcode} />}

      {theme === "advanced" ? (
        <Frontend />
      ) : (
        <Disabled>
          <PostServerSideRender
            block={name}
            attributes={attributes}
            LoadingResponsePlaceholder={Loading}
          />
        </Disabled>
      )}
    </div>
  );
};

export default withSelect((select) => {
  const editor = select("core/editor");
  const core = select("core");

  const deviceDetect = editor.getDeviceType?.()?.toLowerCase() || "desktop";
  const CPTType = editor.getCurrentPostType?.();
  const currentPostId = editor.getCurrentPostId?.();

  const allCategories = core.getEntityRecords("taxonomy", "product_cat", {
    per_page: -1,
  });

  return {
    allCategories,
    deviceDetect,
    CPTType,
    currentPostId,
  };
})(Edit);

const Loading = ({ children, showLoader }) => (
  <div className={`wrpLoader ${showLoader ? "showLoader" : ""}`}>
    {showLoader && (
      <h3 className="wrpLoading">
        <Spinner /> {__("Loading...", "recent-products")}
      </h3>
    )}
    {children}
  </div>
);
