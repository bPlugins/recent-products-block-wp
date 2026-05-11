<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
require_once WRP_DIR_PATH . 'inc/style.php';
require_once WRP_DIR_PATH . 'inc/layouts.php';

use WRP\Inc\Style;
use WRP\Inc\BlockRenderer;
use WRP\Inc\layouts;



// Attributes
$cId        = $attributes['cId'] ?? '';
$align      = $attributes['align'] ?? '';
$columns    = $attributes['columns'] ?? [
    'desktop' => 3,
    'tablet'  => 2,
    'mobile'  => 1,
];

$productsPerPage    = $attributes['productsPerPage'] ?? 9;
$stockStatus        = $attributes['stockStatus'] ?? [];
$selectedCategories = $attributes['selectedCategories'] ?? [];
$options            = $attributes['options'] ?? [];
$theme              = $attributes['selectTheme'] ?? 'default';

wp_enqueue_style( 'wrp-recent-products-style' );

// Block classes
$className = $className ?? '';
$blockClassName = "wp-block-wrp-recent-products $className align$align";

// Fetch products
$products = wc_get_products( [
    'limit'        => $productsPerPage,
    'orderby'      => 'date',
    'order'        => 'DESC',
    'stock_status' => $stockStatus,
    'category'     => $selectedCategories,
] );

// No product message (non-advanced)
if ( empty( $products ) && $theme !== 'advanced' ) {
    echo '<h3 class="wrpNoProductFound">' .
        esc_html__( 'No product found! Please add some or change query...', 'recent-products' ) .
    '</h3>';
    return;
}
?>

<div
    class="<?php echo esc_attr( $blockClassName ); ?>"
    id="wrpRecentProducts-<?php echo esc_attr( $cId ); ?>"
    data-theme="<?php echo esc_attr( $theme ); ?>"
    data-attributes='<?php echo wp_json_encode( $attributes ); ?>'
>

    <style>
        <?php echo wp_kses( Style::generatedStyle( $attributes ), [] ); ?>

        /* ===============================
           PREMIUM OVERLAY STYLES
        =============================== */
    
    </style>

    <!-- PREMIUM OVERLAY (NOT for default theme) -->
    

    <!-- PRODUCTS GRID -->
    <div class="wrpRecentProducts
        columns-<?php echo esc_attr( $columns['desktop'] ); ?>
        columns-tablet-<?php echo esc_attr( $columns['tablet'] ); ?>
        columns-mobile-<?php echo esc_attr( $columns['mobile'] ); ?>">

        <?php
        foreach ( $products as $product ) {

            if ( $theme === 'default' ) {
                echo BlockRenderer::singlePostLayout( $attributes, $product );
            }


        }
        ?>
    </div>
</div>
