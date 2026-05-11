import { gridIcon, masonryIcon, sliderIcon, tickerIcon } from '../../utils/icons';

const slug = 'recent-products-block';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, licenseActiveNonce, nonce } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
    name: `Recent Products Block ${proSuffix}`,
    displayName: `Recent Products Block ${proSuffix} for WooCommerce – Display Latest WooCommerce Products.`,
    description:
      "Recent Products Block for WooCommerce is a block plugin by which you can showcase your WooCommerce Recently added product in block Widgets, or anywhere in the block editor area.",
    slug,
    version,
    isPremium,
    hasPro,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/uploads/2026/01/recent-products-block.png`,
    //   proThumbnail: `https://ps.w.org/recent-products-block/assets/icon-128x128.png?rev=3449576`,
      // video: "https://www.youtube.com/watch?v=milYZrqLJsE",
      // isYoutube: false,
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      // landing: `https://bplugins.com/products/${slug}/`,
      docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: 23056,
      plan_id: 38798,
      public_key: "pk_e4706ce581c33e77292c9ac80d1fe",
    },
    licenseActiveNonce,
    changelogs: [
    //   {
    //     version: "2.0.3",
    //     type: "update",
    //     list: ["Admin Dashboard Updated"],
    //   },
    //   {
    //     version: "2.0.2",
    //     type: "new",
    //     list: ["Black Friday Sale Link Added"],
    //   },
    //   {
    //     version: "2.0.1",
    //     type: "update",
    //     list: ["Update Freemius Lite SDK"],
    //   },
    //   {
    //     version: "2.0.0",
    //     type: "new",
    //     list: [
    //       "5 New Theme Added",
    //       "Blur Effect Parallax",
    //       "Vertical Parallax",
    //       "Particle Parallax",
    //       "Three Image Parallax",
    //       "Row Scroll Parallax",
    //     ],
    //   },
    //   {
    //     version: "1.0.9",
    //     type: "fix",
    //     list: ["Fix Iframe issue"],
    //   },
    //   {
    //     version: "1.0.8",
    //     type: "fix",
    //     list: ["Reduce Dependency"],
    //   },
    //   {
    //     version: "1.0.7",
    //     type: "fix",
    //     list: ["Fix issue"],
    //   },
	{
		version: '2.0.0 –- 17 Feb, 2026 ',
		type: "update",
		list: [
			"Universal Shortcodes: Compatible with all page builders.",
			"2+ Ready-to-Use Product Templates",
			"Admin Dashboard Updated"
		]
	},	
    ],
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
	"Beginner-Friendly: Easy to use and simple to customize."
    ],
//     startButton: {
//       label: "Start Now",
//       url: `wp-admin/post-new.php?post_type=page&title=Parallax Section Block&content=<!-- wp:wrp/recent-products {"cId":"081047a3-f"} -->
// <h1 class="wp-block-wrp-recent-products alignwide">Hello World</h1>
// <!-- /wp:wrp/recent-products -->&nonce=${nonce}`,
//     },
  };
}

export const demoInfo = {
	// allInOneLabel: 'See All Demos',
	// allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
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
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`, // Optional
  pluginId: 23056,
  planId: 38798,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜",
  },
  featured: {
    selected: 3, // choose from licenses item
  },
};