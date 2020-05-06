/**
 * \file   htsql_response.js
 *
 * \brief  Handles response from SodiumServer.exe.
 *
 *
 * Action Object Data Structure:
 * -----------------------------
 * >  	"action"		: {
 * >						"serverAction" : 	{
 * >											},
 * >						"clientAction" : 	{
 * >											}
 * >					  }
 *
 *
 * Response Object Data Structure:
 * -------------------------------
 *
 * >  lastResponse {
 * >	"actions" :
 * >				{   "type" 				: "message",
 * >					"messageTitle" 		: "",
* >						"messageText" 		: "",
 * >					"messageType"		: "", // info, success, error
 * >					"action"			: ...see above...
 * >				}
 * >
 * >				{   "type" 				: "error",
 * >					"reasonText" 		: "",
 * >					"possibleSolution" 	: "",
 * >					"action"			: ...see above...
 * >				}
 * >
 * >				{   "type" 				: "showColumn",
 * >					"itemToShow" 		: ""
 * >				}
 * >
 * >				{   "type" 				: "hideColumn",
 * >					"itemToHide" 		: ""
 * >				}
 * >
 * >				{   "type" 				: "disableColumn",
 * >					"itemToDisable"		: ""
 * >				}
 * >
 * >				{   "type" 				: "enableColumn",
 * >					"itemToEnable" 		: ""
 * >				}
 * >
 * >				{   "type" 				: "prompt",
 * >					"label" 			: "",
 * >					"defaultValue"		: ""
 * >				}
 * >
 * >				{   "type" 				: "rollbackSuccessful",
 * >					"connectionName" 	: ""
 * >				}
 * >
 * >				{   "type" 				: "commitSuccessful",
 * >					"connectionName" 	: ""
 * >				}
 * >
 * >				{   "type" 				: "refreshBlockHTSQL",
 * >					"dataBlockName" 	: ""
 * >				}
 * >
 * >				{   "type" 				: "refreshBlockNative",
 * >					"visibility"		: "",
 * >					"dataBlockName" 	: "",
 * >					"tbodyContent"		: ""
 * >				}
 * >
 * >				{   "type" 				: "selectRowSuccessful",
 * >					"dataBlockName" 	: "",
 * >					"rowid"			 	: ""
 * >				}
 * >
 * >
 * >				{   "type" 				: "itemModified",
 * >					"dataBlockName" 	: "",
 * >					"rowid"			 	: "",
 * >					"itemName"			: "",
 * >					"itemValue"			: ""
 * >				}
 * >
 * >
 * >				{   "type" 				: "setDataBlockItemValue",
 * >					"dataBlockName" 	: "",
 * >					"rowid"			 	: "",
 * >					"itemName"			: "",
 * >					"itemValue"			: "",
 * >					"simulateClientModification" : ""	"Y" or "N"
 * >				}
 * >
 * >
 * >				{   "type" 				: "setControlBlockItemValue",
 * >					"itemName"			: "",
 * >					"itemValue"			: "",
 * >				}
 * >
 * >
 * >				{   "type" 				: "replaceRowId",
 * >					"dataBlockName" 	: "",
 * >					"oldrowid"			: "",
 * >					"newrowid"			: ""
 * >				}
 * >
 * >				{   "type" 				: "deleteSuccessful",
 * >					"dataBlockName" 	: "",
 * >					"rowid"				: "",
 * >					"generatedRowid"	: ""
 * >				}
 * >
 * >				{   "type" 				: "deleteRejected",
 * >					"dataBlockName" 	: "",
 * >					"rowid"				: "",
 * >				}
 * >
 * 
 * >				{   "type" 				: "insertSuccessful",
 * >					"dataBlockName" 	: "",
 * >					"rowid"				: ""
 * >				}
 * >
 * >				{   "type" 				: "insertRejected",
 * >					"dataBlockName" 	: "",
 * >					"rowid"				: ""
 * >				}
 * 
 * >				{   "type" 				: "updateSuccessful",
 * >					"dataBlockName" 	: "",
 * >					"rowid"				: ""
 * >				} 
 * >
 * >
 * >				{   "type" 				: "updateRejected",
 * >					"dataBlockName" 	: "",
 * >					"rowid"				: ""
 * >				} 
 * >
 * >
 * >				{   "type" 				: "refreshDataBlockRow",
 * >					"dataBlockName" 	: "",
 * >					"oldrowid"			: "",
 * >					"newrowid"			: "",
 * >					"innerRowHTML"		: ""
 * >				} 
 * >
 * >
 * >				{   "type" 				: "populateDatalist",
 * >					"dataListName" 		: "",
 * >					"dataListOptions"	: "",
 * >					"cascadeOption"		: "Y" or "N"
 * >				} 
 * >
 * >				{   "type" 				: "hideBlock",
 * >					"dataBlockName"		: "",
 * >					"cascade"			: "",
 * >				} 
 * >
 * >				{   "type" 				: "showBlock",
 * >					"dataBlockName"		: "",
 * >					"cascade"			: "",
 * >				} 
 * >
 * >				{   "type" 				: "showPage",
 * >					"pageURL"			: "",
 * >				} 
 * >
 * >				{   "type" 				: "putImageSuccessful",
 * >					"fileName"			: "",
 * >					"fileSize"			: ""
 * >				} 
 * >
 * >				{   "type" 				: "treeNodeExpanded",
 * >					"treename"			: "",
 * >					"nodeid"			: "",
 * >					"json"				: "",
 * >					"callBackFuncion"	: fuction	// It is set in htsql_jstree.js
 * >				} 
 * >
 * >
 * >				{   "type" 				: "treeNodeSelectedSuccessful",
 * >					"treename"			: "",
 * >					"nodeid"			: ""
 * >				} 
 * >	
 * >
 * >				{   "type" 				: "populateTree",
 * >					"treename"			: ""
 * >				} 
 * >
 * >
 * >				{   "type" 				: "refreshTreeNode",
 * >					"treename"			: "",
 * >					"nodeid"			: ""
 * >				},
 * >
 * >				{   "type" 				: "dataBlockAccessRejected",
 * >					"dataBlockName"		: "",
 * >					"clientActionCode" 	: ""
 * >				},
 * > 
 * >	}
 *
 */
