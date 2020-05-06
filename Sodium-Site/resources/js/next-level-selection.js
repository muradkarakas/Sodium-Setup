
function initControlBlocks() {
	updatesDropdownOptions();
	_EnableControlblockInteraction();
}

function updatesDropdownOptions() {
	var cbs = $("controlblock");
	$.each(cbs, function(idx, controlBlockElement) {
			updatesDropdownOptionsWithoutLookups("controlblock", $(controlBlockElement).attr("control-block-name"));
			updatesDropdownOptionsWithLookups("controlblock", $(controlBlockElement).attr("control-block-name"));
		}
	);	
}

function updatesDropdownOptionsWithLookups(blockTypeName, blockName) {
	var selects;
	
	if (blockTypeName == "datablock") {
	    selects = $(blockTypeName + "[data-block-name=" + blockName + "] select[datalist-name][lookup-input-name]");
	} else {
	    selects = $(blockTypeName + "[control-block-name=" + blockName + "] select[datalist-name][lookup-input-name]");
	}
	$.each(selects, function(idx,selectInstance) {
		updatesDropdownOptionsWithLookup(blockTypeName, selectInstance);
	});	
}

function updatesDropdownOptionsWithLookup(blockTypeName, selectInstance) {
	var containerElement;
	var masterDropdownElement;
	var masterDropdownElementBlockName;
	
	if (blockTypeName == "datablock") {
		containerElement = getRecordRowElement($(selectInstance));
	} else {
		// looking for "lookup item block name" is provided or not
	    masterDropdownElementBlockName = $(selectInstance).attr("lookup-input-block-name");
		
		if (masterDropdownElementBlockName == undefined || masterDropdownElementBlockName.length == 0) {
			// if block name is empty, we are getting the current control block as container
			containerElement = $(selectInstance).closest("controlblock");
		} else {
			// "lookup item block name" is provided. 
			
			// lets find out it is a control block or data block
			var blockInstance = $("controlblock[control-block-name=" + masterDropdownElementBlockName + "]");
			if (blockInstance.length > 0) {
				// it is a control block
				containerElement = blockInstance;
			} else {
				blockInstance = $("datablock[data-block-name=" + masterDropdownElementBlockName + "]")
				if (blockInstance.length > 0) {
					// it is a data block
					containerElement = blockInstance;
				}
			}	
		}
	}
	
	var datalistName = $(selectInstance).attr("datalist-name");
	var datalistInstance = $("datalist[id=" + datalistName + "]");
	if (datalistInstance.length == 0) {
		$.notify("CLIENT: '" + datalistName + "' not defined.", "error");
		return;
	} 
	
	masterDropdownElement = $(containerElement).find("select[name=" + $(selectInstance).attr("lookup-input-name") + "]");
	
	if (masterDropdownElement != undefined && masterDropdownElement.length > 0) {
		var datalistOptionCustomColumnName  = $(masterDropdownElement).attr("column-name");
		if (datalistOptionCustomColumnName == undefined || datalistOptionCustomColumnName == null || datalistOptionCustomColumnName == "") {
			datalistOptionCustomColumnName  = $(masterDropdownElement).attr("name");
		}
		
		var datalistOptionCustomColumnValue = $(masterDropdownElement).val();
			
		var options = $("datalist[id=" + datalistName + "] option[" + datalistOptionCustomColumnName + "=" + datalistOptionCustomColumnValue + "]").clone();
		$(selectInstance).empty();
		$(selectInstance).append(options);
		$(selectInstance).val($(selectInstance).attr("value"));
	} else {
	    alert('Lookup item not found. Please check "lookup-input-block-name" and "lookup-input-name" attributes');
	}
}


/**
 * 
 * @param blockTypeName		"datablock" or "controlblock"
 * @param dataBlockname
 */
function updatesDropdownOptionsWithoutLookups(blockTypeName, blockName) {

	var selects;
	
	if (blockTypeName == "datablock") {
	    selects = $(blockTypeName + "[data-block-name=" + blockName + "] select[datalist-name]").not("[lookup-input-name]");
	} else {
	    selects = $(blockTypeName + "[control-block-name=" + blockName + "] select[datalist-name]").not("[lookup-input-name]");
	}
	
	$.each(selects, function(idx,selectInstance) {
		updatesDropdownOptionsWithoutLookupElement(selectInstance);
	});	
}

