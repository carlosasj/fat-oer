$('.spectrum').spectrum({
    color: '#3f51b5',
    showPaletteOnly: true,
    showPalette:true,
    hideAfterPaletteSelect:true,
    preferredFormat: "hex",
    flat: true,
    palette: [
        ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3'],
        ['#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39'],
        ['#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#607d8b'],
    ],
});

var colors_map = {
    '#f44336': 'color-red',
    '#e91e63': 'color-pink',
    '#9c27b0': 'color-purple',
    '#673ab7': 'color-deep-purple',
    '#3f51b5': 'color-indigo',
    '#2196f3': 'color-blue',
    '#03a9f4': 'color-light-blue',
    '#00bcd4': 'color-cyan',
    '#009688': 'color-teal',
    '#4caf50': 'color-green',
    '#8bc34a': 'color-light-green',
    '#cddc39': 'color-lime',
    '#ffeb3b': 'color-yellow',
    '#ffc107': 'color-amber',
    '#ff9800': 'color-orange',
    '#ff5722': 'color-deep-orange',
    '#795548': 'color-brown',
    '#607d8b': 'color-blue-grey',
};

function color_to_class(color) {
    return colors_map[color];
}
