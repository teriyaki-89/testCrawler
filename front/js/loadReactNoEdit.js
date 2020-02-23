function loadScript(url, type, callback) {

    var script = document.createElement("script")

    if (script.readyState) {
        //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}



/* добавим стиль, та ккак нинтекс затирает стили */

var reactCSS = 'myCss';
if (!document.getElementById(reactCSS)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = reactCSS;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/SiteAssets/ActDa1/css/style.css';

    link.media = 'all';
    head.appendChild(link);
}


var wrapperF = (function () {

    var GuidParent = $('#' + var_ParentID).val();
    /* sending global vars to script */
    window.reactVars = { GuidParent: GuidParent, isDisplayMode: true };

    loadScript('/SiteAssets/ActDa1/js/main.js', "text/javascript", function () { });

})();