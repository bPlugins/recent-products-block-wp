import { useState } from "react";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  TabPanel,
  ToggleControl,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  SelectControl,
} from "@wordpress/components";

// Settings Components
import {
  Label,
  Background,
  ColorControl,
  Device,
  ColorsControl,
  HelpPanel,
  SelectPureControl,
  ShadowControl,
  Typography,
  BBlocksAds,
  BoxControl,
  Notice,
} from "../../../../../bpl-tools/Components";

import { BorderControl } from "../../../../../bpl-tools/Components/Deprecated";

import { tabController } from "../../../../../bpl-tools/utils/functions";
import {
  pxUnit,
  perUnit,
  emUnit,
} from "../../../../../bpl-tools/utils/options";

import {
  addArrItem,
  removeArrItem,
  filterSelected,
  themeSwitch,
  toolTipPresets,
} from "../../../utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import General from "./General/General";
import Style from "./Style/Style";
import BlockPreview from "./panel/BlockPreview";

const Settings = ({ attributes, setAttributes, allCategories }) => {
  const {
    productsPerPage,
    stockStatus,
    selectedCategories,
    columns,
    columnGap,
    rowGap,
    isImage,
    isTitle,
    isRating,
    isPrice,
    isAddToCartBtn,
    textAlign,
    productBG,
    productBorder,
    productShadow,
    titleTypo,
    titleColor,
    ratingColor,
    priceTypo,
    priceColor,
    addToCartTypo,
    addToCartColors,
    onSaleColors,
    styles = {},
    selectTheme = "default",
  } = attributes;

  const [device, setDevice] = useState("desktop");

  const onStockFilterChange = (item, val) => {
    setAttributes({
      stockStatus: val
        ? [...addArrItem(stockStatus, item)]
        : [...removeArrItem(stockStatus, item)],
    });
  };

  return (
    <>
      <InspectorControls>
        <div className="bPlInspectorInfo">
          <BBlocksAds />
        </div>

        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}
          onSelect={() => tabController()}
        >
          {(tab) => (
            <>
              {"general" === tab.name && (
                <>
                  {selectTheme === "default" ? (
                    <>
                      <HelpPanel slug="recent-products-block" />

                      <PanelBody
                        className="bPlPanelBody"
                        title={__("Query", "recent-products")}
                      >
                        <Label className="mb5">
                          {__("Products Limit:", "recent-products")}
                        </Label>
                        <RangeControl
                          value={productsPerPage}
                          onChange={(val) =>
                            setAttributes({ productsPerPage: val })
                          }
                          min={1}
                          max={60}
                          step={1}
                        />

                        <hr />

                        <h3>{__("Filter by Stock", "recent-products")}</h3>
                        <ToggleControl
                          label={__(
                            "Show In Stock Products",
                            "recent-products",
                          )}
                          checked={stockStatus.includes("instock")}
                          onChange={(val) =>
                            onStockFilterChange("instock", val)
                          }
                        />

                        <ToggleControl
                          className="mt10"
                          label={__(
                            "Show Out of Stock Products",
                            "recent-products",
                          )}
                          checked={stockStatus.includes("outofstock")}
                          onChange={(val) =>
                            onStockFilterChange("outofstock", val)
                          }
                        />

                        <ToggleControl
                          className="mt10"
                          label={__(
                            "Show In On Backorder Products",
                            "recent-products",
                          )}
                          checked={stockStatus.includes("onbackorder")}
                          onChange={(val) =>
                            onStockFilterChange("onbackorder", val)
                          }
                        />

                        <hr />

                        <h3>{__("Filter by Category", "recent-products")}</h3>
                        <Label className="mb5">
                          {__("Select Categories:", "recent-products")}
                        </Label>
                        <SelectPureControl
                          value={filterSelected(
                            allCategories,
                            selectedCategories,
                          )?.map((cat) => cat)}
                          onChange={(val) =>
                            setAttributes({
                              selectedCategories: val.map((cat) => cat),
                            })
                          }
                          options={allCategories?.map((cat) => ({
                            label: `${cat.name} (${cat.count})`,
                            value: cat.slug,
                          }))}
                        />
                      </PanelBody>

                      <PanelBody
                        className="bPlPanelBody"
                        title={__("Layout", "recent-products")}
                        initialOpen={false}
                      >
                        <Notice status="premium" isIcon={false}>
                          {__(
                            "Theme-1 and Theme-2 layouts are available in the ",
                            "recent-products",
                          )}{" "}
                          <a
                            style={{}}
                            target="_blank"
                            href="/wp-admin/admin.php?page=recent-products-dashboard#/pricing"
                          >
                            Premium version
                          </a>
                        </Notice>
                        <Label className="mb5">
                          {__("Select A Theme", "recent-products")}
                        </Label>

                        <SelectControl
                          value={selectTheme}
                          options={[
                            { label: "Default", value: "default" },
                            // { label: "Theme-1", value: "themeOne" },
                            // { label: "Theme-2", value: "themeTwo" },
                          ]}
                          onChange={(val) =>
                            setAttributes(themeSwitch(val, attributes))
                          }
                        />
                        <PanelRow>
                          <Label className="mb5">
                            {__("Columns:", "recent-products")}
                          </Label>
                          <Device
                            device={device}
                            onChange={(val) => setDevice(val)}
                          />
                        </PanelRow>
                        <RangeControl
                          value={columns[device]}
                          onChange={(val) => {
                            setAttributes({
                              columns: { ...columns, [device]: val },
                            });
                          }}
                          min={1}
                          max={6}
                          step={1}
                          beforeIcon="grid-view"
                          withInputField={false}
                        />

                        <UnitControl
                          className="mt20"
                          label={__("Column Gap:", "recent-products")}
                          labelPosition="left"
                          value={columnGap}
                          onChange={(val) => setAttributes({ columnGap: val })}
                          units={[pxUnit(30), perUnit(3), emUnit(2)]}
                          isResetValueOnUnitChange={true}
                        />

                        <UnitControl
                          className="mt20"
                          label={__("Row Gap:", "recent-products")}
                          labelPosition="left"
                          value={rowGap}
                          onChange={(val) => setAttributes({ rowGap: val })}
                          units={[pxUnit(40), perUnit(3), emUnit(2.5)]}
                          isResetValueOnUnitChange={true}
                        />
                      </PanelBody>

                      <PanelBody
                        className="bPlPanelBody"
                        title={__("Elements", "recent-products")}
                        initialOpen={false}
                      >
                        <ToggleControl
                          label={__("Show Image", "recent-products")}
                          checked={isImage}
                          onChange={(val) => setAttributes({ isImage: val })}
                        />

                        <ToggleControl
                          className="mt10"
                          label={__("Show Title", "recent-products")}
                          checked={isTitle}
                          onChange={(val) => setAttributes({ isTitle: val })}
                        />

                        <ToggleControl
                          className="mt10"
                          label={__("Show Rating", "recent-products")}
                          checked={isRating}
                          onChange={(val) => setAttributes({ isRating: val })}
                        />

                        <ToggleControl
                          className="mt10"
                          label={__("Show Price", "recent-products")}
                          checked={isPrice}
                          onChange={(val) => setAttributes({ isPrice: val })}
                        />

                        <ToggleControl
                          className="mt10"
                          label={__(
                            "Show Add To Cart Button",
                            "recent-products",
                          )}
                          checked={isAddToCartBtn}
                          onChange={(val) =>
                            setAttributes({ isAddToCartBtn: val })
                          }
                        />
                      </PanelBody>
                    </>
                  ) : (
                    <General
                      attributes={attributes}
                      setAttributes={setAttributes}
                      allCategories={allCategories}
                    />
                  )}
                </>
              )}

              {"style" === tab.name && (
                <>
                  {selectTheme === "default" ? (
                    <>
                      <PanelBody
                        className="bPlPanelBody"
                        title={__("Container", "recent-products")}
                      >
                        <Background
                          label={__("Background:", "recent-products")}
                          value={styles["bg"]}
                          onChange={(val) =>
                            setAttributes({ styles: { ...styles, bg: val } })
                          }
                        />
                        <BoxControl
                          className="mt10"
                          label={__("Radius:", "recent-products")}
                          values={
                            styles["radius"] || {
                              top: "0px",
                              right: "0px",
                              bottom: "0px",
                              left: "0px",
                            }
                          }
                          onChange={(val) =>
                            setAttributes({
                              styles: { ...styles, radius: val },
                            })
                          }
                        />
                        <BoxControl
                          className="mt10"
                          label={__("Padding:", "recent-products")}
                          values={
                            styles["padding"] || {
                              top: "0px",
                              right: "0px",
                              bottom: "0px",
                              left: "0px",
                            }
                          }
                          onChange={(val) =>
                            setAttributes({
                              styles: { ...styles, padding: val },
                            })
                          }
                        />
                        <BoxControl
                          className="mt10"
                          label={__("Margin:", "recent-products")}
                          values={
                            styles["margin"] || {
                              top: "0px",
                              right: "0px",
                              bottom: "0px",
                              left: "0px",
                            }
                          }
                          onChange={(val) =>
                            setAttributes({
                              styles: { ...styles, margin: val },
                            })
                          }
                        />
                        <ShadowControl
                          className="mt10"
                          label={__("Shadow:", "recent-products")}
                          value={styles["shadow"]}
                          onChange={(val) =>
                            setAttributes({
                              styles: { ...styles, shadow: val },
                            })
                          }
                        />
                      </PanelBody>
                      <PanelBody
                        className="bPlPanelBody"
                        title={__("Product", "recent-products")}
                      >
                        <Background
                          label={__("Background:", "recent-products")}
                          value={productBG}
                          onChange={(val) => setAttributes({ productBG: val })}
                        />

                        <BorderControl
                          label={__("Border:", "recent-products")}
                          value={productBorder}
                          onChange={(val) =>
                            setAttributes({ productBorder: val })
                          }
                        />

                        <ShadowControl
                          label={__("Shadow:", "recent-products")}
                          value={productShadow}
                          onChange={(val) =>
                            setAttributes({ productShadow: val })
                          }
                        />
                      </PanelBody>

                      {isTitle && (
                        <PanelBody
                          className="bPlPanelBody"
                          title={__("Product Title", "recent-products")}
                          initialOpen={false}
                        >
                          <Typography
                            label={__("Typography:", "recent-products")}
                            value={titleTypo}
                            onChange={(val) =>
                              setAttributes({ titleTypo: val })
                            }
                            defaults={{
                              fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                            }}
                          />
                          <small>
                            {__(
                              "Font Family may not work in the backend.",
                              "recent-products",
                            )}
                          </small>

                          <ColorControl
                            label={__("Color:", "recent-products")}
                            value={titleColor}
                            onChange={(val) =>
                              setAttributes({ titleColor: val })
                            }
                            defaultColor="#333"
                          />
                        </PanelBody>
                      )}

                      {isRating && (
                        <PanelBody
                          className="bPlPanelBody"
                          title={__("Product Rating", "recent-products")}
                          initialOpen={false}
                        >
                          <ColorControl
                            label={__("Color:", "recent-products")}
                            value={ratingColor}
                            onChange={(val) =>
                              setAttributes({ ratingColor: val })
                            }
                            defaultColor="#ffdf00"
                          />
                        </PanelBody>
                      )}

                      {isPrice && (
                        <PanelBody
                          className="bPlPanelBody"
                          title={__("Product Price", "recent-products")}
                          initialOpen={false}
                        >
                          <Typography
                            label={__("Typography:", "recent-products")}
                            value={priceTypo}
                            onChange={(val) =>
                              setAttributes({ priceTypo: val })
                            }
                            defaults={{
                              fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                              fontWeight: 700,
                            }}
                          />
                          <small>
                            {__(
                              "Font Family may not work in the backend.",
                              "recent-products",
                            )}
                          </small>

                          <ColorControl
                            label={__("Color:", "recent-products")}
                            value={priceColor}
                            onChange={(val) =>
                              setAttributes({ priceColor: val })
                            }
                            defaultColor="#222"
                          />
                        </PanelBody>
                      )}

                      {isAddToCartBtn && (
                        <PanelBody
                          className="bPlPanelBody"
                          title={__(
                            "Product Add To Cart Button",
                            "recent-products",
                          )}
                          initialOpen={false}
                        >
                          <Typography
                            label={__("Typography:", "recent-products")}
                            value={addToCartTypo}
                            onChange={(val) =>
                              setAttributes({ addToCartTypo: val })
                            }
                            defaults={{
                              fontSize: { desktop: 15, tablet: 15, mobile: 15 },
                              fontWeight: 600,
                            }}
                          />
                          <small>
                            {__(
                              "Font Family may not work in the backend.",
                              "recent-products",
                            )}
                          </small>

                          <ColorsControl
                            value={addToCartColors}
                            onChange={(val) =>
                              setAttributes({ addToCartColors: val })
                            }
                            defaults={{ color: "#fff", bg: "#4527a4" }}
                          />
                        </PanelBody>
                      )}

                      <PanelBody
                        className="bPlPanelBody"
                        title={__("On Sale Tag", "recent-products")}
                        initialOpen={false}
                      >
                        <ColorsControl
                          value={onSaleColors}
                          onChange={(val) =>
                            setAttributes({ onSaleColors: val })
                          }
                          defaults={{ color: "#fff", bg: "#4527a4" }}
                        />
                      </PanelBody>
                    </>
                  ) : (
                    <Style
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}
                </>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <BlockControls>
        <AlignmentToolbar
          value={textAlign}
          onChange={(val) => setAttributes({ textAlign: val })}
        />
        {/* <BlockPreview
         options={toolTipPresets}
            isPremium={isPremium}
            value={selectTheme}
             onChange={(val) => setAttributes(themeSwitch(val,attributes))}
        /> */}
      </BlockControls>
    </>
  );
};
export default Settings;
