<?php
namespace RecentProductsBlock\Inc;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once RECENT_PRODUCTS_BLOCK_DIR_PATH . 'inc/getCSS.php';

// Generate Styles
class Recent_Products_Block_Style_Generator {
	public static $styles = [];
	public static function addStyle( $selector, $styles ){
		if( array_key_exists( $selector, self::$styles ) ){
			self::$styles[$selector] = wp_parse_args( self::$styles[$selector], $styles );
		}else { self::$styles[$selector] = $styles; }
	}
	public static function renderStyle(){
		$output = '';
		foreach( self::$styles as $selector => $style ){
			$new = '';
			foreach( $style as $property => $value ){
				if( $value === '' ){ $new .= $property; }else { $new .= " $property: $value;"; }
			}
			$output .= "$selector { $new }";
		}
		return $output;
	}
}

class Style{
	static function generatedStyle( $attributes ) {
		$raw_c_id = $attributes['cId'] ?? '';
		$recent_products_block_c_id = preg_match('/^[A-Za-z0-9_-]{1,32}$/', $raw_c_id)
			? $raw_c_id
			: '';
		$styles = $attributes['styles'] ?? [];
		$rowGap = GetCSS::sanitize_css_dimension( $attributes['rowGap'] ?? '' );
		$columnGap = GetCSS::sanitize_css_dimension( $attributes['columnGap'] ?? '' );
		$textAlign = GetCSS::sanitize_css_keyword( $attributes['textAlign'] ?? '', [ '', 'left', 'center', 'right', 'justify' ] );
		$productBG = $attributes['productBG'] ?? [];
		$productBorder = $attributes['productBorder'] ?? [];
		$productShadow = $attributes['productShadow'] ?? [];
		$titleColor = GetCSS::sanitize_css_color( $attributes['titleColor'] ?? '' );
		$ratingColor = GetCSS::sanitize_css_color( $attributes['ratingColor'] ?? '' );
		$priceColor = GetCSS::sanitize_css_color( $attributes['priceColor'] ?? '' );
		$addToCartColors = $attributes['addToCartColors'] ?? [];
		$onSaleColors = $attributes['onSaleColors'] ?? [];
		$titleTypo = $attributes['titleTypo'] ?? [];
		$priceTypo = $attributes['priceTypo'] ?? [];
		$addToCartTypo = $attributes['addToCartTypo'] ?? [];

		// Generate Styles
		$recent_products_block_styles = new Recent_Products_Block_Style_Generator();

		$mainSl = "#wrpRecentProducts-$recent_products_block_c_id";
		$wrpRecentProductsSl = "$mainSl .wrpRecentProducts";
		// wrpRecentProducts 
		$productSl = "$mainSl .wrpProduct";
		$newProductSl="$wrpRecentProductsSl .wrp_product_card";
		$productImgSl="$newProductSl .product-card__image";
		$categoryTypo = $styles['product']['content']['typo'] ?? [
				'fontFamily'     => '',
				'fontCategory'   => '',
				'fontWeight'     => '',
				'fontVariant'    => '',
				'isUploadFont'   => true,
				'fontSize'       => [ 'desktop' => 14, 'tablet' => 14, 'mobile' => 14 ],
				'fontStyle'      => 'normal',
				'textTransform'  => 'none',
				'textDecoration' => 'none',
		];
	   $nameTypo = $styles['product']['content']['name']['typo'] ?? [
				'fontFamily'     => '',
				'fontCategory'   => '',
				'fontWeight'     => '600',
				'fontVariant'    => '600',
				'isUploadFont'   => true,
				'fontSize'       => [ 'desktop' => 18, 'tablet' => 18, 'mobile' => 18 ],	
				'fontStyle'      => 'normal',
				'textTransform'  => 'none',
				'textDecoration' => 'none',
			];
      $reviewValueTypo = $styles['product']['content']['review']['value']['typo'] ?? [
				'fontFamily'     => '',
				'fontCategory'   => '',
				'fontWeight'     => '',
				'fontVariant'    => '',
				'isUploadFont'   => true,
				'fontSize'       => [ 'desktop' => 14, 'tablet' => 14, 'mobile' => 14 ],	
				'fontStyle'      => 'normal',
				'textTransform'  => 'none',
				'textDecoration' => 'none',
			];
			 $salePriceTypo = $styles['product']['content']['price']["salePrice"]['typo'] ?? [
				'fontFamily'     => '',
				'fontCategory'   => '',
				'fontWeight'     => '700',
				'fontVariant'    => '700',
				'isUploadFont'   => true,
				'fontSize'       => [ 'desktop' => 20, 'tablet' => 20, 'mobile' => 20 ],	
				'fontStyle'      => 'normal',
				'textTransform'  => 'none',
				'textDecoration' => 'none',
			];
			 $regularPriceTypo = $styles['product']['content']['price']["regularPrice"]['typo'] ?? [
				'fontFamily'     => '',
				'fontCategory'   => '',
				'fontWeight'     => '',
				'fontVariant'    => '',
				'isUploadFont'   => true,
				'fontSize'       => [ 'desktop' => 14, 'tablet' => 14, 'mobile' => 14 ],	
				'fontStyle'      => 'normal',
				'textTransform'  => 'none',
				'textDecoration' => 'line-through',
			];
			$discountTypo = $styles['product']['content']['tag']['typo'] ?? [
				'fontFamily'     => '',
				'fontCategory'   => '',
				'fontWeight'     => '700',
				'fontVariant'    => '700',
				'isUploadFont'   => true,
				'fontSize'       => [ 'desktop' => 14, 'tablet' => 14, 'mobile' => 14 ],	
				'fontStyle'      => 'normal',
				'textTransform'  => 'none',
				'textDecoration' => 'none',
			];



		$recent_products_block_styles::addStyle( "$mainSl", [
			GetCSS::getBackgroundCSS( $styles['bg'] ) => '',
			'border-radius' => GetCSS::getBoxCSS( $styles['radius'] ),
			
			'margin' => GetCSS::getBoxCSS( $styles['margin'] ),
			'box-shadow' => GetCSS::getMuiltShadowCSS( $styles['shadow'] )
		] );
		$recent_products_block_styles::addStyle( "$wrpRecentProductsSl", [
			'padding' => GetCSS::getBoxCSS( $styles['padding'] ),
		] );
		// product card
		$recent_products_block_styles::addStyle( "$newProductSl", [
			GetCSS::getBackgroundCSS( $styles['product']['bg']?? [ 'bgType'=>'solid', 'color'=>'#FFF',"bg"=>"#ffffff" ] ) => '',
			'border-radius' => GetCSS::getBoxCSS($styles['product']['radius'] ?? ["top"=> "12px", "right"=> "12px", "bottom"=> "12px", "left"=> "12px"]),
			'border' => GetCSS::sanitize_css_dimension( $styles['product']['border']['width'] ?? '1px' ) . ' ' . GetCSS::sanitize_css_keyword( $styles['product']['border']['style'] ?? 'solid', [ 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden' ] ) . ' ' . GetCSS::sanitize_css_color( $styles['product']['border']['color'] ?? '#bbc6dd' ),
			'padding' => GetCSS::getBoxCSS( $styles['product']['padding'] ?? ["top"=> "0px", "right"=> "0px", "bottom"=> "0px", "left"=> "0px"] ),


		] );

		$recent_products_block_styles::addStyle( "$newProductSl:hover", [
		'box-shadow' => GetCSS::getMuiltShadowCSS($styles['product']["hover"]['shadow'] ?? [['type'=>'box','hOffset'=>'0px','vOffset'=>'10px','blur'=>'15px','spreed'=>'-3px','color'=>'rgba(0, 0, 0, 0.1)','isInset'=>false]]),
		'transform' => 'translateY(' . intval( $styles['product']['hover']['translateY'] ?? -4 ) . 'px)',

		] );

		//  product image 
		$recent_products_block_styles::addStyle( "$productImgSl", [
		'width'      => GetCSS::sanitize_css_dimension( $styles['product']['image']['width'] ?? '100%' ),
		'height'     => GetCSS::sanitize_css_dimension( $styles['product']['image']['height'] ?? '100%' ),
		'object-fit' => GetCSS::sanitize_css_keyword( $styles['product']['image']['objectFit'] ?? 'cover', [ 'cover', 'contain', 'fill', 'none', 'scale-down' ] ),
		] );


		$recent_products_block_styles::addStyle( "$productImgSl:hover", [
			'transform' => 'scale(' . floatval( $styles['product']['image']['scale'] ?? 1.1 ) . ')',
		] );
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card_body ", [
			'padding' => GetCSS::getBoxCSS( $styles['product']['content']['padding'] ?? ["top"=> "16px", "right"=> "16px", "bottom"=> "16px", "left"=> "16px"] ),
			
		] );
		// product category
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__category a", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['category']['color'] ?? '#80736b' )
		] );
		// product name
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__name", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['name']['color'] ?? '#111827' )
		] );
		// product review
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__rating_icon", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['review']['icon']['color'] ?? '#fbbf24' ),
			'fill' => GetCSS::sanitize_css_color( $styles['product']['content']['review']['icon']['color'] ?? '#fbbf24' ),
			'width' => GetCSS::sanitize_css_dimension( $styles['product']['content']['review']['icon']['size'] ?? '16px' ),
			'height' => GetCSS::sanitize_css_dimension( $styles['product']['content']['review']['icon']['size'] ?? '16px' )
		] );
		// product review value
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__rating_value", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['review']['value']['color'] ?? '#374151' )
		] );
		// product review count
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__rating_count", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['category']['color'] ?? '#80736b' )
		] );
		// salePrice
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__price", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['price']["salePrice"]['color'] ?? '#111827' )
		] );
		// regular price
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__original-price", [
			'color' => GetCSS::sanitize_css_color( $styles['product']['content']['price']["regularPrice"]['color'] ?? '#9ca3af' )
		] );
		// addCart
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__button", [
			GetCSS::getColorsCSS( $styles['product']['content']['addCart']["colors"] ?? [ 'color'=> '#fff', 'bg'=> '#111827' ] ) => '',
			'border-radius' => GetCSS::getBoxCSS($styles['product']['content']['addCart']['radius'] ?? ["top"=> "8px", "right"=> "8px", "bottom"=> "8px", "left"=> "8px"]),
			'padding' => GetCSS::getBoxCSS( $styles['product']['content']['addCart']['padding'] ?? ["top"=> "10px", "right"=> "10px", "bottom"=> "10px", "left"=> "10px"] ),
			
		] );
		// add card icon
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__button .wrp_product_card__button-icon ", [
		   'width'  => intval( $styles['product']['content']['addCart']['icon']['size'] ?? 20 ) . 'px',
		   'height' => intval( $styles['product']['content']['addCart']['icon']['size'] ?? 20 ) . 'px',
			
		] );
		
		// badge
		$recent_products_block_styles::addStyle( "$newProductSl .wrp_product_card__badge", [
			GetCSS::getColorsCSS( $styles['product']['content']['tag']["colors"] ?? [ 'color'=> '#fff', 'bg'=> '#ef4444' ] ) => '',
			'border-radius' => GetCSS::getBoxCSS($styles['product']['content']['tag']['radius'] ?? ["top"=> "4px", "right"=> "4px", "bottom"=> "4px", "left"=> "4px"]),
			'padding' => GetCSS::getBoxCSS( $styles['product']['content']['tag']['padding'] ?? ["top"=> "4px", "right"=> "8px", "bottom"=> "4px", "left"=> "8px"] ),
		] );







		$recent_products_block_styles::addStyle( "$mainSl .wrpRecentProducts", [
			'grid-gap' => "$rowGap $columnGap"
		] );
		$recent_products_block_styles::addStyle( "$productSl", [
			'text-align' => $textAlign,
			GetCSS::getBackgroundCSS( $productBG ) => '',
			GetCSS::getBorderCSS( $productBorder ) => '',
			'box-shadow' => GetCSS::getShadowCSS( $productShadow )
		] );
		$recent_products_block_styles::addStyle( "$productSl .wrpProductImg", [
			'border-top-left-radius' => GetCSS::sanitize_css_dimension( $productBorder['radius'] ?? '0' ),
			'border-top-right-radius' => GetCSS::sanitize_css_dimension( $productBorder['radius'] ?? '0' )
		] );
		$recent_products_block_styles::addStyle( "$productSl .productTitle", [
			'color' => $titleColor
		] );
		$recent_products_block_styles::addStyle( "$productSl .productRating .star-rating span", [
			'color' => $ratingColor
		] );
		$recent_products_block_styles::addStyle( "$productSl .productPrice", [
			'color' => $priceColor
		] );
		$recent_products_block_styles::addStyle( "$productSl .productAddToCartArea", [
			'justify-content' => $textAlign
		] );
		$recent_products_block_styles::addStyle( "$productSl .productAddToCartArea .button", [
			GetCSS::getColorsCSS( $addToCartColors ) => ''
		] );
		$recent_products_block_styles::addStyle( "$productSl .productOnSale", [
			GetCSS::getColorsCSS( $onSaleColors ) => ''
		] );



		ob_start();
			// googleFontLink outputs have been removed for WordPress.org compliance
			
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- CSS output inside <style> tag; all values are sanitized via GetCSS sanitization helpers.
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$productSl .productTitle", $titleTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$productSl .productPrice", $priceTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$productSl .productAddToCartArea .button", $addToCartTypo )['styles'] );

			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__category a", $categoryTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__name", $nameTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__rating_value", $reviewValueTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__rating_count", $reviewValueTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__price", $salePriceTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__original-price", $regularPriceTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__badge", $discountTypo )['styles'] );
			echo wp_strip_all_tags( GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__button", $addToCartTypo )['styles'] );



			echo wp_strip_all_tags( $recent_products_block_styles::renderStyle() );

			$recent_products_block_styles::$styles = []; // Empty styles
		return ob_get_clean();
	}
}

