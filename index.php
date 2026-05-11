<?php
/**
 * Plugin Name: Recent Products Block
 * Description: Display WooCommerce Recent Products
 * Version: 2.0.1
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * Plugin URI: https://github.com/bPlugins/recent-products-block-wp.git
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: recent-products-block
 * @fs_free_only /vendor/freemius-lite
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant

         define( 'WRP_PLUGIN_VERSION', isset( $_SERVER['HTTP_HOST'] ) && ( 'localhost' === $_SERVER['HTTP_HOST'] || 'plugins.local' === $_SERVER['HTTP_HOST'] ) ? time() : '2.0.1' );
         define( 'WRP_DIR_URL', plugin_dir_url( __FILE__ ) );
         define( 'WRP_DIR_PATH', plugin_dir_path( __FILE__ ) );

// freemius 
 if ( function_exists( 'wrp_fs' ) ) {
        
		  	register_activation_hook(__FILE__, function () {
		
		if (is_plugin_active('recent-products-block/index.php')) {
		  deactivate_plugins('recent-products-block/index.php');
		}
		if (is_plugin_active('recent-products-block-pro/index.php')) {
		  deactivate_plugins('recent-products-block-pro/index.php');
		}
	  });
    } else {
        /**
         * DO NOT REMOVE THIS IF, IT IS ESSENTIAL FOR THE
         * `function_exists` CALL ABOVE TO PROPERLY WORK.
         */
		
	
         

        if ( ! function_exists( 'wrp_fs' ) ) {

            // ... Freemius integration snippet ...
	 function wrp_fs() {
        global $wrp_fs;

        
            // Include Freemius SDK.
          if ( ! isset( $wrp_fs ) ) {

	
		 require_once dirname(__FILE__) . '/vendor/freemius-lite/start.php';
						
            $apbConfig = array(
                'id'                  => '23056',
                'slug'                => 'recent-products-block',
                'premium_slug'        => 'recent-products-block-pro',
                'type'                => 'plugin',
                'public_key'          => 'pk_e4706ce581c33e77292c9ac80d1fe',
                'is_premium'          => false,
                'premium_suffix'      => 'Pro',
                // If your plugin is a serviceware, set this option to false.
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'trial'               => array(
                    'days'               => 7,
                    'is_require_payment' => true,
                ),
                'menu'                => array(
                    'slug'           => 'recent-products-dashboard',
                    'first-path'     => 'admin.php?page=recent-products-dashboard#/welcome',
                    'contact'        => false,
                    'support'        => false,
                ),
            );
            $wrp_fs =fs_lite_dynamic_init( $apbConfig );
        }

        return $wrp_fs;
     }
     wrp_fs();
    // Signal that SDK was initiated.
    do_action( 'wrp_fs_loaded' );
        }

	
		require_once WRP_DIR_PATH . 'inc/BlockRenderer.php';
        require_once WRP_DIR_PATH . 'inc/adminMenu.php';


        // ... Your plugin's main file logic ...
	class WRPPlugin{
	     function __construct(){
		add_action('init', [$this, 'init']); 
		add_action( 'plugins_loaded', [$this, 'pluginsLoaded'] );
	}
	
	function init() {
		register_block_type(__DIR__ . '/build');
        wp_set_script_translations('wrp-recent-products-editor-script', 'recent-products', plugin_dir_path(__FILE__) . 'languages');
		 
      }

	function pluginsLoaded(){
		if ( !did_action( 'woocommerce_loaded' ) ) {
			add_action( 'admin_notices', [$this, 'wooCommerceNotLoaded'] );
			return;
		}
	}

	function wooCommerceNotLoaded(){
		if ( !current_user_can( 'activate_plugins' ) ) {
			return;
		}

		$woocommerce = 'woocommerce/woocommerce.php';
		
		if ( $this->isPluginInstalled( $woocommerce ) ) {
			$activationUrl = wp_nonce_url( 'plugins.php?action=activate&amp;plugin='. $woocommerce .'&amp;plugin_status=all&amp;paged=1&amp;s', 'activate-plugin_'. $woocommerce );
			
			$message = sprintf( __( '%1$s WooCommerce Recent Products Block.%2$s requires %1$sWooCommerce%2$s plugin to be active. Please activate WooCommerce to continue.', 'recent-products' ), "<strong>", "</strong>" );
			
			$button_text = __( 'Activate WooCommerce', 'recent-products' );
		} else {
			$activationUrl = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=woocommerce' ), 'install-plugin_woocommerce' );

			$message = sprintf( __( '%1$s WooCommerce Recent Products Block.%2$s requires %1$sWooCommerce%2$s plugin to be installed and activated. Please install WooCommerce to continue.', 'recent-products' ), '<strong>', '</strong>' );

			$button_text = __( 'Install WooCommerce', 'recent-products' );
		}
		
		$button = '<p><a href="'. esc_url( $activationUrl ) . '" class="button-primary">'. esc_html( $button_text ) .'</a></p>';
		
		printf( '<div class="error"><p>%1$s</p>%2$s</div>', $message, $button );
	}

	function isPluginInstalled( $basename ) {
		if ( !function_exists( 'get_plugins' ) ) {
			include_once ABSPATH .'/wp-admin/includes/plugin.php';
		}

		$installedPlugins = get_plugins();
		
		return isset( $installedPlugins[$basename] );
	}

	
}

new WRPPlugin();

    }