var lastResponse = {
	"actions" : []
};


function uploadImageFile(form) {
	var data = new FormData(form); 
	$.ajax(
			 {
			 	type: 	$(form).attr('method'),
				url: 	$(form).attr('action'),
				processData: false,
				contentType: false,
		        data: 	data
	    	}
	 	).done(function (data, status, xhr) {
                    // data must not be evaulated.
		  			evalAndExecuteResponseData(data, false);
	 			}
	 	);
}


/**
 * Executes isapi AJAX response data as java script.
 * If script has java script syntax error, it will be shown in alert message for developer.
 *
 * @param           data to be evaluated and executed
 * @isEvaulated     Is 'data' be evaulated ?
 *                  default value is true (if it is not passed in calling)
 * @returns		    Nothing 
 */
function evalAndExecuteResponseData(data, isEvaulated) {

    try {
        console.log("||\n==>  Response Action:\n       evaulated: " + data.toString().length + " bytes");
        if (isEvaulated == undefined || isEvaulated == true) {
            eval(data);
        }
	} catch (e) {
	    if (e instanceof SyntaxError) {
	        alert('Error occured : ' + e.message);
	        alert('Data which is returned from server: ' + data);
	    } else if (e instanceof TypeError) {
	    	alert("type error in evalAndExecuteResponseData");
	    } else {
	        alert("Client side error occured: Unknown type" + e);
	    }
	};
	
	try {
		executeResponse();
	} catch (e) {
	    if (e instanceof SyntaxError) {
	        alert('Error occured : ' + e.message);
	        alert('Data which is returned from server: ' + data);
	    } else if (e instanceof TypeError) {
	    	alert("type error in evalAndExecuteResponseData");
	    } else {
	        alert("Client side error occured: Unknown type" + e);
	    }
	};
}


function addNewActionToTheResponseActionList(action) {

	switch(action.type) {
		default: {
			lastResponse.actions.push(action);
			break;
		}
	}
	var info = "";
	if (action.dataBlockName != undefined) {
	    info = "(dataBlockname: " + action.dataBlockName + ")";
	}
	console.log("||           added: " + action.type + " " + info);
	
}


