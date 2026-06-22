<?php
namespace RecentProductsBlock\Inc;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GetCSS {

	// ─── CSS Sanitization Helpers ───────────────────────────────────────

	/**
	 * Sanitize a generic CSS value.
	 * Strips dangerous constructs like expression(), javascript:, extra braces.
	 *
	 * @param string $value Raw CSS value.
	 * @return string Sanitized CSS value.
	 */
	static function sanitize_css_value( $value ) {
		$value = (string) $value;

		if ( '' === $value ) {
			return '';
		}

		// Remove null bytes.
		$value = str_replace( "\0", '', $value );

		// Block dangerous CSS expressions / script injections.
		$blocked_patterns = [
			'/expression\s*\(/i',
			'/javascript\s*:/i',
			'/behaviour\s*:/i',
			'/behavior\s*:/i',
			'/\bvar\s*\(/i',     // Disable CSS var() injection from user input
			'/-moz-binding/i',
		];

		foreach ( $blocked_patterns as $pattern ) {
			if ( preg_match( $pattern, $value ) ) {
				return '';
			}
		}

		// Remove any stray braces or angle brackets that could break out of a CSS rule.
		$value = str_replace( [ '{', '}', '<', '>' ], '', $value );

		// Remove semicolons (they could terminate a rule and inject new ones).
		// Note: semicolons are added by the CSS generator, not expected in values.
		$value = str_replace( ';', '', $value );

		// Limit length to prevent abuse.
		if ( strlen( $value ) > 500 ) {
			return '';
		}

		return trim( $value );
	}

	/**
	 * Sanitize a CSS color value.
	 * Allows: hex, rgb(), rgba(), hsl(), hsla(), named colors, transparent, inherit, currentColor.
	 *
	 * @param string $color Raw color string.
	 * @return string Sanitized color or empty string.
	 */
	static function sanitize_css_color( $color ) {
		$color = trim( (string) $color );

		if ( '' === $color ) {
			return '';
		}

		// Hex colors: #RGB, #RRGGBB, #RGBA, #RRGGBBAA
		if ( preg_match( '/^#[0-9a-fA-F]{3,8}$/', $color ) ) {
			return $color;
		}

		// rgb() / rgba() — allow numbers, commas, spaces, dots, slashes, percentages.
		if ( preg_match( '/^rgba?\(\s*[\d\s,.\/%]+\)$/i', $color ) ) {
			return $color;
		}

		// hsl() / hsla()
		if ( preg_match( '/^hsla?\(\s*[\d\s,.\/%deg]+\)$/i', $color ) ) {
			return $color;
		}

		// Named colors and keywords.
		$named_colors = [
			'transparent', 'inherit', 'initial', 'unset', 'currentcolor', 'currentColor',
			'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque',
			'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue',
			'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
			'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
			'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred',
			'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey',
			'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
			'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
			'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey',
			'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender',
			'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
			'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
			'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
			'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon',
			'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
			'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
			'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy',
			'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
			'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
			'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown',
			'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna',
			'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
			'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat',
			'white', 'whitesmoke', 'yellow', 'yellowgreen',
		];

		if ( in_array( strtolower( $color ), array_map( 'strtolower', $named_colors ), true ) ) {
			return $color;
		}

		return '';
	}

	/**
	 * Sanitize a CSS dimension value (e.g., 10px, 1.5em, 100%).
	 *
	 * @param string $value Raw dimension.
	 * @return string Sanitized dimension or empty string.
	 */
	static function sanitize_css_dimension( $value ) {
		$value = trim( (string) $value );

		if ( '' === $value ) {
			return '';
		}

		// Allow numeric values with optional unit.
		if ( preg_match( '/^-?\d+(\.\d+)?\s*(px|em|rem|%|vh|vw|vmin|vmax|pt|cm|mm|in|ex|ch)?$/i', $value ) ) {
			return $value;
		}

		// Allow keywords.
		$keywords = [ 'auto', 'inherit', 'initial', 'unset', 'none', '0' ];
		if ( in_array( strtolower( $value ), $keywords, true ) ) {
			return $value;
		}

		return '';
	}

