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
} from "@wordpress/components";


import "../../../../../bpl-tools/Components/style.scss"
import Label from "../../../../../bpl-tools/Components/Label/Label"
import Background from "../../../../../bpl-tools/Components/Background/Background"
import { ColorControl } from "../../../../../bpl-tools/Components/ColorControl/ColorControl"
import Device from "../../../../../bpl-tools/Components/Device/Device"
import ColorsControl from "../../../../../bpl-tools/Components/ColorsControl/ColorsControl"
import HelpPanel from "../../../../../bpl-tools/Components/HelpPanel/HelpPanel"
import SelectPureControl from "../../../../../bpl-tools/Components/SelectPureControl/SelectPureControl"
import ShadowControl from "../../../../../bpl-tools/Components/ShadowControl/ShadowControl"
import Typography from "../../../../../bpl-tools/Components/Typography/Typography"
import BoxControl from "../../../../../bpl-tools/Components/BoxControl/BoxControl"








import BorderControl from "../../../../../bpl-tools/Components/Deprecated/BorderControl/BorderControl";

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
} from "../../../utils/functions";
import { generalStyleTabs } from "../../../utils/options";

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

                  <>
                    <HelpPanel slug="recent-products-block" />

                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Query", "recent-products-block")}
                    >
                      <Label className="mb5">
                        {__("Products Limit:", "recent-products-block")}
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

                      <h3>
                        {__("Filter by Stock", "recent-products-block")}
                      </h3>
                      <ToggleControl
                        label={__(
                          "Show In Stock Products",
                          "recent-products-block",
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
                          "recent-products-block",
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
                          "recent-products-block",
                        )}
                        checked={stockStatus.includes("onbackorder")}
                        onChange={(val) =>
                          onStockFilterChange("onbackorder", val)
                        }
                      />

                      <hr />

                      <h3>
                        {__("Filter by Category", "recent-products-block")}
                      </h3>
                      <Label className="mb5">
                        {__("Select Categories:", "recent-products-block")}
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
                      title={__("Layout", "recent-products-block")}
                      initialOpen={false}
                    >


                      <PanelRow>
                        <Label className="mb5">
                          {__("Columns:", "recent-products-block")}
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
                        label={__("Column Gap:", "recent-products-block")}
                        labelPosition="left"
                        value={columnGap}
                        onChange={(val) => setAttributes({ columnGap: val })}
                        units={[pxUnit(30), perUnit(3), emUnit(2)]}
                        isResetValueOnUnitChange={true}
                      />

                      <UnitControl
                        className="mt20"
                        label={__("Row Gap:", "recent-products-block")}
                        labelPosition="left"
                        value={rowGap}
                        onChange={(val) => setAttributes({ rowGap: val })}
                        units={[pxUnit(40), perUnit(3), emUnit(2.5)]}
                        isResetValueOnUnitChange={true}
                      />
                    </PanelBody>

                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Elements", "recent-products-block")}
                      initialOpen={false}
                    >
                      <ToggleControl
                        label={__("Show Image", "recent-products-block")}
                        checked={isImage}
                        onChange={(val) => setAttributes({ isImage: val })}
                      />

                      <ToggleControl
                        className="mt10"
                        label={__("Show Title", "recent-products-block")}
                        checked={isTitle}
                        onChange={(val) => setAttributes({ isTitle: val })}
                      />

                      <ToggleControl
                        className="mt10"
                        label={__("Show Rating", "recent-products-block")}
                        checked={isRating}
                        onChange={(val) => setAttributes({ isRating: val })}
                      />

                      <ToggleControl
                        className="mt10"
                        label={__("Show Price", "recent-products-block")}
                        checked={isPrice}
                        onChange={(val) => setAttributes({ isPrice: val })}
                      />

                      <ToggleControl
                        className="mt10"
                        label={__(
                          "Show Add To Cart Button",
                          "recent-products-block",
                        )}
                        checked={isAddToCartBtn}
                        onChange={(val) =>
                          setAttributes({ isAddToCartBtn: val })
                        }
                      />
                    </PanelBody>
                  </>

                </>
              )}

              {"style" === tab.name && (
                <>


                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Container", "recent-products-block")}
                  >
                    <Background
                      label={__("Background:", "recent-products-block")}
                      value={styles["bg"]}
                      onChange={(val) =>
                        setAttributes({ styles: { ...styles, bg: val } })
                      }
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Radius:", "recent-products-block")}
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
                      label={__("Padding:", "recent-products-block")}
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
                      label={__("Margin:", "recent-products-block")}
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
                      label={__("Shadow:", "recent-products-block")}
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
                    title={__("Product", "recent-products-block")}
                  >
                    <Background
                      label={__("Background:", "recent-products-block")}
                      value={productBG}
                      onChange={(val) => setAttributes({ productBG: val })}
                    />

                    <BorderControl
                      label={__("Border:", "recent-products-block")}
                      value={productBorder}
                      onChange={(val) =>
                        setAttributes({ productBorder: val })
                      }
                    />

                    <ShadowControl
                      label={__("Shadow:", "recent-products-block")}
                      value={productShadow}
                      onChange={(val) =>
                        setAttributes({ productShadow: val })
                      }
                    />
                  </PanelBody>

                  {isTitle && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Product Title", "recent-products-block")}
                      initialOpen={false}
                    >
                      <Typography
                        label={__("Typography:", "recent-products-block")}
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
                          "recent-products-block",
                        )}
                      </small>

                      <ColorControl
                        label={__("Color:", "recent-products-block")}
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
                      title={__("Product Rating", "recent-products-block")}
                      initialOpen={false}
                    >
                      <ColorControl
                        label={__("Color:", "recent-products-block")}
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
                      title={__("Product Price", "recent-products-block")}
                      initialOpen={false}
                    >
                      <Typography
                        label={__("Typography:", "recent-products-block")}
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
                          "recent-products-block",
                        )}
                      </small>

                      <ColorControl
                        label={__("Color:", "recent-products-block")}
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
                        "recent-products-block",
                      )}
                      initialOpen={false}
                    >
                      <Typography
                        label={__("Typography:", "recent-products-block")}
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
                          "recent-products-block",
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
                    title={__("On Sale Tag", "recent-products-block")}
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

      </BlockControls>
    </>
  );
};
export default Settings;
