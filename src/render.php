<?php
use RecentProductsBlock\Inc\Style;
use RecentProductsBlock\Inc\BlockRenderer;


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
require_once RECENT_PRODUCTS_BLOCK_DIR_PATH . 'inc/style.php';




// Attributes
$recent_products_block_c_id                = $attributes['cId'] ?? '';
$recent_products_block_align               = $attributes['align'] ?? '';
$recent_products_block_columns             = $attributes['columns'] ?? [
    'desktop' => 3,
    'tablet'  => 2,
    'mobile'  => 1,
];

$recent_products_block_products_per_page   = $attributes['productsPerPage'] ?? 9;
$recent_products_block_stock_status        = $attributes['stockStatus'] ?? [];
$recent_products_block_selected_categories = $attributes['selectedCategories'] ?? [];
$recent_products_block_options             = $attributes['options'] ?? [];


wp_enqueue_style( 'wrp-recent-products-style' );

// Block classes
$recent_products_block_class_name       = $attributes['className'] ?? '';
$recent_products_block_block_class_name = esc_attr( sprintf( 'wp-block-wrp-recent-products %s align%s', $recent_products_block_class_name, $recent_products_block_align ) );

// Fetch products
$recent_products_block_products = wc_get_products( [
    'limit'        => $recent_products_block_products_per_page,
    'orderby'      => 'date',
    'order'        => 'DESC',
    'stock_status' => $recent_products_block_stock_status,
    'category'     => $recent_products_block_selected_categories,
] );

// No product message (non-advanced)
if ( empty( $recent_products_block_products ) ) {
    echo wp_kses_post( '<h3 class="wrpNoProductFound">' .
        esc_html__( 'No product found! Please add some or change query...', 'recent-products-block' ) .
    '</h3>' );
    return;
}
?>

<div
    class="<?php echo esc_attr( $recent_products_block_block_class_name ); ?>"
    id="wrpRecentProducts-<?php echo esc_attr( $recent_products_block_c_id ); ?>"

    
>

    <style>
        <?php
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- CSS output inside <style> tag; all values are sanitized via GetCSS sanitization helpers.
		echo wp_strip_all_tags( Style::generatedStyle( $attributes ) );
		?>

    
    </style>

    

    <!-- PRODUCTS GRID -->
    <div class="wrpRecentProducts
        columns-<?php echo esc_attr( $recent_products_block_columns['desktop'] ); ?>
        columns-tablet-<?php echo esc_attr( $recent_products_block_columns['tablet'] ); ?>
        columns-mobile-<?php echo esc_attr( $recent_products_block_columns['mobile'] ); ?>">

        <?php
        $recent_products_block_allowed_html = array_merge( wp_kses_allowed_html( 'post' ), [
            'a' => [
                'href'            => true,
                'class'           => true,
                'data-quantity'   => true,
                'data-product_id' => true,
                'data-product_sku'=> true,
                'aria-label'      => true,
                'rel'             => true,
            ]
        ] );

        foreach ( $recent_products_block_products as $recent_products_block_product ) {

            
                echo wp_kses( BlockRenderer::singlePostLayout( $attributes, $recent_products_block_product ), $recent_products_block_allowed_html );
          


        }
        ?>
    </div>
</div>