	/**
	 * Sanitize a CSS gradient value.
	 *
	 * @param string $gradient Raw gradient string.
	 * @return string Sanitized gradient or empty string.
	 */
	static function sanitize_css_gradient( $gradient ) {
		$gradient = trim( (string) $gradient );

		if ( '' === $gradient ) {
			return '';
		}

		// Must start with a gradient function.
		if ( ! preg_match( '/^(linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient)\s*\(/i', $gradient ) ) {
			return '';
		}

		// Apply general sanitization (blocks expressions/scripts, removes braces).
		$gradient = self::sanitize_css_value( $gradient );

		// Re-check it still looks like a gradient after sanitization.
		if ( '' === $gradient ) {
			return '';
		}

		return $gradient;
	}

	/**
	 * Sanitize a CSS font family name.
	 *
	 * @param string $family Raw font family.
	 * @return string Sanitized font family.
	 */
	static function sanitize_css_font_family( $family ) {
		$family = trim( (string) $family );

		if ( '' === $family || 'Default' === $family ) {
			return '';
		}

		// Allow only alphanumeric, spaces, hyphens, and quotes.
		if ( preg_match( '/^[a-zA-Z0-9\s\-_\'",.]+$/', $family ) ) {
			return $family;
		}

		return '';
	}

	/**
	 * Validate a CSS keyword against an allowlist.
	 *
	 * @param string $value   Raw value.
	 * @param array  $allowed Allowed values.
	 * @return string Validated value or empty string.
	 */
	static function sanitize_css_keyword( $value, $allowed ) {
		$value = trim( strtolower( (string) $value ) );
		return in_array( $value, $allowed, true ) ? $value : '';
	}

	/**
	 * Sanitize a URL for use in CSS background-image.
	 *
	 * @param string $url Raw URL.
	 * @return string Sanitized URL or empty string.
	 */
	static function sanitize_css_url( $url ) {
		$url = trim( (string) $url );

		if ( '' === $url ) {
			return '';
		}

		// Use WordPress's built-in URL sanitization.
		$url = esc_url( $url );

		// Only allow http/https protocols.
		if ( ! preg_match( '/^https?:\/\//i', $url ) && ! empty( $url ) ) {
			return '';
		}

		return $url;
	}


	// ─── CSS Generation Methods ────────────────────────────────────────

	static function isValidCSS( $property, $value ) {
		if ( empty( $value ) && $value !== '0' && $value !== 0 ) {
			return '';
		}

		$value = self::sanitize_css_value( (string) $value );

		if ( '' === $value ) {
			return '';
		}

		return "$property: $value;";
	}

	static function getBackgroundCSS( $bg, $isSolid = true, $isGradient = true, $isImage = true ) {

		$type       = self::sanitize_css_keyword( $bg['type'] ?? 'solid', [ 'solid', 'gradient', 'image' ] ) ?: 'solid';
		$color      = self::sanitize_css_color( $bg['color'] ?? '' );
		$gradient   = self::sanitize_css_gradient( $bg['gradient'] ?? 'linear-gradient(135deg, #0040E3, #18D4FD)' );
		$image      = $bg['image'] ?? [];
		$position   = self::sanitize_css_keyword( $bg['position'] ?? 'center center', [
			'center center', 'center top', 'center bottom',
			'left top', 'left center', 'left bottom',
			'right top', 'right center', 'right bottom',
			'top', 'bottom', 'left', 'right', 'center',
		] ) ?: 'center center';
		$attachment = self::sanitize_css_keyword( $bg['attachment'] ?? '', [ 'scroll', 'fixed', 'local', '' ] );
		$repeat     = self::sanitize_css_keyword( $bg['repeat'] ?? '', [ 'repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round', '' ] );
		$size       = self::sanitize_css_keyword( $bg['size'] ?? '', [ 'auto', 'cover', 'contain', '' ] );
		$overlay    = self::sanitize_css_color( $bg['overlayColor'] ?? '' );

		if ( 'gradient' === $type && $isGradient ) {
			$styles = self::isValidCSS( 'background', $gradient );

		} elseif ( 'image' === $type && $isImage ) {

			$imgUrl = self::sanitize_css_url( $image['url'] ?? '' );

			$styles =
				"background: url($imgUrl);" .
				self::isValidCSS( 'background-color', $overlay ) .
				self::isValidCSS( 'background-position', $position ) .
				self::isValidCSS( 'background-size', $size ) .
				self::isValidCSS( 'background-repeat', $repeat ) .
				self::isValidCSS( 'background-attachment', $attachment ) .
				"background-blend-mode: overlay;";

		} else {
			$styles = $isSolid ? self::isValidCSS( 'background', $color ) : '';
		}

		return $styles;
	}