function executeResponse() {

	for ( ; lastResponse.actions.length > 0; ) {
		switch(lastResponse.actions[0].type) {
			case "message": {
				actionImplementationMessage(lastResponse.actions[0]);
				break;
			}
			case "error": {
				actionImplementationError(lastResponse.actions[0]);
				break;
			}
			case "showColumn": {
				actionImplementationShowItem(lastResponse.actions[0]);
				break;
			}
			case "hideColumn": {
				actionImplementationHideItem(lastResponse.actions[0]);
				break;
			}
			case "disableColumn": {
				actionImplementationDisableItem(lastResponse.actions[0]);
				break;
			}
			case "enableColumn": {
				actionImplementationEnableItem(lastResponse.actions[0]);
				break;
			}
			case "prompt": {
				actionImplementationPrompt(lastResponse.actions[0]);
				break;
			}
			case "rollbackSuccessful": {
				actionImplementationRollbackSuccessful(lastResponse.actions[0]);
				break;
			}
			case "commitSuccessful": {
				actionImplementationCommitSuccessful(lastResponse.actions[0]);
				break;
			}
			case "refreshBlockHTSQL": {
				actionImplementationRefreshBlockHTSQL(lastResponse.actions[0]);
				break;
			}
			case "refreshBlockNative": {
				actionImplementationRefreshBlockNative(lastResponse.actions[0]);
				break;
			}
			case "selectRowSuccessful": {
				actionImplementationSelectRowSuccessfulNative(lastResponse.actions[0]);
				break;
			}
			case "itemModified": {
				actionImplementationItemModifiedNative(lastResponse.actions[0]);
				break;
			}
			case "setDataBlockItemValue": {
				actionImplementationsetDataBlockItemValue(lastResponse.actions[0]);
				break;
			}
			case "setControlBlockItemValue": {
				actionImplementationsetControlBlockItemValue(lastResponse.actions[0]);
				break;
			}			
			case "replaceRowId": {
				actionImplementationReplaceRowId(lastResponse.actions[0]);
				break;
			}			
			case "updateSuccessful": 
			case "insertSuccessful": {
				actionImplementationUpdateInsertSuccessful(lastResponse.actions[0]);
				break;
			}
			case "updateRejected": {
				actionImplementationUpdateRejected(lastResponse.actions[0]);
				break;
			}
			case "refreshDataBlockRow": {
				SodiumNotify({
					type: 'error',
					messageType: 'error',
					text: 'Update/Insert rejected'
				});
				actionImplementationRreshDataBlockRow(lastResponse.actions[0]);
				break;
			}
			case "insertRejected": {
				actionImplementationInsertRejected(lastResponse.actions[0]);
				break;
			}
			case "deleteSuccessful": {
				actionImplementationDeleteSuccessful(lastResponse.actions[0]);
				break;
			}
			case "deleteRejected": {
				SodiumNotify({
					messageType: 'error',
					text: 'Delete rejected.'
				});
				actionImplementationDeleteRejected(lastResponse.actions[0]);
				break;
			}			
			case "populateDatalist": {
				actionImplementationPopulateDatalist(lastResponse.actions[0]);
				break;
			}
			case "hideBlock": {
				actionImplementationHideBlock(lastResponse.actions[0]);
				break;
			}
			case "showBlock": {
				actionImplementationShowBlock(lastResponse.actions[0]);
				break;
			}
			case "showPage": {
				actionImplementationShowPage(lastResponse.actions[0]);
				break;
			}
			case "putImageSuccessful": {
				actionImplementationPutImageSuccessful(lastResponse.actions[0]);
				break;
			}			
			case "treeNodeExpanded": {
				actionImplementationTreeNodeExpanded(lastResponse.actions[0]);
				break;
			}	
		    case "treeNodeSelectedSuccessful": {
		        actionImplementationTreeNodeSelectedSuccessful(lastResponse.actions[0]);
				break;
			}	
			case "populateTree": {
				// Inits tree
				actionImplementationPopulateTree(lastResponse.actions[0]);
				break;
			}
			case "addTreeNode": {
				actionImplementationAddTreeNode(lastResponse.actions[0]);
				break;
			}
			case "refreshTreeNode": {
				actionImplementationRefreshTreeNode(lastResponse.actions[0]);
				break;
			}
			case "dataBlockAccessRejected": {
				actionImplementationDatablockAccessRejected(lastResponse.actions[0]);
				break;
			}
			default: {
				alert("Unknown response type: " + lastResponse.actions[0].type);
			}
		}
		if (lastResponse.actions[0] && lastResponse.actions[0].type) {
		    console.log("||           consumed: " + lastResponse.actions[0].type);
		    lastResponse.actions.shift();
		}		
	}
}


