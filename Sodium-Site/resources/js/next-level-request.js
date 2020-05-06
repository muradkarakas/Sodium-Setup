var dialog;

/**
 * Send AJAX request to the server. 
 * 
 * According to value of "name" and "type" attribute of the html element, either "native" or "htsql" procedure call is made.
 * 
 * @param clickedInput
 * @returns
 */
function sendAJAXRequest(currentSelection) {
     if (! currentSelection.htmlElementFocused) {
    	 alert("Invalid request");
    	 return;
     }
	switch(currentSelection.htmlElementFocused.name) {
		/* CLIENT ACTIONS */
		case "enter-query": {
			enterQuery(currentSelection);
			break;
		} 
		case "cancel-query": {
			nativeProcedureCallSameAsButtonName(currentSelection);
			break;
		} 
		case "execute-query": {
			executeQuery(currentSelection);
			break;
		}
		
		/* SERVER ACTIONS  */
		case "delete-record": {
			sendDeleteRequest(currentSelection);		
			break;
		}
		case "create-record": 
		case "rollback": 
		case "commit": 
		case "next-page": 
		case "prev-page":
		case "last-page":
		case "first-page":
		case "kill-session":
		case "refresh-block": {
			nativeProcedureCallSameAsButtonName(currentSelection);
			break;
		}
		default: { 
			switch(currentSelection.htmlElementFocused.type) {
				case "button": {
					htsqlProcedureCall(currentSelection);
					break;
				}
				case "checkbox":
				case "radio":
				case "select-one":
				case "textarea":
				case "hidden":	
				case "image": 
				case "password":
				case "text": {
					nativeProcedureCallSelectRow(currentSelection);
					break;
				}
				case "file": {
					break;
				}
				default: {
					alert("Invalid request type : " + currentSelection.htmlElementFocused.type);
					break;
				}
			}			
			break;
		}
	};
}

function sendDeleteRequest(currentSelection) {
	if (currentSelection.selectedRowId.indexOf("NEWROW") == -1) {
		// The row has legal row id. That is, it is a row in database.
		
		if (currentSelection.selectedDataBlockName && 
				blockContext[currentSelection.selectedDataBlockName].selectedRowinputs &&
					blockContext[currentSelection.selectedDataBlockName].selectedRowinputs.length > 0) {
			
			var row = getRecordRowElement( $(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[0].htmlElement) );
			var cloneCopy = $(row).clone();
			if (cloneCopy.length == 1) {
				blockContext[currentSelection.selectedDataBlockName].lastDeleteAttemptOnRow = cloneCopy[0];
			} else {
				blockContext[currentSelection.selectedDataBlockName].lastDeleteAttemptOnRow = null;
			}
		}
		nativeProcedureCallSameAsButtonName(currentSelection);
	} else {
		// This is actually not a row in db. So, deletion html table element and selecting the first row is enough at the moment
		if (currentSelection.selectedDataBlockName && 
				blockContext[currentSelection.selectedDataBlockName].selectedRowinputs &&
					blockContext[currentSelection.selectedDataBlockName].selectedRowinputs.length > 0) {
			
			var row = getRecordRowElement( $(blockContext[currentSelection.selectedDataBlockName].selectedRowinputs[0].htmlElement) );
			$(row).remove();
			var messageObject = {
				dataBlockName : currentSelection.selectedDataBlockName	
			};
			var localSelection = _selectDatablockFirstRow(messageObject);
			_sendRowSelectionRequest(localSelection);	
		
		}
	}	
}

function htsqlProcedureCallForControlBlockItemModified(itemModified) {

	var controlBlockName = $(itemModified).closest("controlblock").attr("control-block-name");
	var ajaxForm = createBasicFormElement();
	var procedureName = /*controlBlockName + "." + */ $(itemModified).attr("name");
	
	addInputToForm(ajaxForm, "text", "htsqlproceduretorun", procedureName);
	addInputToForm(ajaxForm, "text", "ignorenotfound", "true");
	addInputToForm(ajaxForm, "text", "controlblockname", controlBlockName);
	addInputToForm(ajaxForm, "text", "blocktype", "c");
	
	switch(itemModified.type) {
		case "text": 
		case "password": {
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			break;
		}
		case "radio": {
			if ($(itemModified).attr("old-value") != undefined) {
				addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			} else {
				addInputToForm(ajaxForm, "text", "old-value", "");
			}
			break;
		}
		case "checkbox": {
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			break;
		}
		case "select-one": {
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).data("old-value"));
			break;
		}
		default: {
			alert("Not implemented : " + itemModified.type + " in htsql_request.js");
			break;
		}
	}
	//console.log("Request Action:\n       procedureName: " + procedureName);
	ajaxForm.submit();
}

