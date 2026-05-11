import { registerBlockType, createBlock } from '@wordpress/blocks';

import metadata from '../src/block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';
import './style.scss';
import { productIcon } from './utils/icons';

registerBlockType(metadata, {
    icon: productIcon,

    transforms: {
        from: [
            { type: 'block', blocks: ['wpp/popular-products'], transform: attributes => createBlock('wrp/recent-products', attributes) },
            { type: 'prefix', prefix: 'wpp', transform: () => createBlock('wrp/recent-products') }
        ]
    },

    
    edit: Edit,

    save: () => <h1>Hello World</h1>
    
});
   