function actionImplementationRefreshBlockNative(messageObject) {
	
	if (messageObject.visibility == "false") {
	//	actionImplementationHideBlock(messageObject);
	}
	
	_initDatablockData(messageObject);
	_refreshDatablockContent(messageObject);
	_EnableDatablockInteraction(messageObject);
	
	updatesDropdownOptionsInDataBlock(messageObject.dataBlockName);
	
	var localSelection = _selectDatablockFirstRow(messageObject);
	
	/** It is possible that the block whose content refreshed may be hidden. So, we show it */
	if (messageObject.visibility == "true") {
	//	actionImplementationShowBlock(messageObject);
	} 
	if (localSelection != undefined) {
	    _sendRowSelectionRequest(localSelection);
	}	
}

function actionImplementationHideBlock(messageObject) {
	var block = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	if (block.length == 1) {
		_actionImplementationHideBlock(block); 
	} else {
		alert("CLIENT: Block bulunamadi : " + messageObject.dataBlockName);
	}
}

function _actionImplementationHideBlock(block) {
	var blockDisplayMode = $(block).attr("show-hide-mode");
	if (blockDisplayMode == undefined || blockDisplayMode == "visibility") {
		$(block).css('visibility','hidden');
	} else if (blockDisplayMode == "display") {
		$(block).css('display','none');
	}
	
	var detailBlocks = $("datablock[master-data-block-name=" + $(block).attr("data-block-name") + "]");
	$.each(detailBlocks, function(index, block) {
			_actionImplementationHideBlock( $(block) );
		}
	);
}

function actionImplementationShowBlock(messageObject) {
	var block = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	if (block.length == 1) {
		_actionImplementationShowBlock(block);
	} else {
		alert("CLIENT: Block bulunamadi : " + messageObject.dataBlockName);
	}
}

function _actionImplementationShowBlock(block) {
	var blockDisplayMode = $(block).attr("show-hide-mode");
	if (blockDisplayMode == undefined || blockDisplayMode == "visibility") {
		$(block).css('visibility','visible');
	} else if (blockDisplayMode == "display") {
		$(block).css('display','block');
	}
	
	var detailBlocks = $("datablock[master-data-block-name=" + $(block).attr("data-block-name") + "]");
	$.each(detailBlocks, function(index, block) {
		_actionImplementationShowBlock( $(block) );
		}
	);
}

function actionImplementationDatablockAccessRejected(messageObject) {
	var $datablock 	= $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	if ($datablock.length == 1) {
		$datablock	= $datablock[0];
		$($datablock).html("You do not have to access this data block");
		if (blockContext[messageObject.dataBlockName] == undefined) {
			blockContext[messageObject.dataBlockName] = {
					
			}
		}
		blockContext[messageObject.dataBlockName].blockStatus = "BLOCK_STATUS_CLEAR_MODE";
	}
}



function actionImplementationRefreshTreeNode(messageObject) {
	mkRefreshNode(messageObject.treename, messageObject.nodeid);
}

function actionImplementationAddTreeNode(messageObject) {
	//var treeElement = $("tree[id=" + messageObject.treename + "]");
	if (messageObject.json.length > 0) {
		var jsonObj = $.parseJSON(messageObject.json);
		messageObject.callBackFuncion( jsonObj );
	}
}

function actionImplementationPopulateTree(messageObject) {
	var treeName;
	var blockName;
	
	var pos		= messageObject.treename.indexOf(".") + 1;
	blockName	= messageObject.treename.substr(0, pos-1);
	treeName 	= messageObject.treename.substr(pos);
	
	var treeElement = $("controlblock[control-block-name=" + blockName + "] tree[id=" + treeName + "]");
	if (treeElement.length == 0) {
		treeElement = $("datablock[data-block-name=" + blockName + "] tree[id=" + treeName + "]");
	}
	if (treeElement.length == 0) {
		SodiumNotify({
			messageType: 'error',
			text: 'Tree not found'
		});
		return;
	}
	// adding listener for node expanded 
	$(treeElement).jstree({
		'core' : {
		  'data' : 	function (node, cb) {
		    			mkSendTreeNodeExpandedRequest($(this.element).attr("id"), node.id, cb);
					}
		}
	});
}


