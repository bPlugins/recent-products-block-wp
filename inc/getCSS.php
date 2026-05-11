<?php
namespace WRP\Inc;

class GetCSS{
	static function isValidCSS($property, $value) {
		if ( empty( $value ) && $value !== '0' && $value !== 0 ) {
			return '';
		}
		return "$property: $value;";
	}

	static function getBackgroundCSS( $bg, $isSolid = true, $isGradient = true, $isImage = true ) {
		extract( $bg );
		$type = $type ?? 'solid';
		$color = $color ?? '';
		$gradient = $gradient ?? 'linear-gradient(135deg, #0040E3, #18D4FD)';
		$image = $image ?? [];
		$position = $position ?? 'center center';
		$attachment = $attachment ?? '';
		$repeat = $repeat ?? '';
		$size = $size ?? '';
		$overlayColor = $overlayColor ?? '';

		if ( 'gradient' === $type && $isGradient ) {
			$styles = self::isValidCSS('background', $gradient);
		} elseif ( 'image' === $type && $isImage ) {
			$imgUrl = $image['url'] ?? '';
			$styles = "background: url($imgUrl);"
				. self::isValidCSS('background-color', $overlayColor)
				. self::isValidCSS('background-position', $position)
				. self::isValidCSS('background-size', $size)
				. self::isValidCSS('background-repeat', $repeat)
				. self::isValidCSS('background-attachment', $attachment)
				. self::isValidCSS('background-repeat', $repeat)
				. "background-blend-mode: overlay;";
		} else {
			$styles = $isSolid ? self::isValidCSS('background', $color) : '';
		}

		return $styles;
	}

	static function getBorderCSS( $border ) {
		extract( $border );
		$width = $width ?? '0px';
		$style = $style ?? 'solid';
		$color = $color ?? '#0000';
		$side = $side ?? 'all';
		$radius = $radius ?? '0px';
	
		$borderSideCheck = function( $s ) use ( $side ) {
			$bSide = strtolower( $side );
			return false !== strpos( $bSide, 'all' ) || false !== strpos( $bSide, $s );
		};
	
		$noWidth = $width === '0px' || !$width;
		$borderCSS = "$width $style $color";

		$styles = '';
		foreach ( ['top', 'right', 'bottom', 'left'] as $s ) {
			if ( !$noWidth && $borderSideCheck( $s ) ) { $styles .= "border-$s: $borderCSS;"; }
		}
		if ( $radius ) { $styles .= "border-radius: $radius;"; }
	
		return $styles;
	}

	static function getColorsCSS( $colors ) {
		extract( $colors );
		$color = $color ?? '';
		$bgType = $bgType ?? 'solid';
		$bg = $bg ?? '';
		$gradient = $gradient ?? 'linear-gradient(135deg, #0040E3, #18D4FD)';

		$background = ( $bgType === 'gradient' ) ? $gradient : $bg;

		$styles = self::isValidCSS('color', $color);
		$styles .= ($gradient || $bg) ? self::isValidCSS('background', $background) : '';

		return $styles;
	}

	static function getShadowCSS( $shadow ) {
		extract( $shadow );
		$type = $type ?? 'box';
		$hOffset = $hOffset ?? '0px';
		$vOffset = $vOffset ?? '0px';
		$blur = $blur ?? '0px';
		$spreed = $spreed ?? '0px';
		$color = $color ?? '#7090b0';
		$isInset = $isInset ?? false;

		$inset = $isInset ? 'inset' : '';
		$offsetBlur = "$hOffset $vOffset $blur";

		$styles = 'text' === $type ? "$offsetBlur $color" : "$offsetBlur $spreed $color $inset";
	
		return $styles ?: 'none';
	}

	static function checkUnit( $size ) {
		$value = (string)$size;
		$units = ['px', 'em', 'rem', '%', 'vh', 'vw'];

		foreach ( $units as $unit ) {
			if ( substr( $value, -strlen( $unit ) ) === $unit ) {
				return $value;
			}
		}

		if ( is_numeric( $size ) ) {
			return $value . 'px';
		}

		return '';
	}

