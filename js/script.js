(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', pageLoad);

    function pageLoad() {
        var is = findGetParameter('is');

        is = is.replace(/\-/g, ' ');
        is = is.replace(/\n/g, ' ');
        is = is.replace(/%20/g, ' ');

        setIs(is);
        setPageTitle(is);
    }

    function setIs(is) {
        var span = document.getElementsByClassName('js-is')[0];
        
        span.innerText = is;
    }

    function setPageTitle(is) {
        document.title = 'Sindre is ' + is;
    }

    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
})();