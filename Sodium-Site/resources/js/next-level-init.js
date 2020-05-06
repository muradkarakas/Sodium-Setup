
var isPageReady = false;

var blockContext = {
	"ajaxForm": "",
	"selectedRowinputs" : [],
	blockStatus : ""
};

/**
 * Holds the row selection information regardless of the action triggering selection event
 */ 
var lastSelection = {
	"selectedDataBlockName" : "",
	"selectedRowId" : "",
	"selectedItemName" : "",
	"htmlElementFocused" : ""
};

/**	
 * 	Holds the block and row access information caused by user interaction keyboard or mouse interaction
 */
var lastUserInteraction = {
	"rowid" : "", 
	"visitedBlockName" : "",
	"visitedElement" : ""		
};


function initPage() {
	initResponse();
};

$(document).ready( 
		function() { 
			$.ajaxSetup({ cache: false });
			//$.notify.defaults( {autoHideDelay: 8500, globalPosition: 'bottom right'} );			
			executeResponse();
			initControlBlocks();
			initTheme();
			initTreeLibrary();
			isPageReady = true;						
		} 
);

/**
 * Sets the theme-selector element's value to the current theme or to url parameter value 
 */
function initTheme() {
	var themeElement = $("controlblock select[name=theme-selector], datablock select[name=theme-selector]");
	if (themeElement) {
		var themeParamValue = getParameterByName('theme');
		if (themeParamValue) {	
			$(themeElement).val(themeParamValue);
		}
		$(themeElement).change(function() {
			debugger
			let matched = window.location.href.match(/theme=([a-zA-Z0-9\_\. .]+)/);
			if (matched && matched.length > 0) {
				let param = 'theme=' + this.value;
				window.location.href = window.location.href.replace(matched[0], param);
				/*window.location.href = window.location.href.replace('theme=' + matched.groups.theme, 'theme=' + this.value);	
				} else {
				if (location.search != '') {
					window.location.href += '&theme=' + this.value;
				} else {
					window.location.href += '?theme=' + this.value;
				}*/
			} else {
				window.location.href = location.protocol + '//' + location.host + location.pathname + '?theme=' + this.value;
			}
			//location.protocol + '//' + location.host + location.pathname + '?theme=' + this.value;
		});
	}
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function redirect (url) {
    var ua        = navigator.userAgent.toLowerCase(),
        isIE      = ua.indexOf('msie') !== -1,
        version   = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else { 
        window.location.href = url; 
    }
}

