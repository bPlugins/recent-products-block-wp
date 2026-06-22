<?php
namespace RecentProductsBlock\Inc;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


class BlockRenderer {
    public static function singlePostLayout( $attributes, $product ){
        $ID = $product->get_id();

        ob_start(); ?>
        <article class='wrpProduct wrpProduct-<?php echo esc_attr( $ID ); ?>'>
            <?php echo wp_kses_post( self::productImage( $product, $attributes ) ); ?>
            
            <div class='wrpProductDetails'>
                <?php
                    echo wp_kses_post( self::productTitle( $product, $attributes ) );
                    echo wp_kses_post( self::productRating( $product, $attributes ) );
                    echo wp_kses_post( self::productPrice( $product, $attributes ) );
                    
                    $allowed_html = array_merge( wp_kses_allowed_html( 'post' ), [
                        'a' => [
                            'href' => true,
                            'class' => true,
                            'data-quantity' => true,
                            'data-product_id' => true,
                            'data-product_sku' => true,
                            'aria-label' => true,
                            'rel' => true,
                        ]
                    ] );
                    echo wp_kses( self::productAddToCartArea( $product, $attributes ), $allowed_html );
                ?>
            </div>

            <?php echo wp_kses_post( self::productOnSale( $product, $attributes ) ); ?>
        </article>
        <?php return ob_get_clean();
    }

    public static function productImage( $product, $attributes ){
        $ID = $product->get_id();
        $link = esc_url( $product->get_permalink() );
        $hasImage = has_post_thumbnail( $ID );
        $imgHTML = get_the_post_thumbnail( $ID );
        $placeImg = wc_placeholder_img_src();

        if( !empty( $attributes['isImage'] ) ){
            ob_start(); ?>
            <a href='<?php echo esc_url( $link ); ?>'>
                <figure class='wrpProductImg'>
                    <?php if ( $hasImage ) {
                        echo wp_kses_post( $imgHTML );
                    } else {
                        ?>
                        <img src="<?php echo esc_url( $placeImg ); ?>" alt="<?php esc_attr_e( 'Placeholder', 'recent-products-block' ); ?>" />
                        <?php
                    } ?>
                </figure>
            </a>
        <?php return ob_get_clean();
        }else{
            return '';
        }
    }

    public static function productTitle( $product, $attributes ){
        $link = esc_url( $product->get_permalink() );

        if( !empty( $attributes['isTitle'] ) ){
            ob_start(); ?>
            <h3 class='productTitle'>
                <a href='<?php echo esc_attr( $link ); ?>'>
                    <?php echo wp_kses_post( $product->get_title() ); ?>
                </a>
            </h3>
        <?php return ob_get_clean();
        }else{
            return '';
        }
    }

    public static function productRating( $product, $attributes ){
        $rating_count   = $product->get_rating_count();
        $average        = $product->get_average_rating();

        if( !empty( $attributes['isRating'] ) ){
            ob_start(); ?>
            <div class='productRating'>
                <?php echo wp_kses_post( wc_get_rating_html( $average, $rating_count ) ); ?>
            </div>
        <?php return ob_get_clean();
        }else{
            return '';
        }
    }

    public static function productPrice( $product, $attributes ){
        if( !empty( $attributes['isPrice'] ) ){
            ob_start(); ?>
            <div class='productPrice'>
                <?php echo wp_kses_post( $product->get_price_html() ); ?>
            </div>
        <?php return ob_get_clean();
        }else{
            return '';
        }
    }

    public static function productAddToCartArea( $product, $attributes ) {
        $attr = [
            'aria-label'        => $product->add_to_cart_description(),
            'data-quantity'     => '1',
            'data-product_id'   => $product->get_id(),
            'data-product_sku'  => $product->get_sku(),
            'rel'               => 'nofollow',
            'class'             => 'button add_to_cart_button',
        ];

        if (
            $product->supports( 'ajax_add_to_cart' ) &&
            $product->is_purchasable() &&
            ( $product->is_in_stock() || $product->backorders_allowed() )
        ) {
            $attr['class'] .= ' ajax_add_to_cart';
        }

        if( !empty( $attributes['isAddToCartBtn'] ) ){
            ob_start(); ?>
            <div class='productAddToCartArea'>
                <a href='<?php echo esc_url( $product->add_to_cart_url() ); ?>'
                    aria-label='<?php echo esc_attr( $attr['aria-label'] ?? '' ); ?>'
                    data-quantity='<?php echo esc_attr( $attr['data-quantity'] ?? '' ); ?>'
                    data-product_id='<?php echo esc_attr( $attr['data-product_id'] ?? '' ); ?>'
                    data-product_sku='<?php echo esc_attr( $attr['data-product_sku'] ?? '' ); ?>'
                    rel='<?php echo esc_attr( $attr['rel'] ?? '' ); ?>'
                    class='<?php echo esc_attr( $attr['class'] ?? '' ); ?>'
                >
                    <?php echo esc_html( $product->add_to_cart_text() ); ?>
                </a>
            </div>
        <?php return ob_get_clean();
        }else{
            return '';
        }
    }

    public static function productOnSale( $product, $attributes ) {
        if( $product->is_on_sale() ){
            ob_start(); ?>
            <div class='productOnSale'>
                <span aria-hidden='true'>
                    <?php echo esc_html__( 'Sale', 'recent-products-block' ); ?>
                </span>

                <span class='screen-reader-text'>
                    <?php echo esc_html__( 'Product on sale', 'recent-products-block' ); ?>
                </span>
            </div>
        <?php return ob_get_clean();
        }else{
            return '';
        }
    }
    
}
