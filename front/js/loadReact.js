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


function changeBinTo() {
    var company = $('#' + var_organisationTo);

    setBinVal(company.val());

    company.change(function (e) {
        setBinVal(e.target.value);
    });

    function setBinVal(val) {
        if (val == 'ТОО "КаР-Тел"') {
            $('#' + var_BinTo).val('980540000397')
        } else $('#' + var_BinTo).val('061040008672');

    }
}

var wrapperF = (function () {

    var isNewMode = document.location.pathname.indexOf("/NewForm.aspx") > -1;
    var isDisplayMode = document.location.pathname.indexOf("/DispForm.aspx") > -1;
    var isEditMode = document.location.pathname.indexOf("/EditForm.aspx") > -1;

    changeBinTo();

    if (isNewMode) {
        var GuidParent = $('#' + var_ParentID).val().length > 0 ? $('#' + var_ParentID).val() : SP.Guid.newGuid()._m_guidString$p$0;
        $('#' + var_ParentID).val(GuidParent);
    } else {
        GuidParent = $('.parentIDClass input').val();
    }

    /* sending global vars to script */
    window.reactVars = { GuidParent: GuidParent, isDisplayMode: isDisplayMode ? true : false };

    loadScript('/SiteAssets/ActDa1/js/main.js', "text/javascript", function () { });

})();