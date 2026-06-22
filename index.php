<?php
/**
 * Plugin Name: Recent Products Block
 * Description: Display WooCommerce Recent Products
 * Version: 2.0.3
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * Plugin URI: https://github.com/bPlugins/recent-products-block-wp.git
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: recent-products-block
 * Tested up to: 7.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Requires Plugins:  woocommerce
 * 
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant

         define( 'RECENT_PRODUCTS_BLOCK_VERSION', ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? (string) time() : '2.0.3' );
         define( 'RECENT_PRODUCTS_BLOCK_DIR_URL', plugin_dir_url( __FILE__ ) );
         define( 'RECENT_PRODUCTS_BLOCK_DIR_PATH', plugin_dir_path( __FILE__ ) );



	
		require_once RECENT_PRODUCTS_BLOCK_DIR_PATH . 'inc/BlockRenderer.php';
        require_once RECENT_PRODUCTS_BLOCK_DIR_PATH . 'inc/adminMenu.php';


        // ... Your plugin's main file logic ...
	class Recent_Products_Block_Plugin{
	     function __construct(){
		add_action('init', [$this, 'init']); 
		add_action( 'plugins_loaded', [$this, 'pluginsLoaded'] );
	}
	
	function init() {
		register_block_type(__DIR__ . '/build');
        wp_set_script_translations('wrp-recent-products-editor-script', 'recent-products-block', plugin_dir_path(__FILE__) . 'languages');
		 
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
			$activationUrl = wp_nonce_url( 'plugins.php?action=activate&plugin=' . $woocommerce . '&plugin_status=all&paged=1&s', 'activate-plugin_' . $woocommerce );
			
			/* translators: 1: Strong opening tag, 2: Strong closing tag */
			$message = sprintf( esc_html__( '%1$s WooCommerce Recent Products Block.%2$s requires %1$sWooCommerce%2$s plugin to be active. Please activate WooCommerce to continue.', 'recent-products-block' ), '<strong>', '</strong>' );
			
			$button_text = esc_html__( 'Activate WooCommerce', 'recent-products-block' );
		} else {
			$activationUrl = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=woocommerce' ), 'install-plugin_woocommerce' );

			/* translators: 1: Strong opening tag, 2: Strong closing tag */
			$message = sprintf( esc_html__( '%1$s WooCommerce Recent Products Block.%2$s requires %1$sWooCommerce%2$s plugin to be installed and activated. Please install WooCommerce to continue.', 'recent-products-block' ), '<strong>', '</strong>' );

			$button_text = esc_html__( 'Install WooCommerce', 'recent-products-block' );
		}
		
		$button = '<p><a href="'. esc_url( $activationUrl ) . '" class="button-primary">'. esc_html( $button_text ) .'</a></p>';
		
		printf( '<div class="error"><p>%1$s</p>%2$s</div>', wp_kses_post( $message ), wp_kses_post( $button ) );
	}

	function isPluginInstalled( $basename ) {
		if ( !function_exists( 'get_plugins' ) ) {
			include_once ABSPATH .'/wp-admin/includes/plugin.php';
		}

		$installedPlugins = get_plugins();
		
		return isset( $installedPlugins[$basename] );
	}

	
}

new Recent_Products_Block_Plugin();


    