function actionImplementationTreeNodeSelectedSuccessful(messageObject) {

}

function actionImplementationTreeNodeExpanded(messageObject) {
	//var treeElement = $("tree[id=" + messageObject.treename + "]");
	if (messageObject.json.length > 0) {
		var jsonObj = $.parseJSON(messageObject.json);
		messageObject.callBackFuncion( jsonObj );
	}
}

function actionImplementationRreshDataBlockRow(messageObject) {
	// finding block element
	var item = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	// finding first input elements with the rowid which its update request is rejected
	item = $(item).find("input[rowid=\"" + messageObject.oldrowid + "\"], select[rowid=\"" + messageObject.oldrowid + "\"], textarea[rowid=\"" + messageObject.oldrowid + "\"]");
	if (item.length > 0) {
		// found at least one input element having row id rejected.
		// getting "tbody"'s row element
		var row = getRecordRowElement( $(item) );
		// replacing row content with original row content which is reproduced from database.
		$(row).replaceWith(messageObject.innerRowHTML);
		// applying interaction event triggers to the row input elements.
		_EnableDatablockInteraction(messageObject);
		// Filling drop down list (option tags of the select elements)
		updateRefreshedRowDropdownLists(messageObject);
	}
}

function updateRefreshedRowDropdownLists(messageObject) {
	// finding block element
	var item = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	
	// finding only select elements with the rowid which its options are lost
	// Step.1: selects without lookup
	var selects = $(item).find("select[rowid=\"" + messageObject.newrowid + "\"]").not("[lookup-input-name]");
	$.each(selects, function(idx,selectInstance) {
		updatesDropdownOptionsWithoutLookupElement(selectInstance);
	});	
	// Step.2: selects with lookup
	var selects = $(item).find("select[rowid=\"" + messageObject.newrowid + "\"][lookup-input-name]");
	$.each(selects, function(idx,selectInstance) {
		updatesDropdownOptionsWithLookup("datablock", selectInstance);
	});
}


function actionImplementationPutImageSuccessful(messageObject) {
	if (messageObject.fileName) {
		SodiumNotify({
			messageType: 'success',
			text: "File " + messageObject.fileName + " has been uploaded. (Size: " + messageObject.fileSize + " bytes)"
		});
	} else {
		SodiumNotify({
			messageType: 'success',
			text: "Image file was wrote the database"
		});
	}	 
}



function actionImplementationShowPage(messageObject) {
	redirect(messageObject.pageURL);
}




function updatesDropdownOptionsInDataBlock(dataBlockname) {
	updatesDropdownOptionsWithoutLookups("datablock", dataBlockname);
	updatesDropdownOptionsWithLookups("datablock", dataBlockname);	
}

function actionImplementationPopulateDatalist(messageObject) {
	var datalistInstance = $("datalist[id=" + messageObject.dataListName + "]");
	if (datalistInstance.length == 0) {
		SodiumNotify({
			messageType: 'error',
			text: "CLIENT: Datalist is not defined : '" + datalistName + "'"
		});
		return;
	}
	
	$("datalist[id=" + messageObject.dataListName + "]").html(messageObject.dataListOptions);
	/*SodiumNotify({
		messageType: 'success',
		text: "List loaded : '" + messageObject.dataListName + "'. (" + document.getElementById(messageObject.dataListName).options.length + " options)"
	});*/
	if (messageObject.cascadeOption == "Y") {
		propogateDatalistChangesToSelectOptionsWithoutLookup(messageObject);
		propogateDatalistChangesToSelectOptionsWithLookup(messageObject);
	}
}

function propogateDatalistChangesToSelectOptionsWithLookup(messageObject) {

	/** Get select elements in data blocks which needs to be updated since they have a reference to data list which is updated. */
    var selectsInDatablocks = $("datablock select[datalist-name=" + messageObject.dataListName + "][lookup-input-name]");

	/** Get select elements in control blocks which needs to be updated since they have a reference to data list which is updated. */
    var selectsInControlBlocks = $("controlblock select[datalist-name=" + messageObject.dataListName + "] select[datalist-name][lookup-input-name]");

	/** Updating options of the select elements in data blocks */
	$.each(selectsInDatablocks, function(idx, selectInstance) {
		updatesDropdownOptionsWithLookup("datablock", selectInstance);
	});	
	
	/** Updating options of the select elements in control blocks */
	$.each(selectsInControlBlocks, function(idx, selectInstance) {
		updatesDropdownOptionsWithLookup("controlblock", selectInstance);
	});
}