function htsqlProcedureCall(selection) {

	if (selection.selectedDataBlockName == undefined || selection.selectedDataBlockName == "") {
		var blk = $(selection.htmlElementFocused).closest("datablock");
		if (blk.length == 0) {
			blk = $(selection.htmlElementFocused).closest("controlblock");
			if (blk.length == 0) {
				alert('No block detected');
			} else {
				// controlblock
				selection.selectedDataBlockName = $(blk).attr("control-block-name");
			} 
		} else {
			// datablock
			selection.selectedDataBlockName = $(blk).attr("data-block-name");
		}	
		blockContext[selection.selectedDataBlockName] = {
			ajaxForm : {}
		};
		blockContext[selection.selectedDataBlockName].ajaxForm = createBasicFormElement();
	}
	
	if (blockContext[selection.selectedDataBlockName] == undefined) {
		
	} else if (blockContext[selection.selectedDataBlockName].ajaxForm[0]) {
		clearPreviousCallTypeSetting(selection);
		addInputToForm(blockContext[selection.selectedDataBlockName].ajaxForm, "text", "htsqlproceduretorun", selection.htmlElementFocused.name);
		var blockType = "n"; // no block type 
		if ($(selection.htmlElementFocused).closest("datablock").length > 0) {
		    blockType = "d"; // datablock
			addInputToForm(blockContext[selection.selectedDataBlockName].ajaxForm, "text", "datablockname", selection.selectedDataBlockName);
		} else if ($(selection.htmlElementFocused).closest("controlblock").length > 0) {
		    blockType = "c"; // controlblock
		    addInputToForm(blockContext[selection.selectedDataBlockName].ajaxForm, "text", "controlblockname", selection.selectedDataBlockName);
		}		
		addInputToForm(blockContext[selection.selectedDataBlockName].ajaxForm, "text", "blocktype", blockType);

		//console.log("Request Action:\n       procedureName: " + selection.selectedDataBlockName);
		blockContext[selection.selectedDataBlockName].ajaxForm.submit();
	} else {
		alert("Bir satir secmelisiniz.");
	};
}



function nativeProcedureCallSameAsButtonName(selection) {
	
	if (selection.selectedDataBlockName && selection.selectedDataBlockName != "") {
		// It is a datablock
		if (blockContext[selection.selectedDataBlockName].ajaxForm[0]) {
			clearPreviousCallTypeSetting(selection);
			addInputToForm(blockContext[selection.selectedDataBlockName].ajaxForm, "text", "nativeproceduretorun", selection.htmlElementFocused.name);
			
			addKillSessionRedirectUrlToTheRequestVariables(selection, blockContext[selection.selectedDataBlockName].ajaxForm);
			
			//console.log("Request Action:\n       procedureName: " + selection.htmlElementFocused.name);
			blockContext[selection.selectedDataBlockName].ajaxForm.submit();
		} else {
			alert("Bir satir secmelisiniz.");
		}
	} else {
		// It is a control block
		var cb = $(selection.htmlElementFocused).closest("controlblock");
		var cbName = $(cb).attr("control-block-name");
		
		blockContext[$(cb).attr("control-block-name")] = {
			"ajaxForm" : {}	
		};
		blockContext[cbName].ajaxForm = createBasicFormElement();
		
		addInputToForm(blockContext[cbName].ajaxForm, "text", "nativeproceduretorun", selection.htmlElementFocused.name);
		addKillSessionRedirectUrlToTheRequestVariables(selection, blockContext[cbName].ajaxForm);		
		
		//console.log("Request Action:\n       procedureName: " + selection.htmlElementFocused.name);
		blockContext[cbName].ajaxForm.submit();
	};
    
}

function addKillSessionRedirectUrlToTheRequestVariables(selection, ajaxForm) {
	if ($(selection.htmlElementFocused).attr("name") == "kill-session") {
		var url = $(selection.htmlElementFocused).attr("redirect-url");
		if (url != undefined && url != "") {
			addInputToForm(ajaxForm, "text", "redirect-url", url);
		}
	}
}

function clearPreviousCallTypeSetting(selection) {
	var other;
	
	other = $(blockContext[selection.selectedDataBlockName].ajaxForm).find("input[type=text][name=nativeproceduretorun]");
	if (other) {
		other.remove();
	}
	other = $(blockContext[selection.selectedDataBlockName].ajaxForm).find("input[type=text][name=htsqlproceduretorun]");
	if (other) {
		other.remove();
	} 
	
	other = $(blockContext[selection.selectedDataBlockName].ajaxForm).find("input[type=text][name=blocktype]");
	if (other) {
		other.remove();
	}
}