	static function getTypoCSS( $selector, $typo, $isFamily = true ) {
		extract( $typo );
		$fontFamily = $fontFamily ?? 'Default';
		$fontCategory = $fontCategory ?? 'sans-serif';
		$fontVariant = $fontVariant ?? 400;
		$fontWeight = $fontWeight ?? '';
		$isUploadFont = $isUploadFont ?? true;
		$fontSize = $fontSize ?? [ 'desktop' => null, 'tablet' => null, 'mobile' => null ];
		$fontStyle = $fontStyle ?? '';
		$textTransform = $textTransform ?? '';
		$textDecoration = $textDecoration ?? '';
		$lineHeight = $lineHeight ?? '';
		$letterSpace = $letterSpace ?? '';

		$isEmptyFamily = !$isFamily || !$fontFamily || 'Default' === $fontFamily;
		$desktopFontSize = $fontSize['desktop'] ?? $fontSize;
		$tabletFontSize = $fontSize['tablet'] ?? $desktopFontSize;
		$mobileFontSize = $fontSize['mobile'] ?? $tabletFontSize;

		$tabBreakpoint = '@media only screen and (max-width: 1024px)';
		$mobileBreakpoint = '@media only screen and (max-width: 640px)';

		$styles = 
			($isEmptyFamily ? '' : "font-family: '$fontFamily', $fontCategory;") .
			self::isValidCSS('font-weight', $fontWeight) .
			self::isValidCSS('font-size', self::checkUnit($desktopFontSize)) .
			self::isValidCSS('font-style', $fontStyle) .
			self::isValidCSS('text-transform', $textTransform) .
			self::isValidCSS('text-decoration', $textDecoration) .
			self::isValidCSS('line-height', $lineHeight) .
			self::isValidCSS('letter-spacing', $letterSpace);

		// Google font link
		if (!$fontVariant || $fontVariant === 400) {
			$linkQuery = '';
		} elseif ($fontVariant === '400i') {
			$linkQuery = ':ital@1';
		} elseif (strpos($fontVariant, '00i') !== false) {
			$linkQuery = ':ital,wght@1,' . str_replace('00i', '00', $fontVariant);
		} else {
			$linkQuery = ":wght@$fontVariant";
		}

		$link = $isEmptyFamily ? '' : 'https://fonts.googleapis.com/css2?family=' . str_replace(' ', '+', $fontFamily) . $linkQuery . '&display=swap';

		return [
			'googleFontLink' => (!$isUploadFont || $isEmptyFamily) ? '' : "@import url($link);",
			'styles' => preg_replace('/\s+/', ' ', trim("
				$selector { $styles }
				$tabBreakpoint {
					$selector { " . self::isValidCSS('font-size', self::checkUnit($tabletFontSize)) . " }
				}
				$mobileBreakpoint {
					$selector { " . self::isValidCSS('font-size', self::checkUnit($mobileFontSize)) . " }
				}
			"))
		];
	}

	static function getBoxCSS( $margin ) {
		extract( $margin );
		$top = $top ?? '0px';
		$right = $right ?? '0px';
		$bottom = $bottom ?? '0px';
		$left = $left ?? '0px';
		$styles =  "$top $right $bottom $left";
		return $styles;
	}
	static function getMuiltShadowCSS( $shadow ) {

		if ( empty($shadow) || !is_array($shadow) ) {
			return 'none';
		}
	
		$shadow = $shadow[0]; // 🔑 IMPORTANT
	
		extract( $shadow );
	
		$type     = $type ?? 'box';
		$hOffset  = $hOffset ?? '0px';
		$vOffset  = $vOffset ?? '0px';
		$blur     = $blur ?? '0px';
		$spreed   = $spreed ?? '0px';
		$color    = $color ?: '#7090b0';
		$isInset  = $isInset ?? false;
	
		$inset = $isInset ? 'inset' : '';
		$offsetBlur = "$hOffset $vOffset $blur";
	
		return 'text' === $type
			? "$offsetBlur $color"
			: "$offsetBlur $spreed $color $inset";
	}
	
}