function propogateDatalistChangesToSelectOptionsWithoutLookup(messageObject) {
	/** Get select elements in data blocks which needs to be updated since they have referenced the datalist updated. */
    var selectsInDatablocks = $("datablock select[datalist-name=" + messageObject.dataListName + "]").not("[lookup-input-name]");
	
	/** Get select elements in control blocks which needs to be updated since they have referenced the datalist updated. */
    var selectsInControlBlocks = $("controlblock select[datalist-name=" + messageObject.dataListName + "]").not("[lookup-input-name]");
	
	/** Updating options of the select elements in data blocks */
	$.each(selectsInDatablocks, function(idx,selectInstance) {
		updatesDropdownOptionsWithoutLookupElement(selectInstance);
	});	
	
	/** Updating options of the select elements in control blocks */
	$.each(selectsInControlBlocks, function(idx,selectInstance) {
		updatesDropdownOptionsWithoutLookupElement(selectInstance);
	});	
}

function actionImplementationCommitSuccessful(messageObject) {
	removeAllMarks();
	SodiumNotify({
		messageType: 'success',
		text: "Commited ('" + messageObject.connectionName + "')"
	});
}

function actionImplementationRollbackSuccessful(messageObject) {
	removeAllMarks();
	SodiumNotify({
		messageType: 'success',
		text: "Rolled back ('" + messageObject.connectionName + "')"
	});
}



function actionImplementationUpdateInsertSuccessful(messageObject) {
	var item = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	item = $(item).find("input[rowid=\"" + messageObject.rowid + "\"], select[rowid=\"" + messageObject.rowid + "\"], textarea[rowid=\"" + messageObject.rowid + "\"]");
	if (item.length > 0) {
		item = getRecordRowElement(item);
		$(item).addClass("row-applied-ok");
		SodiumNotify({
			messageType: 'success',
			text: "Applied"
		});
	}
}

function actionImplementationReplaceRowId(messageObject) {
	var item = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
	item = $(item).find("input[rowid=\"" + messageObject.oldrowid + "\"], select[rowid=\"" + messageObject.oldrowid + "\"], textarea[rowid=\"" + messageObject.oldrowid + "\"]");
	if (item.length > 0) {
		$(item).attr("rowid", messageObject.newrowid);
	}
}

function actionImplementationsetDataBlockItemValue(messageObject) {
	actionImplementationItemModifiedNative(messageObject);
}

function actionImplementationsetControlBlockItemValue(messageObject) {
	var itemReference = getBlockAndItemNameFromBlockReference(messageObject.itemName);
	var $inputs = $("controlblock[control-block-name=\"" + itemReference.blockname + "\"]").find("[name=\"" + itemReference.itemName + "\"]");
	$($inputs).val(messageObject.itemValue);
	//alert(messageObject.itemName + "=" + messageObject.itemValue);
}

function actionImplementationItemModifiedNative(messageObject) {
	
	/** Radio items have "orjinal-name" attribute
	 *  For radio items, there is nothing to do. */
	var item = $("datablock[data-block-name=" + messageObject.dataBlockName + "] input[rowid=\"" + messageObject.rowid + "\"][server-current-row-name=" + messageObject.itemName + "][orjinal-name]");
	
	if ($(item).length > 0) {
		// It is a radio item
		
	} else {
		// It is not a radio item
		item = $("datablock[data-block-name=" + messageObject.dataBlockName + "] input[rowid=\"" + messageObject.rowid + "\"][name=" + messageObject.itemName + "]");
		
		if ($(item).length == 0) {
			item = $("datablock[data-block-name=" + messageObject.dataBlockName + "] select[rowid=\"" + messageObject.rowid + "\"][name=" + messageObject.itemName + "]");
		}
		if ($(item).length == 0) {
			item = $("datablock[data-block-name=" + messageObject.dataBlockName + "] textarea[rowid=\"" + messageObject.rowid + "\"][name=" + messageObject.itemName + "]");
		}
		if ($(item).length == 0) {
			SodiumNotify({
				messageType: 'error',
				text: "Item not found"
			});
			return;
		}
		$(item).val(messageObject.itemValue);

		if ($(item).prop("tagName") == "SELECT") {
			updatesDetailDropdownOptions("datablock", messageObject, item);
		}
		
		if (messageObject.simulateClientModification == "Y") {
			$(item).removeClass("row-modified-tr");
			$(item).removeClass("row-modified-item");
			$(item).addClass("item-modified-ok");
		}		
	}
	
}

