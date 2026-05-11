<?php
namespace WRP\Inc;

require_once WRP_DIR_PATH . 'inc/getCSS.php';

// Generate Styles
class WRPStyleGenerator {
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
				if( $value == '' ){ $new .= $property; }else { $new .= " $property: $value;"; }
			}
			$output .= "$selector { $new }";
		}
		return $output;
	}
}

class Style{
	static function generatedStyle( $attributes ) {
		extract( $attributes );

		// Generate Styles
		$wrpStyles = new WRPStyleGenerator();

		$mainSl = "#wrpRecentProducts-$cId";
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



		$wrpStyles::addStyle( "$mainSl", [
			GetCSS::getBackgroundCSS( $styles['bg'] ) => '',
			'border-radius' => GetCSS::getBoxCSS( $styles['radius'] ),
			
			'margin' => GetCSS::getBoxCSS( $styles['margin'] ),
			'box-shadow' => GetCSS::getMuiltShadowCSS( $styles['shadow'] )
		] );
		$wrpStyles::addStyle( "$wrpRecentProductsSl", [
			'padding' => GetCSS::getBoxCSS( $styles['padding'] ),
		] );
		// product card
		$wrpStyles::addStyle( "$newProductSl", [
			GetCSS::getBackgroundCSS( $styles['product']['bg']?? [ 'bgType'=>'solid', 'color'=>'#FFF',"bg"=>"#ffffff" ] ) => '',
			'border-radius' => GetCSS::getBoxCSS($styles['product']['radius'] ?? ["top"=> "12px", "right"=> "12px", "bottom"=> "12px", "left"=> "12px"]),
			'border' => ($styles['product']['border']['width'] ?? '1px') . ' ' . ($styles['product']['border']['style'] ?? 'solid') . ' ' . ($styles['product']['border']['color'] ?? '#bbc6dd'),
			'padding' => GetCSS::getBoxCSS( $styles['product']['padding'] ?? ["top"=> "0px", "right"=> "0px", "bottom"=> "0px", "left"=> "0px"] ),


		] );

		$wrpStyles::addStyle( "$newProductSl:hover", [
		'box-shadow' => GetCSS::getMuiltShadowCSS($styles['product']["hover"]['shadow'] ?? [['type'=>'box','hOffset'=>'0px','vOffset'=>'10px','blur'=>'15px','spreed'=>'-3px','color'=>'rgba(0, 0, 0, 0.1)','isInset'=>false]]),
		'transform' => 'translateY(' . ($styles['product']['hover']['translateY'] ?? -4) . 'px)',

		] );

		//  product image 
		$wrpStyles::addStyle( "$productImgSl", [
		'width'      => $styles['product']['image']['width'] ?? '100%',
		'height'     => $styles['product']['image']['height'] ?? '100%',
		'object-fit' => $styles['product']['image']['objectFit'] ?? 'cover',
		] );


		$wrpStyles::addStyle( "$productImgSl:hover", [
			'transform' => 'scale(' . ($styles['product']['image']['scale'] ?? 1.1) . ')',
		] );
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card_body ", [
			'padding' => GetCSS::getBoxCSS( $styles['product']['content']['padding'] ?? ["top"=> "16px", "right"=> "16px", "bottom"=> "16px", "left"=> "16px"] ),
			
		] );
		// product category
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__category a", [
			'color' => $styles['product']['content']['category']['color'] ?? '#80736b'
		] );
		// product name
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__name", [
			'color' => $styles['product']['content']['name']['color'] ?? '#111827'
		] );
		// product review
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__rating_icon", [
			'color' => $styles['product']['content']['review']['icon']['color'] ?? '#fbbf24',
			'fill' => $styles['product']['content']['review']['icon']['color'] ?? '#fbbf24',
			'width' => $styles['product']['content']['review']['icon']['size'] ?? '16px',
			'height' => $styles['product']['content']['review']['icon']['size'] ?? '16px'
		] );
		// product review value
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__rating_value", [
			'color' => $styles['product']['content']['review']['value']['color'] ?? '#374151'
		] );
		// product review count
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__rating_count", [
			'color' => $styles['product']['content']['category']['color'] ?? '#80736b'
		] );
		// salePrice
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__price", [
			'color' => $styles['product']['content']['price']["salePrice"]['color'] ?? '#111827'
		] );
		// regular price
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__original-price", [
			'color' => $styles['product']['content']['price']["regularPrice"]['color'] ?? '#9ca3af'
		] );
		// addCart
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__button", [
			GetCSS::getColorsCSS( $styles['product']['content']['addCart']["colors"] ?? [ 'color'=> '#fff', 'bg'=> '#111827' ] ) => '',
			'border-radius' => GetCSS::getBoxCSS($styles['product']['content']['addCart']['radius'] ?? ["top"=> "8px", "right"=> "8px", "bottom"=> "8px", "left"=> "8px"]),
			'padding' => GetCSS::getBoxCSS( $styles['product']['content']['addCart']['padding'] ?? ["top"=> "10px", "right"=> "10px", "bottom"=> "10px", "left"=> "10px"] ),
			
		] );
		// add card icon
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__button .wrp_product_card__button-icon ", [
		   'width'  => ( $styles['product']['content']['addCart']['icon']['size'] ?? 20 ) . 'px',
		   'height' => ( $styles['product']['content']['addCart']['icon']['size'] ?? 20 ) . 'px',
			
		] );
		
		// badge
		$wrpStyles::addStyle( "$newProductSl .wrp_product_card__badge", [
			GetCSS::getColorsCSS( $styles['product']['content']['tag']["colors"] ?? [ 'color'=> '#fff', 'bg'=> '#ef4444' ] ) => '',
			'border-radius' => GetCSS::getBoxCSS($styles['product']['content']['tag']['radius'] ?? ["top"=> "4px", "right"=> "4px", "bottom"=> "4px", "left"=> "4px"]),
			'padding' => GetCSS::getBoxCSS( $styles['product']['content']['tag']['padding'] ?? ["top"=> "4px", "right"=> "8px", "bottom"=> "4px", "left"=> "8px"] ),
		] );







		$wrpStyles::addStyle( "$mainSl .wrpRecentProducts", [
			'grid-gap' => "$rowGap $columnGap"
		] );
		$wrpStyles::addStyle( "$productSl", [
			'text-align' => $textAlign,
			GetCSS::getBackgroundCSS( $productBG ) => '',
			GetCSS::getBorderCSS( $productBorder ) => '',
			'box-shadow' => GetCSS::getShadowCSS( $productShadow )
		] );
		$wrpStyles::addStyle( "$productSl .wrpProductImg", [
			'border-top-left-radius' => $productBorder['radius'] ?? '0',
			'border-top-right-radius' => $productBorder['radius'] ?? '0'
		] );
		$wrpStyles::addStyle( "$productSl .productTitle", [
			'color' => $titleColor
		] );
		$wrpStyles::addStyle( "$productSl .productRating .star-rating span", [
			'color' => $ratingColor
		] );
		$wrpStyles::addStyle( "$productSl .productPrice", [
			'color' => $priceColor
		] );
		$wrpStyles::addStyle( "$productSl .productAddToCartArea", [
			'justify-content' => $textAlign
		] );
		$wrpStyles::addStyle( "$productSl .productAddToCartArea .button", [
			GetCSS::getColorsCSS( $addToCartColors ) => ''
		] );
		$wrpStyles::addStyle( "$productSl .productOnSale", [
			GetCSS::getColorsCSS( $onSaleColors ) => ''
		] );



		ob_start();
			echo GetCSS::getTypoCSS( '', $titleTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $priceTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $addToCartTypo )['googleFontLink'];

			echo GetCSS::getTypoCSS( '', $categoryTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $nameTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $reviewValueTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $salePriceTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $regularPriceTypo )['googleFontLink'];
			echo GetCSS::getTypoCSS( '', $discountTypo )['googleFontLink'];
			
			echo GetCSS::getTypoCSS( "$productSl .productTitle", $titleTypo )['styles'];
			echo GetCSS::getTypoCSS( "$productSl .productPrice", $priceTypo )['styles'];
			echo GetCSS::getTypoCSS( "$productSl .productAddToCartArea .button", $addToCartTypo )['styles'];

			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__category a", $categoryTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__name", $nameTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__rating_value", $reviewValueTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__rating_count", $reviewValueTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__price", $salePriceTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__original-price", $regularPriceTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__badge", $discountTypo )['styles'];
			echo GetCSS::getTypoCSS( "$newProductSl .wrp_product_card__button", $addToCartTypo )['styles'];
			


			echo wp_kses( $wrpStyles::renderStyle(), [] );

			$wrpStyles::$styles = []; // Empty styles
		return ob_get_clean();
	}
}