function updatesDropdownOptionsWithoutLookupElement(selectInstance) {
	var datalistName = $(selectInstance).attr("datalist-name");
	var datalistInstance = $("datalist[id=" + datalistName + "]");
	if (datalistInstance.length == 0) {
		$.notify("CLIENT: '" + datalistName + "' isimli <datalist> tanımlı değil.", "error");
		return;
	}
	var options = $("datalist[id=" + datalistName + "]").html();
	$(selectInstance).html(options);
	$(selectInstance).val($(selectInstance).attr("value"));
}

function getRecordRowElement(newtr) {
	var a;
	
	if ($(newtr).closest("tfoot").length > 0 || $(newtr).closest("thead").length > 0) {
		return null;
	}
	
	while( (newtr[0].nodeName == "TR" 
			&& (newtr[0].parentNode && newtr[0].parentNode.nodeName == "TBODY") 
				&& (newtr[0].parentNode.parentNode && newtr[0].parentNode.parentNode.nodeName == "TABLE")
					&& (newtr[0].parentNode.parentNode.parentNode && newtr[0].parentNode.parentNode.parentNode.nodeName == "DATABLOCK")
		 ) == false ) 
	{
		newtr = $(newtr[0].parentNode);
	}
	if (newtr.length == 1) {
		return $(newtr[0]);		
	} else {
		return null;
	}
}


function _EnableControlblockInteraction() {
	_disableControlblockInteraction();
	
	$("controlblock input[type=button]").click(
			function(event) {
				event.preventDefault();
				
				var selection = {
							"selectedDataBlockName" : lastUserInteraction.visitedBlockName,
							"selectedRowId" : lastUserInteraction.rowid,
							"selectedItemName" : this.name,
							"htmlElementFocused" : this
						};					
				sendAJAXRequest(selection);
			}
		);
	
	$("controlblock input").not("[type=button]").change( 
			function (event) {
				htsqlProcedureCallForControlBlockItemModified(this);
				// setting current value as old value
				setOldValueForControlBlock(this, event);
			}
	);
	
	$("controlblock input").not("[type=button]").focus( 
			function (event) {
				// setting current value as old value
				if (this.type != "radio") {
					setOldValueForControlBlock(this, event);
				}
			}
	);
	
	$("controlblock select").change( 
			function (event) {			
				updatesDetailDropdownOptions("controlblock", null, this);
				htsqlProcedureCallForControlBlockItemModified(this);
				// setting current value as old value
				setOldValueForControlBlock(this, event);
			}
	);
	
	$("controlblock select").focus( 
			function (event) {			
				// setting current value as old value
				setOldValueForControlBlock(this, event);
			}
	);
}

function setOldValueForControlBlock(itemModified, event) {
	
	switch(itemModified.type) {
		case "password":
		case "text": {
			$(itemModified).attr("old-value", $(itemModified).val());
			break;
		}
		case "select-one": {
			if ($(itemModified).val() != null) {
				$(itemModified).data("old-value", $(itemModified).val());
			} else {
				$(itemModified).data("old-value", "");
			}
			break;
		}
		case "radio": {
			if ($(itemModified).attr("checked-value") != undefined) {
				var block = $(itemModified).closest("datablock");
				if (block.length == 0) {
					block = $(itemModified).closest("controlblock");
				}
				var radios    = $(block).find("input[type=radio][name=" + $(itemModified).attr("name") + "]");
				$(radios).attr("old-value", $(itemModified).attr("checked-value"));
			}
			break;
		}
		case "checkbox": {
			if (itemModified.checked) {
				$(itemModified).attr("old-value", $(itemModified).attr("checked-value"));
			} else {
				$(itemModified).attr("old-value", $(itemModified).attr("unchecked-value"));
			}
			break;
		}
		case "image": {
			break;
		}
		default: {
			alert("Not implemented : " + itemModified.type + " in htsql_selection.js");
			break;
		}
	}
}

function enableDropDownInteractionInEnterQueryMode(selection) {
	// getting the first row of the data block which is in enter query mode
	//var dataBlockInstance = $("datablock[data-block-name=" + selection.selectedDataBlockName + "]");
	
	//updatesDetailDropdownOptions("datablock", messageObject, itemModified);	
}