function actionImplementationHideItem(messageObject) {
	var itemReference = getBlockAndItemNameFromBlockReference(messageObject.itemToHide);
	var $inputs = $("datablock[data-block-name=" + itemReference.blockname + "]").find("input[name=" + itemReference.itemName + "]");
	$.each( $inputs,
			function () {
					$(this).css('visibility','hidden');
				}
		  );
}

function actionImplementationShowItem(messageObject) {
	var itemReference = getBlockAndItemNameFromBlockReference(messageObject.itemToShow);
	var $inputs = $("datablock[data-block-name=" + itemReference.blockname + "]").find("input[name=" + itemReference.itemName + "]");
	$.each( $inputs,
			function () {
				$(this).css('visibility','visible');
				}
		  );
}

function actionImplementationDisableItem(messageObject) {
	var itemReference = getBlockAndItemNameFromBlockReference(messageObject.itemToDisable);
	var $inputs = $("datablock[data-block-name=" + itemReference.blockname + "]").find("input[name=" + itemReference.itemName + "]");
	$.each( $inputs,
			function () {
				$(this).prop( "disabled", true);
				}
		  );
}

function actionImplementationPrompt(messageObject) {
	var prompResult = prompt(messageObject.label, messageObject.defaultValue);
    if (prompResult != null) {
    	alert("Metin = " + prompResult);
    }
}

function actionImplementationEnableItem(messageObject) {
	var itemReference = getBlockAndItemNameFromBlockReference(messageObject.itemToEnable);
	var $inputs = $("datablock[data-block-name=" + itemReference.blockname + "]").find("input[name=" + itemReference.itemName + "]");
	$.each( $inputs,
			function () {
				$(this).prop( "disabled", false);
				}
		  );
}

function getBlockAndItemNameFromBlockReference(strItemReference) {
	if (!strItemReference) {
		alert("Blok veya item adi hatali");
	}	
	var posPoint 	= strItemReference.indexOf("."); 
	var blockName;
	if (strItemReference.substr(0, 1) != ":") {
	    blockName = strItemReference.substr(0, posPoint);
	} else {
	    blockName = strItemReference.substr(1, posPoint-1);
	}
	var itemName	= strItemReference.substr(posPoint+1);	
		
	return {
		"blockname" : blockName,
		"itemName"	: itemName
	};
}

function actionImplementationDeleteSuccessful(messageObject) {
	SodiumNotify({
		messageType: 'success',
		text: "Record deleted"
	});
}


function actionImplementationDeleteRejected(messageObject) {
	if (blockContext[messageObject.dataBlockName].lastDeleteAttemptOnRow != undefined) {
		// Clone copy of the row attempted to be delete: blockContext[messageObject.dataBlockName].lastDeleteAttemptOnRow
	}
}

function actionImplementationUpdateRejected(messageObject) {
	/* 
	 * No action required. Server will omit "refreshDataBlockRow" response action for each "update rejected" action. It will take care of the rest
	 */
}

function actionImplementationInsertRejected(messageObject) {
	/* 
	 * No action required. Server will omit "refreshDataBlockRow" response action for each "update rejected" action. It will take care of the rest
	 */
}

function actionImplementationRefreshBlockHTSQL(messageObject) {
	nativeProcedureCallForRefreshBlock(messageObject.dataBlockName);
}

function actionImplementationError(errorObject) {
	SodiumNotify({
		messageType: 'error',
		text: errorObject.reasonText + ' ' + errorObject.possibleSolution
	});
}

