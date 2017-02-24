(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', pageLoad);

    function pageLoad() {
        var span = document.getElementsByClassName('js-is')[0];
        var is = findGetParameter('is');

        span.innerText = is;
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