function updatesDetailDropdownOptions(blockTypeName, messageObject, itemModified) {
	var detailDropdowns;
	if (blockTypeName == "datablock") {
	    detailDropdowns = $("datablock[data-block-name=" + messageObject.dataBlockName + "] select[rowid=\"" + messageObject.rowid + "\"][lookup-input-name=" + $(itemModified).prop("name") + "]");
	} else {
	    detailDropdowns = $("controlblock select[lookup-input-name=" + $(itemModified).prop("name") + "]");
	}
	
	$.each(detailDropdowns, function(idx, selectInstance) {
		updatesDropdownOptionsWithLookup(blockTypeName, selectInstance); 
	});
}

function _disableControlblockInteraction() {
	$("controlblock input[type=button]").unbind("click");
}

function addControlBlocksToTheRequest(formElement) {
	var cbs = $("controlblock");
	$.each(cbs, function(idx, controlBlockElement) {
			addControlBlockItemsToTheRequest(formElement, controlBlockElement);
		}
	);
}

function addControlBlockItemsToTheRequest(formElement, controlBlockElement) {
	var cbname;
	var cbBlockName = $(controlBlockElement).attr("control-block-name"); 
	var cbInputs    = $(controlBlockElement).find("input[type=text], input[type=password], input[type=checkbox], input[type=radio], select");
	
	$.each(cbInputs, function(idx, cbInput) {
		
			cbname = ":" + cbBlockName + "." + cbInput.name;
			// finding another element with the same name and deleting it before inserting. 
			var obj = $(formElement).find("[name=\"" + cbname + "\"]");
			if (obj.length > 0) {
				$(obj).remove();
			}
			switch(cbInput.type) {
				case "radio": {
					var val;
					if ($("input[name=" + $(cbInput).attr("name") + "]:checked").val() == undefined) {
						val = "";
					} else {
						val = $("input[name=" + $(cbInput).attr("name") + "]:checked").val();
					}
					addInputToForm(formElement, "text", cbname, val);
					break;
				}
				case "select-one": 
				case "password":
				case "text": {
					if ($(cbInput).val()) {
						addInputToForm(formElement, "text", cbname, $(cbInput).val());
					} else {
						addInputToForm(formElement, "text", cbname, "");
					}
					break;
				}
				case "checkbox": {
					if ($(cbInput).prop("checked")) {
						addInputToForm(formElement, "text", cbname, $(cbInput).attr("checked-value"));
					} else {
						addInputToForm(formElement, "text", cbname, $(cbInput).attr("unchecked-value"));
					}					
					break;
				}
				default: {
					alert(cbInput.type + " not implemented in switch");
					break;
				}
			}
		}
	
	);
}

function isRowMarked(elementFocused) {
	var tr = getRecordRowElement($(elementFocused));
	if (tr) {
		/*if ($(tr).hasClass("row-applied-ok") && $(tr).hasClass("current-row-selected-tr")) {
			$(tr).removeClass("current-row-selected-tr");
		}*/
		return $(tr).hasClass("current-row-selected-tr");
	} 	
	return false;	
}

function doSelect(elementFocused, event) {
	var tablePart = "tbody";
	
	if ($(elementFocused).closest("tfoot").length > 0) {
		tablePart = "tfoot";
	}
	if ($(elementFocused).closest("thead").length > 0) {
		tablePart = "thead";
	}
	var currentSelection = _getSelection(elementFocused);
	if (tablePart == "tbody") {
		// setting current value as old value
		$(elementFocused).data("old-value", $(elementFocused).val());			
		var isMarked = ! isRowMarked(elementFocused);
		if (isMarked 
			|| currentSelection.selectedDataBlockName != lastSelection.selectedDataBlockName
			|| (elementFocused.type == "button" && event.type == "click")
				) {			
			doMarking(currentSelection, lastSelection);
			_sendRowSelectionRequest(currentSelection);
			
		}
		_setLastSelection(elementFocused);
	} else {
		_sendRowSelectionRequest(currentSelection);
	}
}

function _enableRowSelection(messageObject) {
	
	_disableRowSelection(messageObject.dataBlockName);
	
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] input[type=button]" ).click(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);
				doSelect(this, event);
			}
		);

	if (blockContext[messageObject.dataBlockName] &&
		blockContext[messageObject.dataBlockName].blockStatus == "BLOCK_STATUS_ENTER_QUERY_MODE") {
		return;
	}
	
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] input" ).focus(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);
				if (this.type != "button") {
					doSelect(this, event);
				}
			}
		);
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] select" ).focus(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);
				if (this.type != "button") {					
					doSelect(this, event);
				}
			}
		);
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] textarea" ).focus(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);
				if (this.type != "button") {					
					doSelect(this, event);
				}
			}
		);
	
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] input" ).blur(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);				
			}
		);
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] select" ).blur(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);				
			}
		);
	$( "datablock[data-block-name=" + messageObject.dataBlockName + "] textarea" ).blur(
			function(event) {
				event.preventDefault();
				_setLastUserInteraction(this);				
			}
		);
}

