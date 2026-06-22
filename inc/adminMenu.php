<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Recent_Products_Block_Admin {
	private $post_type = 'wrpb';

	public function __construct() {
		add_action( 'admin_menu', [ $this, 'adminMenu' ] );
		add_action( 'admin_menu', [ $this, 'fixDashboardSubmenu' ], 999 ); // after menus built
		add_action( 'admin_enqueue_scripts', [ $this, 'adminEnqueueScripts' ] );
		add_action( 'wp_ajax_wrpbSaveUninstallOption', [ $this, 'wrpbSaveUninstallOption' ] );

		// Shortcode + CPT
		add_action( 'init', [ $this, 'onInit' ] );
		add_shortcode( 'wrpb', [ $this, 'onAddShortcode' ] );

		// Admin columns
		add_filter( 'manage_wrpb_posts_columns', [ $this, 'managePostsColumns' ], 10 );
		add_action( 'manage_wrpb_posts_custom_column', [ $this, 'managePostsCustomColumns' ], 10, 2 );

		// Force block editor
		add_filter( 'use_block_editor_for_post', [ $this, 'useBlockEditorForPost' ], 999, 2 );
	}

	/**
	 * Admin Menu
	 * - Dashboard submenu explicitly added
	 * - CPT submenus will be auto-added by WP because show_in_menu points to this parent slug
	 */
	public function adminMenu() {
		$cap  = 'manage_options';
		$slug = 'recent-products-dashboard';

		// Top-level menu (Dashboard page callback)
		add_menu_page(
			__( 'Recent Products- bPlugins', 'recent-products-block' ),
			__( 'Recent Products', 'recent-products-block' ),
			$cap,
			$slug,
			[ $this, 'renderDashboardPage' ],
			'dashicons-screenoptions',
			26
		);

		// Explicit Dashboard submenu (so you see "Dashboard" text)
		add_submenu_page(
			$slug,
			__( 'Help And Demo', 'recent-products-block' ),
			__( 'Dashboard', 'recent-products-block' ),
			$cap,
			$slug,
			[ $this, 'renderDashboardPage' ]
		);

		/**
		 * IMPORTANT:
		 * Do NOT manually add CPT list/add-new submenus here.
		 * WordPress auto-adds them because CPT has show_in_menu => 'recent-products-dashboard'
		 * Otherwise you will see duplicates.
		 */
	}

	/**
	 * Remove the auto duplicate submenu item safely.
	 * WP automatically adds a submenu item that duplicates the parent slug.
	 * We keep our "Dashboard" and remove extras.
	 */
	public function fixDashboardSubmenu() {
		$parent = 'recent-products-dashboard';

		global $submenu;

		if ( empty( $submenu[ $parent ] ) || ! is_array( $submenu[ $parent ] ) ) {
			return;
		}

		$found = 0;
		foreach ( $submenu[ $parent ] as $index => $item ) {
			// $item[2] is menu_slug
			if ( isset( $item[2] ) && $item[2] === $parent ) {
				$found++;
				// Keep the first one, remove the rest
				if ( $found > 1 ) {
					unset( $submenu[ $parent ][ $index ] );
				}
			}
		}

		// Reindex for cleanliness
		$submenu[ $parent ] = array_values( $submenu[ $parent ] );
	}

	public function renderDashboardPage() { ?>
		<div
			id='recent-products-dashboard'
			data-info='<?php echo esc_attr( wp_json_encode( [
				'version'   => defined( 'RECENT_PRODUCTS_BLOCK_VERSION' ) ? RECENT_PRODUCTS_BLOCK_VERSION : '2.0.0',
				'adminUrl'  => admin_url(),
				'deleteDataOnUninstall' => (bool) get_option( 'wrpbDeleteDataOnUninstall', false ),
				'uninstallNonce' => wp_create_nonce( 'wrpb_save_uninstall_option' ),
			] ) ); ?>'
		></div>
	<?php }

	// Persist the dashboard "delete data on uninstall" toggle.
	// Contract matches bpl-tools/Admin/Settings: reads $_POST['nonce'] and $_POST['enabled'].
	public function wrpbSaveUninstallOption() {
		$nonce = sanitize_text_field( wp_unslash( $_POST['nonce'] ?? '' ) );

		if ( ! wp_verify_nonce( $nonce, 'wrpb_save_uninstall_option' ) ) {
			wp_send_json_error( [ 'message' => __( 'Invalid security token.', 'recent-products-block' ) ], 403 );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( [ 'message' => __( 'You do not have permission to perform this action.', 'recent-products-block' ) ], 403 );
		}

		$raw_enabled = isset( $_POST['enabled'] ) ? sanitize_text_field( wp_unslash( $_POST['enabled'] ) ) : '';
		$enabled     = ( 'true' === $raw_enabled || '1' === $raw_enabled );

		update_option( 'wrpbDeleteDataOnUninstall', $enabled );

		wp_send_json_success( [
			'enabled' => $enabled,
			'message' => $enabled
				? __( 'Data deletion enabled.', 'recent-products-block' )
				: __( 'Data will be preserved on uninstall.', 'recent-products-block' ),
		] );
	}

	public function onInit() {
		register_post_type( $this->post_type, [
			'labels' => [
				'name'          => __( 'ShortCodes', 'recent-products-block' ),
				'singular_name' => __( 'ShortCode', 'recent-products-block' ),
				'add_new'       => __( 'Add New', 'recent-products-block' ),
				'add_new_item'  => __( 'Add New ShortCode', 'recent-products-block' ),
				'edit_item'     => __( 'Edit ShortCode', 'recent-products-block' ),
				'new_item'      => __( 'New ShortCode', 'recent-products-block' ),
				'view_item'     => __( 'View ShortCode', 'recent-products-block' ),
				'search_items'  => __( 'Search ShortCodes', 'recent-products-block' ),
				'not_found'     => __( 'No ShortCodes found.', 'recent-products-block' ),
			],

			'public'              => false,
			'show_ui'             => true,
			'show_in_rest'        => true,
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'has_archive'         => false,
			'hierarchical'        => false,

			// CPT goes under plugin menu (WP will auto add All + Add New submenus)
			'show_in_menu'        => 'recent-products-dashboard',
			'menu_position'       => 14,

			'capability_type'     => 'page',
			'supports'            => [ 'title', 'editor' ],
			'template'            => [ [ 'wrp/recent-products' ] ],
			'template_lock'       => 'all',
		] );
	}

	public function onAddShortcode( $atts ) {
		$atts = shortcode_atts( [ 'id' => 0 ], $atts, 'wrpb' );

		$post_id = absint( $atts['id'] );
		if ( ! $post_id ) {
			return '';
		}

		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== $this->post_type ) {
			return '';
		}

		if ( post_password_required( $post ) ) {
			return get_the_password_form( $post );
		}

		$status = get_post_status( $post );

		if ( 'publish' === $status ) {
			return $this->displayContent( $post );
		}

		if ( 'private' === $status ) {
			return current_user_can( 'read_post', $post_id ) ? $this->displayContent( $post ) : '';
		}

		if ( in_array( $status, [ 'draft', 'pending', 'future' ], true ) ) {
			return current_user_can( 'edit_post', $post_id ) ? $this->displayContent( $post ) : '';
		}

		return '';
	}

	private function displayContent( $post ) {
		if ( empty( $post->post_content ) ) {
			return '';
		}

		$old_post        = $GLOBALS['post'] ?? null;
		$GLOBALS['post'] = $post;
		setup_postdata( $post );

		// Proper render: blocks + WP content pipeline
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core WordPress hook.
		$content = apply_filters( 'the_content', $post->post_content );

		wp_reset_postdata();
		$GLOBALS['post'] = $old_post;

		return $content;
	}

	public function managePostsColumns( $defaults ) {
		unset( $defaults['date'] );
		$defaults['shortcode'] = __( 'ShortCode', 'recent-products-block' );
		$defaults['date']      = __( 'Date', 'recent-products-block' );
		return $defaults;
	}

	public function managePostsCustomColumns( $column_name, $post_ID ) {
		if ( 'shortcode' === $column_name ) {
			$sc = sprintf( '[wrpb id="%d"]', (int) $post_ID );

			?>
			<div class="bPlAdminShortcode" id="bPlAdminShortcode-<?php echo esc_attr( $post_ID ); ?>">
				<input readonly value="<?php echo esc_attr( $sc ); ?>" onclick="wrpbCopyShortcode('<?php echo esc_attr( $post_ID ); ?>')">
				<span class="tooltip"><?php echo esc_html__( 'Copy To Clipboard', 'recent-products-block' ); ?></span>
			</div>
			<?php
		}
	}

	public function useBlockEditorForPost( $use, $post ) {
		if ( is_object( $post ) && isset( $post->post_type ) && $this->post_type === $post->post_type ) {
			return true;
		}
		return $use;
	}

	public function adminEnqueueScripts( $hook ) {
		// Dashboard page assets
		if ( false !== strpos( $hook, 'recent-products-dashboard' ) ) {
			wp_enqueue_style( 'wrpb-admin-dashboard', RECENT_PRODUCTS_BLOCK_DIR_URL . 'build/admin-dashboard.css', [], RECENT_PRODUCTS_BLOCK_VERSION );
			wp_enqueue_script( 'wrpb-admin-dashboard', RECENT_PRODUCTS_BLOCK_DIR_URL . 'build/admin-dashboard.js', [ 'react', 'react-dom','wp-util' ], RECENT_PRODUCTS_BLOCK_VERSION, true );
			wp_set_script_translations( 'wrpb-admin-dashboard', 'recent-products-block', RECENT_PRODUCTS_BLOCK_DIR_PATH . 'languages' );
		}

		// Shortcode CPT list/editor screen assets (optional)
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( ! $screen || $screen->post_type !== $this->post_type ) {
			return;
		}

		if ( in_array( $hook, [ 'edit.php', 'post.php', 'post-new.php' ], true ) ) {
			wp_enqueue_style( 'wrpb-admin-post', RECENT_PRODUCTS_BLOCK_DIR_URL . 'build/admin-post.css', [], RECENT_PRODUCTS_BLOCK_VERSION );
			wp_enqueue_script( 'wrpb-admin-post', RECENT_PRODUCTS_BLOCK_DIR_URL . 'build/admin-post.js', [], RECENT_PRODUCTS_BLOCK_VERSION, true );
			wp_set_script_translations( 'wrpb-admin-post', 'recent-products-block', RECENT_PRODUCTS_BLOCK_DIR_PATH . 'languages' );
		}
	}
}

new Recent_Products_Block_Admin();
