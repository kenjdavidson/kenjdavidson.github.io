import Typography from 'typography';
import kirkhamTheme from 'typography-theme-kirkham';

let theme = {
  ...kirkhamTheme,
  googleFonts: [
    {
      name: 'Playfair Display',
      styles: ['400', '500', '700', '900']
    },
    {
      name: 'Merriweather',
      styles: ['300', '300i', '600', '600i']
    },
    {
      name: 'Mrs Saint Delafield',
      styles: ['400']
    }
  ],
  scriptFontFamily: ['Mrs Saint Delafield', 'cursive'],
  headerFontFamily: ['Playfair Display', 'serif'],
  headerWeight: 700,  
  headerColor: 'var(--base07)',
  bodyFontFamily: ['Merriweather', 'serif'],
  bodyWeight: 400,
  bodyColor: 'var(--base06)',
  baseFontSize: '14px'
};

theme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    position: 'relative',
    color: 'var(--base07)',  
    'text-decoration': 'none',
    'background-image': 'linear-gradient(to bottom, rgba(var(--base08-rgb-r),var(--base08-rgb-g),var(--base08-rgb-b),0.33) 50%, transparent 50%)',
    'background-position': '0 0.75rem',
    'background-repeat': 'repeat-x',
    'background-size': '1rem 2rem',
  },

  'span.site-branding': {
    fontFamily: options.scriptFontFamily.join(','),
    fontSize: '3em',
  },
});

const typography = new Typography(theme);
export const { scale, rhythm, options } = typography;
export default typography;