function _setLastUserInteraction(thisObjectInstance) {
	if ($(thisObjectInstance).attr("rowid")) {					
		lastUserInteraction = {
			"rowid" : $(thisObjectInstance).attr("rowid"), 
			"visitedBlockName" : $(thisObjectInstance).closest("datablock").attr("data-block-name"),
			"visitedElement" : thisObjectInstance
		};
	} else if ($(thisObjectInstance).closest("datablock").length > 0) {
		// This is a button in a datablock but not in a tbody
		
	}
}


function removeAllMarks(dataBlockName) {
	
	var $inputs = $("datablock[data-block-name=" + dataBlockName +"] input[type=text]");

	$($inputs).removeClass("current-row-selected-item");
	$($inputs).removeClass("row-modified-item");
	$($inputs).removeClass("item-modified-ok");
	$($inputs).removeClass("fail-row");

	var $trs = $("datablock[data-block-name=" + dataBlockName +"] table tbody tr");	
	$($trs).removeClass("current-row-selected-tr");
	$($trs).removeClass("row-modified-tr");
	$($trs).removeClass("row-applied-ok");
}

function _sendRowSelectionRequest(currentSelection) {
	sendAJAXRequest(currentSelection);
}



function doMarking(currentSelection, lastSelection) {
		
    // if the clicked row item is in the body part, deselect previous and CREATE new one.
	if (currentSelection.selectedRowId != null && currentSelection.selectedRowId != undefined) {
	
		// unhighlight previous row
		if (lastSelection != null && blockContext[currentSelection.selectedDataBlockName]) {
			unMarkRow(lastSelection, "current-row-selected-item");
		}		
		// create a JSON object for selected block row. It will be used as a base object for later function calls
		blockContext[currentSelection.selectedDataBlockName].selectedRowinputs = createJSONObjectForSelectedRow(currentSelection);
		
		// create a new form element object and assign it to the global variable
		// whether or not it is in row or head/foot
		blockContext[currentSelection.selectedDataBlockName].ajaxForm = createFormElementForSelectedRow(currentSelection);

		// mark the current block row.
		markRow(currentSelection, "current-row-selected-item");
	}
	return;
}


function _refreshDatablockContent(messageObject) {
	var $datablock 	= $("datablock[data-block-name=" + messageObject.dataBlockName + "]")[0];
	$($datablock).html(messageObject.tbodyContent);
	blockContext[messageObject.dataBlockName].blockStatus = "BLOCK_STATUS_CLEAR_MODE";
}

function _disableRowSelection(dataBlockName) {
	$("datablock[data-block-name=" + dataBlockName +"] table tbody input").unbind("click"); 
	$("datablock[data-block-name=" + dataBlockName +"] table tbody input").unbind("focus");
	$("datablock[data-block-name=" + dataBlockName +"] table tbody input").unbind("change");
	
	$("datablock[data-block-name=" + dataBlockName +"] table tbody select").unbind("click"); 
	$("datablock[data-block-name=" + dataBlockName +"] table tbody select").unbind("focus");
	$("datablock[data-block-name=" + dataBlockName +"] table tbody select").unbind("change");
}

function _getSelection(htmlElement) {
	var localSelection = {
			"selectedDataBlockName" : "",
			"selectedRowId" 	: "",
			"selectedItemName" 	: "",
			"selection" 		: "",
			"htmlElementFocused": ""
		};
	
	localSelection.htmlElementFocused	= htmlElement; 
	localSelection.selectedDataBlockName= $(htmlElement).closest("datablock").attr("data-block-name");
	localSelection.selectedRowId 		= $(htmlElement).attr("rowid"); 
	localSelection.selectedItemName 	= $(htmlElement).attr("name"); 
	
	return localSelection;
}

function _setLastSelection(htmlElement) {
	lastSelection.htmlElementFocused	= htmlElement; 
	lastSelection.selectedDataBlockName = $(htmlElement).closest("datablock").attr("data-block-name");
	lastSelection.selectedRowId 		= $(htmlElement).attr("rowid"); 
	lastSelection.selectedItemName 		= $(htmlElement).attr("name"); 
}