function executeQuery(selection) {

	blockContext[selection.selectedDataBlockName].blockStatus = "BLOCK_STATUS_ENTER_QUERY_MODE";
	if (blockContext[selection.selectedDataBlockName].ajaxForm[0]) {
		delete blockContext[selection.selectedDataBlockName].ajaxForm;
	}
	var ajaxForm = createBasicFormElement();
	addInputToForm(ajaxForm, "text", "datablockname", selection.selectedDataBlockName);
	var firstRow = $("datablock[data-block-name=" + selection.selectedDataBlockName + "] table tbody tr")[0];
	
	// Adding <input> tags and their value to the execute-query parameters 
	var inputs   = $(firstRow).find("input").not("[type=button]");
	$.each(inputs, function(index, input) {
		switch(input.type) {
			case "hidden":
			case "password":
			case "text": {
				if (input.value != null && input.value != undefined && input.value != "") {
					addInputToForm(ajaxForm, "text", input.name, input.value);
				}
				break;
			}
			case "checkbox": {
				if ($(input).prop("checked")) {
					addInputToForm(ajaxForm, "text", input.name, $(input).attr("checked-value"));
				}
				break;
			}
			case "radio": {
				if ($(input).prop("checked")) {
					addInputToForm(ajaxForm, "text", $(input).attr("server-current-row-name"), $(input).attr("checked-value"));
				}
				break;
			}
			case "image": {
				// Do nothing for images
				break;
			}
			case "file": {
				// Do nothing for images
				break;
			}
			default: {
				alert("input type is not supported:" + input.type);
				break;
			}
		}
		
	});
	// Adding <select> tags to the execute-query parameters 
	var selects   = $(firstRow).find("select");
	$.each(selects, function(index, select) {
		if (select.value != null && select.value != undefined && select.value != "") {
			addInputToForm(ajaxForm, "text", select.name, select.value);
		}
	});
	
	blockContext[selection.selectedDataBlockName].ajaxForm = ajaxForm;
	nativeProcedureCallSameAsButtonName(selection);	
}


function enterQuery(selection) {
	clearBlockInputs(selection.selectedDataBlockName);
	enableDropDownInteractionInEnterQueryMode(selection);	
}

function clearBlockInputsValue(index, value) {
	
	if ($(value).attr("type") == undefined) {
		if ($(value).prop("tagName") == "TEXTAREA") {
			$(value).attr("rowid", "");
			$(value).val("");
		}
	} else {
				
		switch($(value).attr("type")) {
			case "image": {
				$(value).attr("src", "");
				break;
			}
			case "hidden" : 
			case "password" :
			case "text" : {
				$(value).attr("rowid", "");
				$(value).val("");
				break;
			}
			case "checkbox" : {
				 // checked-value="E" unchecked-value="H" data-type="char"  default-value="E" 
				if ($(value).attr("default-value")) {
					if ($(value).attr("default-value") == $(value).attr("checked-value")) {
						$(value).prop('checked', true);
					} else {
						$(value).prop('checked', false);
					}					
				} else {
					$(value).prop('checked', false);
				}
				break;
			}
			case "radio" : {
				//checked-value="male" default-value="n/a"
				if (($(value).attr("default-value") == undefined || $(value).attr("default-value")=="") && 
					($(value).attr("checked-value") == undefined) || $(value).attr("checked-value") == "") {
					$(value).prop('checked', true);
				} else {
					if ($(value).attr("default-value")) {
						if ($(value).attr("default-value") == $(value).attr("checked-value")) {
							$(value).prop('checked', true);
						} else {
							$(value).prop('checked', false);
						}					
					} else {
						$(value).prop('checked', false);
					}
				}				
				break;
			}
			case "file": {
				/** We should hide "browse" and "submit" buttons. This buttons are automatically added for input type=image elements */
				break;
			}
			default: {
				alert("unknown tag type for clearing input in enter-query mode : " + $(value).attr("type"));
				break;
			}
		}
	
	}
}

function clearBlockInputs(dataBlockName) {
	
	blockContext[dataBlockName].blockStatus = "BLOCK_STATUS_ENTER_QUERY_MODE";
	
	// <input> elements
	var inputs = $("datablock[data-block-name=" + dataBlockName + "] input").not("[type=button]");
	$.each(inputs, function(index, value) {
		clearBlockInputsValue(index, value);		
	});
	
	// <select> elements 
	selects = $("datablock[data-block-name=" + dataBlockName + "] select");
	$.each(selects, function(index, select) {
		$(select).attr("rowid", "");
		$(select).val("");
		// clearing options if select element have lookup dropdown properties.
		if ($(select).attr("lookup-input-name") || $(select).attr("lookup-input-name-2") || $(select).attr("lookup-input-name-3")) {
			$(select).empty();
		}
	});

	// <textarea> elements
	inputs = $("datablock[data-block-name=" + dataBlockName + "] textarea");
	$.each(inputs, function(index, value) {
		clearBlockInputsValue(index, value);		
	});
	
	_disableRowSelection(dataBlockName);
	
	removeAllMarks(dataBlockName);
	
	// recursive call for each detail block
	var dataBlockNames = $("datablock[master-data-block-name=" + dataBlockName + "]"); 
	$.each(dataBlockNames, function(index, value) {
		clearBlockInputs($(value).attr("data-block-name"));
	});
}

