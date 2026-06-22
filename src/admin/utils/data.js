
import logo from "../../../assets/logo.png"
import thumbnail from "../../../assets/thumbnail.png"


const slug = 'recent-products-block';

export const dashboardInfo = (info) => {
  const { version, adminUrl, deleteDataOnUninstall, uninstallNonce } = info;



  return {
    name: `Recent Products Block`,
    displayName: `Recent Products Block for WooCommerce – Display Latest WooCommerce Products.`,
    description:
      "Recent Products Block for WooCommerce is a block plugin by which you can showcase your WooCommerce Recently added product in block Widgets, or anywhere in the block editor area.",
    slug,
    version,
    adminUrl,
    deleteDataOnUninstall,
    uninstallNonce,
    displayOurPlugins: true,
    media: {
      logo: `${logo}`,
      // banner: ``,
      thumbnail: `${thumbnail}`
    },
    pages: {

    },
  };
}

export const welcomeInfo = (adminUrl = "") => ({
  // Hero card keyword chips
  keywords: ["WooCommerce", "Shortcode", "2+ Templates"],
  keywordsLabel: "Features",

  // Getting Started tabbed steps
  gettingStarted: {
    tabs: [
      {
        key: "gutenberg",
        label: "Gutenberg",
        steps: [
          {
            num: 1,
            title: "Add the Block",
            body: "Open the block editor. Click <strong>+</strong> or type <strong>/Recent Products</strong>.",
            link: { url: `${adminUrl}post-new.php`, label: "Open Editor" },
          },
          {
            num: 2,
            title: "Configure Products",
            body: "Set how many recent WooCommerce products to display and pick a layout.",
          },
          {
            num: 3,
            title: "Style the Cards",
            body: "Customize image, price, rating, colors, typography, and spacing.",
          },
          {
            num: 4,
            title: "Publish",
            body: "Preview your product grid and publish when ready.",
          },
        ],
      },
      {
        key: "shortcode",
        label: "Shortcode",
        steps: [
          {
            num: 1,
            title: "Create a ShortCode",
            body: "Go to <strong>Recent Products</strong> in your admin menu and click <strong>Add New</strong>.",
            link: { url: `${adminUrl}post-new.php?post_type=wrpb`, label: "Add New" },
          },
          {
            num: 2,
            title: "Build & Publish",
            body: "Configure the product grid and <strong>Publish</strong> the post.",
          },
          {
            num: 3,
            title: "Copy the Shortcode",
            body: "Go to <strong>Recent Products -> ShortCodes</strong> to find and copy the shortcode (e.g. <code>[wrpb id=\"123\"]</code>).",
            link: { url: `${adminUrl}edit.php?post_type=wrpb`, label: "All ShortCodes" },
          },
          {
            num: 4,
            title: "Paste & Display",
            body: "Paste the shortcode into any post, page, widget, or page builder layout.",
          },
        ],
      },
      {
        key: "elementor",
        label: "Elementor",
        steps: [
          {
            num: 1,
            title: "Create a ShortCode",
            body: "Go to <strong>Recent Products -> Add New</strong> to build and publish a product grid, then copy its shortcode.",
            link: { url: `${adminUrl}post-new.php?post_type=wrpb`, label: "Add New" },
          },
          {
            num: 2,
            title: "Edit with Elementor",
            body: "Open any post or page in the <strong>Elementor</strong> editor.",
          },
          {
            num: 3,
            title: "Add Shortcode Widget",
            body: "Search for the <strong>Shortcode</strong> widget in the Elementor elements panel and drag it into your layout.",
          },
          {
            num: 4,
            title: "Paste Shortcode",
            body: "Paste your shortcode (e.g., <code>[wrpb id=\"123\"]</code>) into the widget input field and save your changes.",
          },
        ],
      },
      {
        key: "php",
        label: "PHP",
        steps: [
          {
            num: 1,
            title: "Get the ID",
            body: "Go to <strong>Recent Products -> ShortCodes</strong> and note the <strong>ID</strong> of the grid you want to embed.",
            link: { url: `${adminUrl}edit.php?post_type=wrpb`, label: "All ShortCodes" },
          },
          {
            num: 2,
            title: "Copy PHP Function",
            body: "Copy the WordPress <code>do_shortcode</code> function: <pre><code>&lt;?php echo do_shortcode('[wrpb id=\"YOUR_ID\"]'); ?&gt;</code></pre>",
          },
          {
            num: 3,
            title: "Insert in Template",
            body: "Open your theme or template files (e.g., <code>single.php</code>, <code>page.php</code>) in an editor.",
          },
          {
            num: 4,
            title: "Replace ID & Save",
            body: "Paste the code into your PHP file and replace <code>YOUR_ID</code> with the actual ID of your product grid.",
          },
        ],
      },
    ],
  },

  // Changelogs — each list item starts with <strong>Type:</strong> for badges
  changelogs: [
    {
      version: '2.0.3 –- 02 June, 2026',
      type: "update",
      list: [
        "<strong>Update:</strong> Updated plugin guideline compliance issues.",
        "<strong>Improve:</strong> Improved readme structure and formatting.",
      ]
    },
    {
      version: '2.0.2 –- 22 May, 2026',
      type: "fix",
      list: [
        "<strong>Fix:</strong> Fixed plugin guideline compliance issues.",
        "<strong>Improve:</strong> Improved readme structure and formatting.",
        "<strong>Fix:</strong> Minor improvements and fixes.",
      ]
    },
    {
      version: '2.0.0 –- 17 Feb, 2026',
      type: "new",
      list: [
        "<strong>New:</strong> Universal Shortcodes — compatible with all page builders.",
        "<strong>New:</strong> 2+ Ready-to-Use Product Templates.",
        "<strong>Update:</strong> Admin Dashboard updated.",
      ]
    }
  ],
  changelogsLimit: 6,
  changelogsReadMoreLabel: "View More Changelogs",

  proFeatures: [
    "Free + Pro Features: The Pro version includes everything that’s available in the free version.",
    "Universal Shortcodes: Compatible with all page builders.",
    "Templates: Includes 2+ ready-to-use templates.",
    "Element Visibility Control: Show or hide any product element as needed.",
    "Price & Discount Control: Manage product prices and discount tags easily.",
    "Color & Typography Settings: Customize colors and typography for all elements.",
    "Product Card Styling: Control background, padding, and shadow options.",
    "Image Customization: Adjust image width, height, and object-fit settings.",
    "Section Styling: Customize section padding, margin, and background.",
    "Review Count Display: Show review counts with styling options.",
    "Average Rating Display: Control rating colors and typography.",
    "Responsive Design: Fully responsive and mobile-friendly layout.",
    "Beginner-Friendly: Easy to use and simple to customize.",
  ],
});

export const demoInfo = {

  demos: [


    {
      title: 'Default',
      type: 'iframe',
      url: 'https://bblockswp.com/demo/default-recent-products/'
    },
    {
      title: 'Theme-1',
      type: 'iframe',
      url: 'https://bblockswp.com/demo/theme-1-recent-products/'
    },
    {
      title: 'Theme-2',
      type: 'iframe',
      url: 'https://bblockswp.com/demo/theme-2-recent-products/'
    }



  ]
}

export const pricingInfo = {
  logo: `${logo}`,
  pluginId: 23056,
  planId: 38798,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜",
  },
  featured: {
    selected: 3,
  },
};