function _enableItemModify(messageObject) {
	
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] input[type=text]").unbind("change");
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] select").unbind("change");
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] textarea").unbind("change"); 
	
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] input").not("[type=button]").not("[type=file]").change( 
			function (event) {

				var rowid = $(this).attr("rowid");
				if (rowid) {
					htsqlProcedureCallForDatablockItemModified(this);
					// setting current value as old value
					setOldValueForControlBlock(this, event);
				} else {
					alert("Satira ait rowid yok. Yazilimciya hatayi rapor edin.");
				}

				if (!$(this).hasClass("row-modified-item")) {
					$(this).addClass("row-modified-item");
				}
			}
	);	
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] input").not("[type=button]").not("[type=file]").focus( 
			function (event) {
				// setting current value as old value
				if (this.type != "radio") {
					setOldValueForControlBlock(this, event);
				}
			}
	);
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] select").change( 
			function (event) {
				
				var rowid = $(this).attr("rowid");
				if (rowid) {
					htsqlProcedureCallForDatablockItemModified(this);
					// setting current value as old value
					setOldValueForControlBlock(this, event);
				} else {
					alert("Satira ait rowid yok. Yazilimciya hatayi rapor edin.");
				}

				if (!$(this).hasClass("row-modified-item")) {
					$(this).addClass("row-modified-item");
				}
			}
	);
	$("datablock[data-block-name=" + messageObject.dataBlockName + "] textarea").change( 
			function (event) {				
				var rowid = $(this).attr("rowid");
				if (rowid) {
					htsqlProcedureCallForDatablockItemModified(this);
					// setting current value as old value
					setOldValueForControlBlock(this, event);
				} else {
					alert("Satira ait rowid yok. Yazilimciya hatayi rapor edin.");
				}

				if (!$(this).hasClass("row-modified-item")) {
					$(this).addClass("row-modified-item");
				}
			}
	);
	
}

function _EnableDatablockInteraction(messageObject) {
	_enableRowSelection(messageObject);
	_enableItemModify(messageObject);
}

function createJSONObjectForSelectedRow(currentSelection) {
	var input;
	
	if (currentSelection.htmlElementFocused) {
		input = currentSelection.htmlElementFocused;
	} else {
		input = $("datablock[data-block-name=" + currentSelection.selectedDataBlockName + "] input[rowid=\"" + currentSelection.selectedRowId + "\"]")[0];
	}	
	
	/* find the row */
	var $row = $(input).closest("tr");

	/* find the all inputs inside the row */
	var $inputs = $row.find("input");

	var selectedRowinputs = [];
	
	// add all inputs (except buttons (except clicked one) to form element one by one
	$.each( $inputs,
			function () {
		
				if ($($(this).prop("parentNode")).prop("tagName") != "FORM") {
			
					selectedRowinputs.push( {
											 "type": this.type,
											 "name": this.name,
											 "value": this.value,	// value will be incorrect for checkbox use DOM object value property
											 "rowid": $(this).attr("rowid"),
											 "htmlElement": this
											}
								 		);
					}
				
				}
		  );
	
	return selectedRowinputs;
}

function _initDatablockData(messageObject) {	
	blockContext[messageObject.dataBlockName] = { 
		"ajaxForm": {},
		"selectedRowinputs" : []	
	};		
}

function addInputToForm($ajaxForm, type, name, value){
	// delete the input items with the same name
	while($($ajaxForm).find("input[name='" + name + "']").length > 0) {
		var obj = $($ajaxForm).find("input[name='" + name + "']")[0];
		$(obj).remove();
	}
	$($ajaxForm).append('<input type="' + type + '" name="' + name + '" value="' + value + '">');
}

