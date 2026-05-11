
import { __ } from "@wordpress/i18n";

import {PanelBody,BorderControl as BorderControlComponent, RangeControl, SelectControl,__experimentalUnitControl as UnitControl} from "@wordpress/components";

// Settings Components
import { Background,ColorControl,ColorsControl,ShadowControl,Typography, BoxControl} from "../../../../../../bpl-tools/Components"

import {BorderControl} from "../../../../../../bpl-tools/Components/Deprecated"
import { updateData } from "../../../../../../bpl-tools/utils/functions";
import { updateCustomData } from "../../../../utils/functions";







const Style = ({ attributes, setAttributes }) => {
  const { isTitle,  isRating, isPrice,isAddToCartBtn,productBG,productBorder,productShadow,titleTypo,titleColor,ratingColor,priceTypo,priceColor, addToCartTypo,addToCartColors, onSaleColors,styles={},selectTheme="default", options={isDiscountTag:true,isCategory:true}} = attributes || {};
    const {product={bg:{"type":"solid","color":"#FFF"}}}= styles || {};

    return (
        <>

          <PanelBody
                    className="bPlPanelBody"
                    title={__("Container", "recent-products")}
                  >
                    <Background
                      label={__("Background:", "recent-products")}
                      value={styles['bg']}
                      onChange={(val) => setAttributes({ styles: { ...styles, bg: val } })}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={styles['radius'] || { top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                      onChange={(val) => setAttributes({ styles: { ...styles, radius: val } })}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={styles['padding'] || { top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                      onChange={(val) => setAttributes({ styles: { ...styles, padding: val } })}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Margin:", "recent-products")}
                      values={styles['margin'] || { top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                      onChange={(val) => setAttributes({ styles: { ...styles, margin: val } })}
                    />
                    <ShadowControl
                      className="mt10"
                      label={__("Shadow:", "recent-products")}
                      value={styles['shadow']}
                      onChange={(val) => setAttributes({ styles: { ...styles, shadow: val } })}
                    />
                  </PanelBody>
        {
            "themeOne" === selectTheme && (
                <>
                   

                  <PanelBody
                    className="bPlPanelBody"
                    title={__("Product", "recent-products")}
                    initialOpen={false}
                  >
                    <Background
                      label={__("Background:", "recent-products")}
                      value={product.bg || {"type":"solid","color":"#FFF"}} 
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","bg")})}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['padding'] || { top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","padding")})}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={product['radius'] || { top: '12px', right: '12px', bottom: '12px', left: '12px' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","radius")})}
                    />
                     <BorderControlComponent 
                      label={__("Border:", "recent-products")}
                      className="mt10"
                      value={product['border'] || { width: '1px', style: 'solid', color: '#bbc6dd' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","border")})}
             
                           />

                    <ShadowControl
                      label={__("Hover Shadow:", "recent-products")}
                      value={product?.hover?.shadow || [{"type": "box","hOffset": "0px", "vOffset": "10px","blur": "15px","spreed": "-3px","color": "rgba(0, 0, 0, 0.1)","isInset": false }]}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","hover","shadow")})}
                    />
                    <RangeControl
                     min={-50}
                     max={50}
                      className="mt10"
                      label={__("Hover Translate Y(px):", "recent-products")}
                      value={product?.hover?.translateY || -4}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","hover","translateY")})}
                    />
                  </PanelBody>
                  <PanelBody 
                    className="bPlPanelBody"
                    title={__("Product Image", "recent-products")}
                    initialOpen={false}
                  >
                    <UnitControl
                      step={1}
                      min={1}
                      className="mt10"
                      label={__("Width:", "recent-products")}
                      value={product['image']?.width || '100%'}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","width")})}
                    />
                    <UnitControl
                     step={1}
                      min={1}
                      className="mt10"
                      label={__("Height:", "recent-products")}
                      value={product['image']?.height || '100%'}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","height")})}
                    />
                    <SelectControl
                      className="mt10"
                      label={__("Object Fit:", "recent-products")}
                      value={product['image']?.['objectFit'] || 'cover'}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","objectFit")})}
                      options={[
                        { label: 'Cover', value: 'cover' },
                        { label: 'Contain', value: 'contain' },
                        { label: 'Fill', value: 'fill' },
                        { label: 'Scale Down', value: 'scale-down' },]}/>
                        <RangeControl
                      step={0.1}
                      min={0.1}
                      className="mt10"
                      label={__("Hover Scale:", "recent-products")}
                      value={product['image']?.['scale'] || 1.1}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","scale")})}
                    />
                    
                  </PanelBody>
                  <PanelBody className="bPlPanelBody" title={__("Product Content", "recent-products")} initialOpen={false} >
                    <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['content']?.['padding'] || { top: '16px', right: '16px', bottom: '16px', left: '16px' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","padding")})}
                    />
                      {   
                          options?.isCategory && <>
                       <ColorControl
                        label={__("Category & Review Count Color:", "recent-products")}
                        value={product['content']?.['category']?.['color'] || '#80736b'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","category","color")})}
                        defaultColor="#80736b"
                      />
                    <Typography
                        label={__("Category Typography:", "recent-products")}
                        value={product['content']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","typo")})}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                      </>
                          }
                  {
                   isTitle && <>
                        <ColorControl
                        label={__("Name Color:", "recent-products")}
                        value={product['content']?.['name']?.['color'] || '#111827'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","name","color")})}
                        defaultColor="#111827"
                      />
                      <Typography
                        label={__("Name Typography:", "recent-products")}
                        value={product['content']?.['name']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 18, tablet: 18, mobile: 18 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","name","typo")})}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                    </>
                  }
                     {
                     isRating && <>
                             <ColorControl
                        label={__("Review Icon Color:", "recent-products")}
                        value={product['content']?.['review']?.['icon']?.['color'] || '#fbbf24'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","icon","color")})}
                        defaultColor="#fbbf24"
                      />
                      <UnitControl
                      className="mt10"
                        label={__("Review Icon Size:", "recent-products")}
                        value={product['content']?.['review']?.['icon']?.['size'] || '16px'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","icon","size")})}
                        defaultUnit="px"
                      />
                      <ColorControl
                        label={__("Review Value Color:", "recent-products")}
                        value={product['content']?.['review']?.['value']?.['color'] || '#374151'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","value","color")})}
                        defaultColor="#374151"
                      />
                      <Typography
                        label={__("Review Value & Count Typography:", "recent-products")}
                        value={product['content']?.['review']?.['value']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","value","typo")})}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                      </>
                     }
                    {
                     isPrice &&  <>
                        <ColorControl
                        label={__("Sale Price Color:", "recent-products")}
                        value={product['content']?.["price"]?.['salePrice']?.['color'] || '#111827'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","price","salePrice","color")})}
                        defaultColor="#111827"
                      />
                      <Typography
                        label={__("Sale Price Typography:", "recent-products")}
                        value={product['content']?.["price"]?.['salePrice']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 20, tablet: 20, mobile: 20 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","price","salePrice","typo")})}
                       
                       />
                         <ColorControl
                        label={__("Regular Price Color:", "recent-products")}
                        value={product['content']?.["price"]?.['regularPrice']?.['color'] || '#111827'}
                        onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","price","regularPrice","color")})}
                        defaultColor="#111827"
                      />
                      <Typography
                        label={__("Regular Price Typography:", "recent-products")}
                        value={product['content']?.["price"]?.['regularPrice']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'line-through' }}
                        onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","price","regularPrice","typo")})}
                      
                       />
                      </>
                    }

                      
                  </PanelBody>
                {  isAddToCartBtn && <PanelBody initialOpen={false} className="bPlPanelBody" title={__("Add To Cart Button", "recent-products")}>
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
                    <ColorsControl 
                    label={__("Colors:", "recent-products")}
                    value={product['content']?.['addCart']?.['colors'] || { color: '#fff', bg: '#111827' }}
                    onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","colors")})}
                    
                    />
                    <BoxControl
                    className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['content']?.['addCart']?.['padding'] || { top: '10px', right: '10px', bottom: '10px', left: '10px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","padding")})}
                      defaultUnit="px"
                    />
                    <BoxControl
                    className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={product['content']?.['addCart']?.['radius'] || { top: '8px', right: '8px', bottom: '8px', left: '8px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","radius")})}
                      defaultUnit="px"
                    />
                    <RangeControl
                    className="mt10"
                      label={__("Icon Size:", "recent-products")}
                      value={product['content']?.['addCart']?.['icon']?.['size'] || 20}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","icon","size")})}
                      
                    />

                  </PanelBody>}

                   { 
                 options?.isDiscountTag &&  <PanelBody initialOpen={false} className="bPlPanelBody" title={__("On Discount Tag", "recent-products")} >
                      
                      <ColorsControl 
                      label={__("Colors:", "recent-products")}
                      value={product['content']?.['tag']?.['colors'] || { color: '#fff', bg: '#ef4444' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","colors")})}/>
                      
                      <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['content']?.['tag']?.['padding'] || { top: '4px', right: '8px', bottom: '4px', left: '8px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","padding")})}
                      defaultUnit="px"
                      />
                      <BoxControl
                      className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={product['content']?.['tag']?.['radius'] || { top: '4px', right: '4px', bottom: '4px', left: '4px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","radius")})}
                      defaultUnit="px"
                      />
                       <Typography
                        label={__("Typography:", "recent-products")}
                        value={product['content']?.['tag']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '600', fontVariant: '600', isUploadFont: true, fontSize: { desktop: 12, tablet: 12, mobile: 12 }, fontStyle: 'normal', textTransform: 'uppercase', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","typo")})}
                       />

                    </PanelBody>
                   }

                  {/* {isTitle && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Product Title", "recent-products")}
                      initialOpen={false}
                    >
                      <Typography
                        label={__("Typography:", "recent-products")}
                        value={titleTypo}
                        onChange={(val) => setAttributes({ titleTypo: val })}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                      <small>
                        {__(
                          "Font Family may not work in the backend.",
                          "recent-products"
                        )}
                      </small>

                      <ColorControl
                        label={__("Color:", "recent-products")}
                        value={titleColor}
                        onChange={(val) => setAttributes({ titleColor: val })}
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
                        onChange={(val) => setAttributes({ ratingColor: val })}
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
                        onChange={(val) => setAttributes({ priceTypo: val })}
                        defaults={{
                          fontSize: { desktop: 14, tablet: 14, mobile: 14 },
                          fontWeight: 700,
                        }}
                      />
                      <small>
                        {__(
                          "Font Family may not work in the backend.",
                          "recent-products"
                        )}
                      </small>

                      <ColorControl
                        label={__("Color:", "recent-products")}
                        value={priceColor}
                        onChange={(val) => setAttributes({ priceColor: val })}
                        defaultColor="#222"
                      />
                    </PanelBody>
                  )}

                  {isAddToCartBtn && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__(
                        "Product Add To Cart Button",
                        "recent-products"
                      )}
                      initialOpen={false}
                    >
                      <Typography label={__("Typography:", "recent-products")} value={addToCartTypo}  onChange={(val) =>setAttributes({ addToCartTypo: val })} defaults={{fontSize: { desktop: 15, tablet: 15, mobile: 15 },fontWeight: 600,}}
                      />
                      <small>  {__( "Font Family may not work in the backend.", "recent-products")} </small>

                      <ColorsControl value={addToCartColors} onChange={(val) => setAttributes({ addToCartColors: val })}defaults={{ color: "#fff", bg: "#4527a4" }}
                      />
                    </PanelBody>
                  )} */}

                  {/* <PanelBody className="bPlPanelBody" title={__("On Sale Tag", "recent-products")}initialOpen={false} > <ColorsControl value={onSaleColors} onChange={(val) => setAttributes({ onSaleColors: val })} defaults={{ color: "#fff", bg: "#4527a4" }} /></PanelBody> */}
                </>
            )
        }

        {
          "themeTwo" === selectTheme && (
            <>
                 <PanelBody
                    className="bPlPanelBody"
                    title={__("Product", "recent-products")}
                    initialOpen={false}
                  >
                    <Background
                      label={__("Background:", "recent-products")}
                      value={product.bg || {"type":"solid","color":"#FFF"}} 
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","bg")})}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['padding'] || { top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","padding")})}
                    />
                    <BoxControl
                      className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={product['radius'] || { top: '12px', right: '12px', bottom: '12px', left: '12px' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","radius")})}
                    />
                     <BorderControlComponent 
                      label={__("Border:", "recent-products")}
                      className="mt10"
                      value={product['border'] || { width: '1px', style: 'solid', color: '#bbc6dd' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","border")})}
             
                           />

                    <ShadowControl
                      label={__("Hover Shadow:", "recent-products")}
                      value={product?.hover?.shadow || [{"type": "box","hOffset": "0px", "vOffset": "10px","blur": "15px","spreed": "-3px","color": "rgba(0, 0, 0, 0.1)","isInset": false }]}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","hover","shadow")})}
                    />
                    <RangeControl
                     min={-50}
                     max={50}
                      className="mt10"
                      label={__("Hover Translate Y(px):", "recent-products")}
                      value={product?.hover?.translateY || -4}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","hover","translateY")})}
                    />
                  </PanelBody>
                  <PanelBody 
                    className="bPlPanelBody"
                    title={__("Product Image", "recent-products")}
                    initialOpen={false}
                  >
                    <UnitControl
                      step={1}
                      min={1}
                      className="mt10"
                      label={__("Width:", "recent-products")}
                      value={product['image']?.width || '100%'}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","width")})}
                    />
                    <UnitControl
                     step={1}
                      min={1}
                      className="mt10"
                      label={__("Height:", "recent-products")}
                      value={product['image']?.height || '100%'}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","height")})}
                    />
                    <SelectControl
                      className="mt10"
                      label={__("Object Fit:", "recent-products")}
                      value={product['image']?.['objectFit'] || 'cover'}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","objectFit")})}
                      options={[
                        { label: 'Cover', value: 'cover' },
                        { label: 'Contain', value: 'contain' },
                        { label: 'Fill', value: 'fill' },
                        { label: 'Scale Down', value: 'scale-down' },]}/>
                        <RangeControl
                      step={0.1}
                      min={0.1}
                      className="mt10"
                      label={__("Hover Scale:", "recent-products")}
                      value={product['image']?.['scale'] || 1.1}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","image","scale")})}
                    />
                    
                  </PanelBody>
                  <PanelBody className="bPlPanelBody" title={__("Product Content", "recent-products")} initialOpen={false} >
                    <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['content']?.['padding'] || { top: '16px', right: '16px', bottom: '16px', left: '16px' }}
                      onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","padding")})}
                    />

                      {   
                          options?.isCategory && <>
                       <ColorControl
                        label={__("Category & Review Count Color:", "recent-products")}
                        value={product['content']?.['category']?.['color'] || '#80736b'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","category","color")})}
                        defaultColor="#80736b"
                      />
                    <Typography
                        label={__("Category Typography:", "recent-products")}
                        value={product['content']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","typo")})}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                      </>
                          }
                  {
                   isTitle && <>
                        <ColorControl
                        label={__("Name Color:", "recent-products")}
                        value={product['content']?.['name']?.['color'] || '#111827'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","name","color")})}
                        defaultColor="#111827"
                      />
                      <Typography
                        label={__("Name Typography:", "recent-products")}
                        value={product['content']?.['name']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 18, tablet: 18, mobile: 18 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","name","typo")})}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                    </>
                  }
                     {
                     isRating && <>
                             <ColorControl
                        label={__("Review Icon Color:", "recent-products")}
                        value={product['content']?.['review']?.['icon']?.['color'] || '#fbbf24'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","icon","color")})}
                        defaultColor="#fbbf24"
                      />
                      <UnitControl
                      className="mt10"
                        label={__("Review Icon Size:", "recent-products")}
                        value={product['content']?.['review']?.['icon']?.['size'] || '16px'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","icon","size")})}
                        defaultUnit="px"
                      />
                      <ColorControl
                        label={__("Review Value Color:", "recent-products")}
                        value={product['content']?.['review']?.['value']?.['color'] || '#374151'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","value","color")})}
                        defaultColor="#374151"
                      />
                      <Typography
                        label={__("Review Value & Count Typography:", "recent-products")}
                        value={product['content']?.['review']?.['value']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","review","value","typo")})}
                        defaults={{
                          fontSize: { desktop: 22, tablet: 20, mobile: 18 },
                        }}
                      />
                      </>
                     }
                    {
                     isPrice &&  <>
                        <ColorControl
                        label={__("Sale Price Color:", "recent-products")}
                        value={product['content']?.["price"]?.['salePrice']?.['color'] || '#111827'}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","price","salePrice","color")})}
                        defaultColor="#111827"
                      />
                      <Typography
                        label={__("Sale Price Typography:", "recent-products")}
                        value={product['content']?.["price"]?.['salePrice']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 20, tablet: 20, mobile: 20 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateData(styles,val,"product","content","price","salePrice","typo")})}
                       
                       />
                         <ColorControl
                        label={__("Regular Price Color:", "recent-products")}
                        value={product['content']?.["price"]?.['regularPrice']?.['color'] || '#111827'}
                        onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","price","regularPrice","color")})}
                        defaultColor="#111827"
                      />
                      <Typography
                        label={__("Regular Price Typography:", "recent-products")}
                        value={product['content']?.["price"]?.['regularPrice']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '', fontVariant: '', isUploadFont: true, fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontStyle: 'normal', textTransform: 'none', textDecoration: 'line-through' }}
                        onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","price","regularPrice","typo")})}
                      
                       />
                      </>
                    }

                      
                  </PanelBody>
                {  isAddToCartBtn && <PanelBody initialOpen={false} className="bPlPanelBody" title={__("Add To Cart Button", "recent-products")}>
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
                    <ColorsControl 
                    label={__("Colors:", "recent-products")}
                    value={product['content']?.['addCart']?.['colors'] || { color: '#fff', bg: '#111827' }}
                    onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","colors")})}
                    
                    />
                    <BoxControl
                    className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['content']?.['addCart']?.['padding'] || { top: '10px', right: '10px', bottom: '10px', left: '10px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","padding")})}
                      defaultUnit="px"
                    />
                    <BoxControl
                    className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={product['content']?.['addCart']?.['radius'] || { top: '8px', right: '8px', bottom: '8px', left: '8px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","addCart","radius")})}
                      defaultUnit="px"
                    />

                  </PanelBody>}

                   { 
                 options?.isDiscountTag &&  <PanelBody initialOpen={false} className="bPlPanelBody" title={__("On Discount Tag", "recent-products")} >
                      
                      <ColorsControl 
                      label={__("Colors:", "recent-products")}
                      value={product['content']?.['tag']?.['colors'] || { color: '#fff', bg: '#ef4444' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","colors")})}/>
                      
                      <BoxControl
                      className="mt10"
                      label={__("Padding:", "recent-products")}
                      values={product['content']?.['tag']?.['padding'] || { top: '4px', right: '8px', bottom: '4px', left: '8px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","padding")})}
                      defaultUnit="px"
                      />
                      <BoxControl
                      className="mt10"
                      label={__("Radius:", "recent-products")}
                      values={product['content']?.['tag']?.['radius'] || { top: '4px', right: '4px', bottom: '4px', left: '4px' }}
                      onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","radius")})}
                      defaultUnit="px"
                      />
                       <Typography
                        label={__("Typography:", "recent-products")}
                        value={product['content']?.['tag']?.['typo'] || { fontFamily: '', fontCategory: '', fontWeight: '600', fontVariant: '600', isUploadFont: true, fontSize: { desktop: 12, tablet: 12, mobile: 12 }, fontStyle: 'normal', textTransform: 'uppercase', textDecoration: 'none' }}
                        onChange={(val) => setAttributes({styles:updateCustomData(styles,val,"product","content","tag","typo")})}
                       />

                    </PanelBody>
                   }
            </>
          )
        }
           
        </>
    );
};

export default Style;