	static function getBorderCSS( $border ) {

		$width  = self::sanitize_css_dimension( $border['width'] ?? '0px' );
		$style  = self::sanitize_css_keyword( $border['style'] ?? 'solid', [ 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden' ] ) ?: 'solid';
		$color  = self::sanitize_css_color( $border['color'] ?? '#0000' );
		$side   = self::sanitize_css_keyword( $border['side'] ?? 'all', [ 'all', 'top', 'right', 'bottom', 'left', 'top right', 'top left', 'bottom right', 'bottom left', 'top bottom', 'left right' ] ) ?: 'all';
		$radius = self::sanitize_css_dimension( $border['radius'] ?? '0px' );

		$borderSideCheck = function( $s ) use ( $side ) {
			$bSide = strtolower( $side );
			return false !== strpos( $bSide, 'all' ) || false !== strpos( $bSide, $s );
		};

		$noWidth    = $width === '0px' || ! $width;
		$borderCSS  = "$width $style $color";
		$styles     = '';

		foreach ( [ 'top', 'right', 'bottom', 'left' ] as $s ) {
			if ( ! $noWidth && $borderSideCheck( $s ) ) {
				$styles .= "border-$s: $borderCSS;";
			}
		}

		if ( $radius ) {
			$styles .= "border-radius: $radius;";
		}

		return $styles;
	}

	static function getColorsCSS( $colors ) {

		$color     = self::sanitize_css_color( $colors['color'] ?? '' );
		$bgType    = self::sanitize_css_keyword( $colors['bgType'] ?? 'solid', [ 'solid', 'gradient' ] ) ?: 'solid';
		$bg        = self::sanitize_css_color( $colors['bg'] ?? '' );
		$gradient  = self::sanitize_css_gradient( $colors['gradient'] ?? 'linear-gradient(135deg, #0040E3, #18D4FD)' );

		$background = ( 'gradient' === $bgType ) ? $gradient : $bg;

		$styles  = self::isValidCSS( 'color', $color );
		$styles .= ( $gradient || $bg ) ? self::isValidCSS( 'background', $background ) : '';

		return $styles;
	}

	static function getShadowCSS( $shadow ) {

		$type     = self::sanitize_css_keyword( $shadow['type'] ?? 'box', [ 'box', 'text' ] ) ?: 'box';
		$hOffset  = self::sanitize_css_dimension( $shadow['hOffset'] ?? '0px' );
		$vOffset  = self::sanitize_css_dimension( $shadow['vOffset'] ?? '0px' );
		$blur     = self::sanitize_css_dimension( $shadow['blur'] ?? '0px' );
		$spread   = self::sanitize_css_dimension( $shadow['spreed'] ?? '0px' );
		$color    = self::sanitize_css_color( $shadow['color'] ?? '#7090b0' );
		$isInset  = ! empty( $shadow['isInset'] );

		$inset       = $isInset ? 'inset' : '';
		$offsetBlur  = "$hOffset $vOffset $blur";

		$styles = ( 'text' === $type )
			? "$offsetBlur $color"
			: "$offsetBlur $spread $color $inset";

		return $styles ?: 'none';
	}

	static function checkUnit( $size ) {

		$value = (string) $size;
		$units = [ 'px', 'em', 'rem', '%', 'vh', 'vw' ];

		foreach ( $units as $unit ) {
			if ( substr( $value, -strlen( $unit ) ) === $unit ) {
				// Validate the numeric part.
				$numPart = substr( $value, 0, -strlen( $unit ) );
				if ( is_numeric( $numPart ) ) {
					return $value;
				}
				return '';
			}
		}

		if ( is_numeric( $size ) ) {
			return $value . 'px';
		}

		return '';
	}

	static function getTypoCSS( $selector, $typo, $isFamily = true ) {

		$fontFamily     = $typo['fontFamily'] ?? 'Default';
		$fontCategory   = self::sanitize_css_font_family( $typo['fontCategory'] ?? 'sans-serif' );
		$fontVariant    = $typo['fontVariant'] ?? 400;
		$fontWeight     = self::sanitize_css_keyword( (string) ( $typo['fontWeight'] ?? '' ), [ '', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'bolder', 'lighter' ] );
		$isUploadFont   = $typo['isUploadFont'] ?? true;

		$fontSize = $typo['fontSize'] ?? [
			'desktop' => null,
			'tablet'  => null,
			'mobile'  => null
		];

		$fontStyle      = self::sanitize_css_keyword( $typo['fontStyle'] ?? '', [ '', 'normal', 'italic', 'oblique' ] );
		$textTransform  = self::sanitize_css_keyword( $typo['textTransform'] ?? '', [ '', 'none', 'capitalize', 'uppercase', 'lowercase' ] );
		$textDecoration = self::sanitize_css_keyword( $typo['textDecoration'] ?? '', [ '', 'none', 'underline', 'overline', 'line-through' ] );
		$lineHeight     = self::sanitize_css_dimension( $typo['lineHeight'] ?? '' );
		$letterSpace    = self::sanitize_css_dimension( $typo['letterSpace'] ?? '' );

		$cleanedFontFamily = self::sanitize_css_font_family( $fontFamily );
		$isEmptyFamily   = ! $isFamily || ! $cleanedFontFamily || 'Default' === $fontFamily;

		$desktop = $fontSize['desktop'] ?? $fontSize;
		$tablet  = $fontSize['tablet'] ?? $desktop;
		$mobile  = $fontSize['mobile'] ?? $tablet;

		$tabBreakpoint    = '@media only screen and (max-width: 1024px)';
		$mobileBreakpoint = '@media only screen and (max-width: 640px)';

		// Removed external Google Fonts call to comply with WordPress.org guidelines and privacy rules (GDPR).
		// Replaced with a system default fonts fallback stack to ensure no external HTTP requests are made,
		// optimizing performance and preventing layout shifts.
		$systemFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
		$finalFontFamily = $isEmptyFamily ? "font-family: $systemFontStack;" : "font-family: '$cleanedFontFamily', $fontCategory, $systemFontStack;";

		$styles =
			$finalFontFamily .
			self::isValidCSS( 'font-weight', $fontWeight ) .
			self::isValidCSS( 'font-size', self::checkUnit( $desktop ) ) .
			self::isValidCSS( 'font-style', $fontStyle ) .
			self::isValidCSS( 'text-transform', $textTransform ) .
			self::isValidCSS( 'text-decoration', $textDecoration ) .
			self::isValidCSS( 'line-height', $lineHeight ) .
			self::isValidCSS( 'letter-spacing', $letterSpace );

		return [
			'googleFontLink' => '', // External font loading completely removed

			'styles' => preg_replace(
				'/\s+/',
				' ',
				trim("
					$selector { $styles }

					$tabBreakpoint {
						$selector { " . self::isValidCSS( 'font-size', self::checkUnit( $tablet ) ) . " }
					}

					$mobileBreakpoint {
						$selector { " . self::isValidCSS( 'font-size', self::checkUnit( $mobile ) ) . " }
					}
				")
			)
		];
	}

	static function getBoxCSS( $margin ) {
		return self::sanitize_css_dimension( $margin['top'] ?? '0px' ) . ' ' .
		       self::sanitize_css_dimension( $margin['right'] ?? '0px' ) . ' ' .
		       self::sanitize_css_dimension( $margin['bottom'] ?? '0px' ) . ' ' .
		       self::sanitize_css_dimension( $margin['left'] ?? '0px' );
	}

	static function getMuiltShadowCSS( $shadow ) {

		if ( empty( $shadow ) || ! is_array( $shadow ) ) {
			return 'none';
		}

		$shadow    = $shadow[0];
		$type      = self::sanitize_css_keyword( $shadow['type'] ?? 'box', [ 'box', 'text' ] ) ?: 'box';
		$hOffset   = self::sanitize_css_dimension( $shadow['hOffset'] ?? '0px' );
		$vOffset   = self::sanitize_css_dimension( $shadow['vOffset'] ?? '0px' );
		$blur      = self::sanitize_css_dimension( $shadow['blur'] ?? '0px' );
		$spread    = self::sanitize_css_dimension( $shadow['spreed'] ?? '0px' );
		$color     = self::sanitize_css_color( $shadow['color'] ?? '#7090b0' );
		$isInset   = ! empty( $shadow['isInset'] );

		$inset = $isInset ? 'inset' : '';
		$offset = "$hOffset $vOffset $blur";

		return ( 'text' === $type )
			? "$offset $color"
			: "$offset $spread $color $inset";
	}
}