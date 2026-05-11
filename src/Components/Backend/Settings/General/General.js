import { Device, HelpPanel, Label, SelectPureControl } from "../../../../../../bpl-tools/Components";
import {PanelBody, PanelRow, RangeControl, SelectControl, ToggleControl, __experimentalUnitControl  as UnitControl} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { addArrItem, filterSelected, removeArrItem, themeSwitch, updateCustomData } from "../../../../utils/functions";
import { useState } from "react";
import { emUnit, perUnit, pxUnit } from "../../../../../../bpl-tools/utils/options";


const General = ({ attributes, setAttributes,allCategories }) => {
     const [device, setDevice] = useState("desktop");
  
    const {selectTheme="default",productsPerPage=12,stockStatus,selectedCategories,columns,columnGap,rowGap,isImage,isTitle,isRating,isPrice,isAddToCartBtn,options={isDiscountTag:true,isCategory:true}}=attributes || {};
      const onStockFilterChange = (item, val) => {
        setAttributes({
          stockStatus: val
            ? [...addArrItem(stockStatus, item)]
            : [...removeArrItem(stockStatus, item)],
        });
      };
    return (
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
                      label={__("Show In Stock Products", "recent-products")}
                      checked={stockStatus.includes("instock")}
                      onChange={(val) => onStockFilterChange("instock", val)}
                    />

                    <ToggleControl
                      className="mt10"
                      label={__(
                        "Show Out of Stock Products",
                        "recent-products"
                      )}
                      checked={stockStatus.includes("outofstock")}
                      onChange={(val) => onStockFilterChange("outofstock", val)}
                    />

                    <ToggleControl
                      className="mt10"
                      label={__(
                        "Show In On Backorder Products",
                        "recent-products"
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
                        selectedCategories
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
                           <Label className="mb5">{__("Select A Theme", "recent-products")}</Label>
                                    <SelectControl   value={selectTheme}
                                      options={[
                                        { label: "Default", value: "default" },
                                        { label: "Theme-1", value: "themeOne" },
                                        { label: "Theme-2", value: "themeTwo" }
                                        
                                      ]}
                                      onChange={(val) => setAttributes(themeSwitch(val,attributes))}
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
                      withInputField={true}
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
                    {/* <ToggleControl
                      label={__("Show Image", "recent-products")}
                      checked={isImage}
                      onChange={(val) => setAttributes({ isImage: val })}
                    /> */}

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
                      label={__("Show Add To Cart Button", "recent-products")}
                      checked={isAddToCartBtn}
                      onChange={(val) => setAttributes({ isAddToCartBtn: val })}
                    />

                    <ToggleControl
                      className="mt10"
                      label={__("Show Discount Tag", "recent-products")}
                      checked={options.isDiscountTag}
                      onChange={(val) => setAttributes({ options: { ...options, isDiscountTag: val } })}
                    />
                    
                    <ToggleControl
                      className="mt10"
                      label={__("Show Category", "recent-products")}
                      checked={options.isCategory}
                      // onChange={(val) => setAttributes({ options: { ...options, isCategory: val } })}
                      onChange={(val) => setAttributes({ options: { ...options, isCategory: val } })}
                    />
                  </PanelBody>

            
             {
              selectTheme === "themeOne" &&	 <>

              

                  

                </>
             }
            
        </>
    );
};

export default General;