function createFormElementForSelectedRow(currentSelection) {
	
	if (blockContext[currentSelection.selectedDataBlockName].selectedRowinputs) {
		
		var $ajaxForm = createBasicFormElement();
		addInputToForm($ajaxForm, "text", "datablockname", currentSelection.selectedDataBlockName);
		if (currentSelection.selectedRowId != undefined && currentSelection.selectedRowId != "") {
			// all inputs have rowid attribute. we are creating a input element using the rowid.
			addInputToForm($ajaxForm, "text", "rowid", currentSelection.selectedRowId);
		}
		for (var i = 0; i < blockContext[currentSelection.selectedDataBlockName].selectedRowinputs.length; i++) {
			
			switch(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].type) {
				case "button": {									
					break;
				}
				case "checkbox": {
					var value = (blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].htmlElement.checked) ?
							$(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].htmlElement).attr("checked-value") :
							$(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].htmlElement).attr("unchecked-value");
					
					addInputToForm( $ajaxForm,
							"text",
							blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].name,
							value);
					break;
				}
				case "radio": {
					if (blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].value == "on") {
						addInputToForm( $ajaxForm,
								"text",
								$(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].htmlElement).attr("server-current-row-name"),
								$(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].htmlElement).attr("checked-value"));
					}	
				}
				case "password":
				case "hidden":
				case "text": {
					addInputToForm( $ajaxForm,
							blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].type,
							blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].name,
							blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].value);
					break;
				}
				case "image": {
					// Images will not be added to the request
					break;
				}
				case "file": {
					// File will not be added to the request
					break;
				}
				default: {
					alert("Something wrong here: " + blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].type);
					break;
				}
			} 
		}
		
		return $ajaxForm;
	}
}



function createBasicFormElement() {
	var $ajaxForm = $("<form method='post' action='" + window.location.href + "'></form>");
	$ajaxForm.submit(
		function (event) {
		    addControlBlocksToTheRequest(this);
		    writeLog(this);
			event.preventDefault();
			$.ajax(
					{
						type: $ajaxForm.attr('method'),
						url: $ajaxForm.attr('action'),
						dataType: "text",
						cache: false,
					    crossDomain: false,
						contentType: "application/x-www-form-urlencoded; charset=utf-8",
						data: $ajaxForm.serialize()
					}
				  ).done(function(data, status, xhr) {
					  	//alert(xhr.getAllResponseHeaders());
					  	evalAndExecuteResponseData(data);
					}
				  ).fail(function(xhr, status, errorThrown) {
				      $.notify(errorThrown + '\n' + status + '\n' + xhr.statusText, "error");
				      markRow(lastSelection, "fail-row");
					}
				  );
		}
	);
	return $ajaxForm;
}


function markRow(currentSelection, cssClassName) {
	if (currentSelection.selectedDataBlockName && blockContext[currentSelection.selectedDataBlockName]) {
		if (blockContext[currentSelection.selectedDataBlockName].selectedRowinputs) {
			for (var i = 0; i < blockContext[currentSelection.selectedDataBlockName].selectedRowinputs.length; i++) {
				if (blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].type != "button") {
					$(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[i].htmlElement).addClass(cssClassName);
				}
			}
		}
	}
}

function unMarkRow(selection, cssClassName) {
	if (selection.selectedDataBlockName == "" || selection.selectedDataBlockName == null || selection.selectedDataBlockName == undefined) {
		return;
	}
	
	var inputs = $("datablock[data-block-name=" + selection.selectedDataBlockName + "] input").not("[type=button]");
	$.each(inputs, function(index, value) {
			$(value).removeClass(cssClassName);
		}
	);
}

/**
 * Returns the table part of the intputElement. inputElement should be in a <datablock>.
 * Possible values are thead, tbody, tfoot
 *
 * @param inputElement	JSON Object
 * @returns				returns "other" if not in those
 */
function getDatablockTablePart(inputElement) {
	// Check we are in <datablock> or not
	var $datablock = inputElement.closest("datablock");
	if (!$datablock) {
		return;
	}

	// find out <tfoot>, <tbody> or <thead>
	if ($datablock.find("tbody")[0] == inputElement.closest("tbody")[0]) {
		return "tbody";
	}
	if ($datablock.find("thead")[0] == inputElement.closest("thead")[0]) {
		return "thead";
	}
	if ($datablock.find("tfoot")[0] == inputElement.closest("tfoot")[0]) {
		return "tfoot";
	}
	return "other";
}



function writeLog($ajaxForm) {
    var procedureName;
    
    if (typeof $ajaxForm == "object") {
        procedureName = $($ajaxForm).find("input[type=text][name=htsqlproceduretorun]");
        if (procedureName.length == 0) {
            procedureName = $($ajaxForm).find("input[type=text][name=nativeproceduretorun]");
        }

        if (procedureName.length > 0) {
            console.log("\n|Request Action:\n||      " + $(procedureName).val());
        } else {
            console.log("Something requested !" + $($ajaxForm).input);
        }
    } if (typeof $ajaxForm == "string") {
        console.log("\n|Request Action:\n||      " + $ajaxForm);
    }   
    
}