function actionImplementationSelectRowSuccessfulNative(messageObject) {
	try {
		// clear previous row class
		var oldtr = $("datablock[data-block-name=" + messageObject.dataBlockName + "] tr[class*=current-row-selected-tr]");
		$(oldtr).removeClass("current-row-selected-tr");
		
		// clear previous item class
		var olditems = $("datablock[data-block-name=" + messageObject.dataBlockName + "] tr input[class*=current-row-selected-item]");
		$(olditems).removeClass("current-row-selected-item");
		
		// apply css style to the new row successfully selected
		var db = $("datablock[data-block-name=" + messageObject.dataBlockName + "]");
		var inputItems = $(db).find("input[rowid='" + messageObject.rowid + "'], select[rowid='" + messageObject.rowid + "'], textarea[rowid='" + messageObject.rowid + "']");

		if ( inputItems && inputItems.length > 0) {			
			var inputItem = $(inputItems)[0];
			var newtr = getRecordRowElement( $( inputItem ) );
			if (newtr) {
				$(newtr).addClass("current-row-selected-tr");
			}
		}
	
	} catch (e) {
	    if (e instanceof SyntaxError) {
	    	alert("SyntaxError");
	    } else if (e instanceof TypeError) {
	    	alert("type error");
	    } else {
	        alert("Client side error occured: Unknown type" + e);
	    }
	};
}


function _selectDatablockFirstRow(messageObject) {
	var firstInputElement = $("datablock[data-block-name=" + messageObject.dataBlockName + "] input[rowid]")[0];
	if (! firstInputElement) {
		firstInputElement = $("datablock[data-block-name=" + messageObject.dataBlockName + "] select[rowid]")[0];
	}
	if (! firstInputElement) {
		firstInputElement = $("datablock[data-block-name=" + messageObject.dataBlockName + "] textarea[rowid]")[0];
	}
	if (!firstInputElement) {
        /* No input elements found in table body. Probably something went wrong in server side. Nothing to do */
		return;
	}
	var localSelection = _getSelection(firstInputElement);
	doMarking(localSelection, null);
	return localSelection;
}

function showSuccessMessage(dataBlockName, messageText) {
	var $thead = $("datablock[data-block-name=" + dataBlockName + "]").find("thead");
	var $tr = $($thead).find("tr")[0];

	$($tr).find("td").hide();

	$($tr).append('<td class="messageSuccess" colspan="50">' + messageText + '</td>');
	setTimeout(
			function(){
				$($tr).find("td").show();
				$($tr).find("td[class=messageSuccess]").remove();
			},
			2500
	);
}

/**
 * Clears previous actions in the action lists. Otherwise, it is accumulated for each Ajax request
 * and executed again and again.
 *
 * @returns
 */
function clearPreviousResponses() {
	lastResponse = {
		"actions" : []
	};
}

function initResponse() {
	//clearPreviousResponses();
}


function actionImplementationMessage(messageObject) {
	SodiumNotify({
		type: messageObject.type,
		title: messageObject.messageTitle,
		messageType: messageObject.messageType,
		text: messageObject.messageText
	});
}

function SodiumNotify(args) {
    let pNotifyParams = {
        
    };
    for (var k in args)
		pNotifyParams[k] = args[k];
		
	if (args.messageType == 'info') {
		if (!pNotifyParams.title)
			pNotifyParams.title = 'Bilgi';
		PNotify.info(pNotifyParams);
	}
	else if (args.messageType == 'success') {
		if (!pNotifyParams.title)
			pNotifyParams.title = 'Başarılı';
		PNotify.success(pNotifyParams);
	}
	else if (args.messageType == 'error') {
		if (!pNotifyParams.title)
			pNotifyParams.title = 'Hata';
		PNotify.error(pNotifyParams);
		/*
		delete pNotifyParams.delay;
		if (!pNotifyParams.title)
			pNotifyParams.title = 'Hata';
		pNotifyParams.delay = 8000;
		pNotifyParams.hide = true;
		pNotifyParams.modules = {
			Confirm: {
				confirm: true,
				buttons: [{
						text: 'Ok',
						primary: true,
						click: function (notice) {
							notice.close();
						}
					}]
			},
			Buttons: {
				closer: false,
				sticker: false
			},
			History: {
				history: false
			}
		};
		PNotify.error(pNotifyParams);*/
	}
	else if (args.messageType == 'notice') {
		if (!pNotifyParams.title)
			pNotifyParams.title = 'Dikkat';
		PNotify.notice(pNotifyParams);
    }
}