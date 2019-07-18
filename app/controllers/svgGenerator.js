const svgRenderer = require('../public/scripts/svg_renderer').default;

exports.getPlayerSVG = function(req, res) {
    if(req.body.data){
        const svg = svgRenderer(req.body.data);
        res.send(svg);
    }else{
        res.send(null);
    }
}