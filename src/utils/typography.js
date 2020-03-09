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
      styles: ['300', '300i', '700', '900']
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
  boldWeight: 900,
  baseFontSize: '14px'
};

theme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    position: 'relative',
    color: 'var(--base07)',  
    'font-weight': '700',
    'text-decoration': 'none',
    'background-image': 'linear-gradient(to bottom, rgba(var(--base0A-rgb-r),var(--base0A-rgb-g),var(--base0A-rgb-b),0.75) 100%, transparent 0%)',
    'background-position': '0 1em',
    'background-repeat': 'repeat-x',
    'background-size': '1rem 2rem',
  },

  'a h*': {    
    'background-position': '0 1rem',
  },


  'span.site-branding': {
    fontFamily: options.scriptFontFamily.join(','),
    fontSize: '3em',
  },
});

const typography = new Typography(theme);
export const { scale, rhythm, options } = typography;
export default typography;