function removeAllMarks(dataBlockName) {
	var $inputs;
	
	if (dataBlockName == undefined || dataBlockName == null || dataBlockName == "") {
		$inputs = $("datablock input[type=text]");
	} else {
		$inputs = $("datablock[data-block-name=" + dataBlockName +"] input[type=text]");
	}

	$($inputs).removeClass("current-row-selected-item");
	$($inputs).removeClass("row-modified-item");
	$($inputs).removeClass("item-modified-ok");
	$($inputs).removeClass("fail-row");

	var $trs;
	if (dataBlockName == undefined || dataBlockName == null || dataBlockName == "") {
		$trs = $("datablock table tbody tr");
	} else {
		$trs = $("datablock[data-block-name=" + dataBlockName +"] table tbody tr");
	}
	
	$($trs).removeClass("current-row-selected-tr");
	$($trs).removeClass("row-modified-tr");
	$($trs).removeClass("row-applied-ok");
}

function htsqlProcedureCallForDatablockItemModified(itemModified) {
	var dataBlockName = $(itemModified).closest("datablock");
	var ajaxForm = createBasicFormElement();

	/** Stardart form elements */
	addInputToForm(ajaxForm, "text", "datablockname", $(dataBlockName).attr("data-block-name"));
	addInputToForm(ajaxForm, "text", "rowid", $(itemModified).attr("rowid"));
	addInputToForm(ajaxForm, "text", "nativeproceduretorun", "item-modified");
	
	/** add "name" and "value" property values */
	switch(itemModified.type) {
		case "radio": {
			addInputToForm(ajaxForm, "text", "item-name", $(itemModified).attr("server-current-row-name"));
			addInputToForm(ajaxForm, "text", "new-value", $(itemModified).attr("checked-value"));
			if ($(itemModified).attr("old-value") != undefined) {
				addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			} else {
				// TO DO: we should find the default checked radio and set its "checked-value" property as "old-value"
				addInputToForm(ajaxForm, "text", "old-value", "");
			}
			break;
		}
		case "checkbox": {
			addInputToForm(ajaxForm, "text", "item-name", itemModified.name);
			if (itemModified.checked) {
				addInputToForm(ajaxForm, "text", "new-value", $(itemModified).attr("checked-value"));
			} else {
				addInputToForm(ajaxForm, "text", "new-value", $(itemModified).attr("unchecked-value"));
			}	
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			break;
		}
		case "password":
		case "text": {
			addInputToForm(ajaxForm, "text", "item-name", itemModified.name);
			addInputToForm(ajaxForm, "text", "new-value", itemModified.value);
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			break;
		}
		case "select-one": {
			addInputToForm(ajaxForm, "text", "item-name", itemModified.name);
			addInputToForm(ajaxForm, "text", "new-value", itemModified.value);
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			break;
		}
		case "textarea": {
			addInputToForm(ajaxForm, "text", "item-name", itemModified.name);
			addInputToForm(ajaxForm, "text", "new-value", encodeURIComponent(itemModified.value));
			addInputToForm(ajaxForm, "text", "old-value", $(itemModified).attr("old-value"));
			break;
		}
		default : {
			alert("eksik kod." + itemModified.type + " input tipi icin value alaninin sunumcuya nasil gonderilecegi belirlenmemis. tamamla");
			break;
		}
	}

	//console.log("Request Action:\n       procedureName: " + "item-modified");
	ajaxForm.submit();
}



function nativeProcedureCallSelectRow(currentSelection) {
	if (blockContext[currentSelection.selectedDataBlockName].ajaxForm[0]) {
	    addInputToForm(blockContext[currentSelection.selectedDataBlockName].ajaxForm, "text", "nativeproceduretorun", "select-row");

	    //console.log("Request Action:\n       procedureName: " + "select-row");
		blockContext[currentSelection.selectedDataBlockName].ajaxForm.submit();
	} else {
		alert("Bir satir secmelisiniz.");
	}
}



function nativeProcedureCallForRefreshBlock(blockName) {
	var ajaxForm = createBasicFormElement();
	addInputToForm(ajaxForm, "text", "datablockname", blockName);
	addInputToForm(ajaxForm, "text", "nativeproceduretorun", "refresh-block");

	//console.log("Request Action:\n       procedureName: " + "refresh-block");
	ajaxForm.submit();
}

