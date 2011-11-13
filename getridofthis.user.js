// ==UserScript==
// @name getridofthis
// @description Removal of not need elements userscript
// @author arublev
// @license MIT
// @version 1.0
// ==/UserScript==

// wrap the script in a closure (opera, ie)
// do not spoil the global scope
// The script can be transformed into a bookmarklet easily :)
(function(window, undefined ) {

    // normalized window
    var w;
    if (unsafeWindow != "undefined"){
        w = unsafeWindow 
    } else {
        w = window; 
    }

    // You can inject almost any javascript library here.
    // Just pass the w as the window reference,
        // e.g. jquery.min.js embedding:
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);


    // do not run in frames
    /*if (w.self != w.top){
        return;
    }*/
    
    function removeNode(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    
    function qsmap(qs, func, ctx) {
        var results = document.querySelectorAll(qs);
        
        if (results) {
            for (var i = 0, len = results.length; i < len; i++) {
                func.call(ctx, results[i]);
            }
        }
    }
    
    function removeNodes(qs) {
        return qsmap(qs, removeNode);
    }

    // additional url check. 
    // Google Chrome do not treat @match as intended sometimes.
    if (/minecraftwiki.net/.test(w.location.href)) {
        removeNodes('.atflb');
        removeNodes('.btflb');
    }
    
    if (/grooveshark.com/.test(w.location.href)) {
        removeNodes('.flash');
    }
    
    removeNodes('[id^=google_ads]');
    
    console.info('cleared')
})(window);