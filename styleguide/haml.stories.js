/* eslint-disable camelcase */
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line
import { withA11y } from '@storybook/addon-a11y'; // eslint-disable-line
import { text } from '@storybook/addon-knobs'; // eslint-disable-line

// The styles
import './styles.scss';

import wrapper from './component-wrapper';

// Haml setup
import hamlProps from './haml_props.json';
import * as haml from '../scripts/haml';
// Import all the templates...
import tFooter from '../haml/_footer.html.haml';
import tHeader from '../haml/_header.html.haml';
import tLogo from '../haml/_logo_clickable.html.haml';
import tSearch from '../haml/_search.html.haml';
import tNoticeBanner from '../haml/_notice_banner.html.haml';
import tBreadcrumb from '../haml/_breadcrumb.html.haml';
import tRadio from '../haml/_radio_group.html.haml';
import tRadioSmall from '../haml/_radio_group_small.html.haml';
import tInput from '../haml/_input.html.haml';
// ...then queue in memory partials that are used by other partials
haml.queueTemplate('logo_clickable', tLogo);
haml.queueTemplate('search', tSearch);

// Haml rendering wrapper for convenience
function renderHamlTemplate(
    templateName,
    template,
    hamlLocation,
    usage,
    optionalProps
) {
    return wrapper(
        templateName,
        haml.render(template, { ...hamlProps, ...optionalProps }),
        `The partial is available in:
<pre><code>haml/_${hamlLocation}.html.haml</code></pre>
${usage || ''}`
    );
}

// Storybook section setup
export default {
    title: '4 HAML Partials',
    decorators: [withKnobs, withA11y],
    parameters: {
        options: {
            showPanel: true
        },
        a11y: {
            // optional selector which element to inspect
            element: '#a11yComponentToTest',
            // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
            config: {},
            // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
            options: {}
        }
    }
};

// The haml components. Thet will be sorted alphabetically so the order here is not important.
export const search = () => renderHamlTemplate('Search', tSearch, 'search');
export const footer = () => renderHamlTemplate('Footer', tFooter, 'footer');
export const header = () => renderHamlTemplate('Header', tHeader, 'header');
export const input = () => renderHamlTemplate('Input', tInput, 'input');
export const radioGroup = () =>
    renderHamlTemplate('Radio Group', tRadio, 'radio_group');
export const radioGroupSmall = () =>
    renderHamlTemplate('Radio Group Small', tRadioSmall, 'radio_group_small');
export const breadcrumb = () =>
    renderHamlTemplate('Breadcrumbs', tBreadcrumb, 'breadcrumb');
export const logo = () =>
    renderHamlTemplate(
        'Logo',
        tLogo,
        'logo_clickable',
        `You can use the <code>cads-logo</code> class on anything to display the logo.
Make sure that an accessible title/etc is available.`
    );
export const noticeBanner = () => {
    const notice_banner_content = text(
        'Banner content',
        'If you’re a Thomas Cook customer and you’re stuck abroad or want to get your money back, get help from the Civil Aviation Authority.'
    );

    return renderHamlTemplate(
        'Notice banner',
        tNoticeBanner,
        'notice_banner',
        null,
        { notice_banner_content }
    );
};
