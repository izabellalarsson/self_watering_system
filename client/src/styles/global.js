import { createGlobalStyle } from 'styled-components';
import Greta from '../fonts/GretaGrotesk.otf';

const Global = createGlobalStyle`
    @font-face {
        font-family: "GretaGrotesk";
        src: url(${Greta}) format('opentype');
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        background: #acf39d;
        font-family: "GretaGrotesk";
    }


`;

export default Global;
