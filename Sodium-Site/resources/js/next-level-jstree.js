

function initTreeLibrary() {
	initTreesInControlBlocks();	
}

function initTreesInControlBlocks() {
	var trees = $("controlblock tree[id]");
	$.each(trees, function(idx, tree) {
		initTreeElement(idx, tree);
	});	
}

function mkRefreshNode(treeNameWithBlockName, elementId) {
	var treeName;
	var blockName;
	
	var pos		= treeNameWithBlockName.indexOf(".") + 1;
	blockName	= treeNameWithBlockName.substr(0, pos-1);
	treeName 	= treeNameWithBlockName.substr(pos);
	
	var treeElement = $("controlblock[control-block-name=" + blockName + "] tree[id=" + treeName + "]");
	if (treeElement.length == 0) {
		treeElement = $("datablock[data-block-name=" + blockName + "] tree[id=" + treeName + "]");
	}
	if (treeElement.length == 0) {
		$.notify("Tree not found", "error");
		return;
	}
	
	$(treeElement).jstree().refresh_node(elementId);
}

function initTreeElement(idx, tree) {	
	// adding listener for node selection
	$(tree).on("select_node.jstree", function(event, node) {
        var selected = node.instance.get_selected();
        if(selected.length === 1) {
        	mkSendTreeNodeSelectedRequest(node);
        } else if(selected.length > 1) {
        	alert("Multi-node selection node implemented");
        }
      });
}

function mkSendTreeNodeSelectedRequest(node) {
	var dataStr = "";
	var blockName = "";
	var blockType = "";
	
	if (node != undefined && node.node != undefined && node.node.data != undefined) {
		dataStr = node.node.data.node_type;
	}
	
	var block = $(node.instance.element).closest("controlblock");
	if (block == undefined || block.length == 0) {
		block = $(node.instance.element).closest("datablock");
		if (block == undefined || block.length == 0) {
			blockName = $(block).attr("data-block-name");
			blockType = "d";
		}
	} else {
		blockName = $(block).attr("control-block-name");
		blockType = "c";
	}

	var urlVar = "?htsqlproceduretorun=tree_node_selected&treename=" + $(node.instance.element).attr("id") + 
				"&blocktype=" + blockType + 
				"&datablockname=" + blockName + 
				"&nodeid=" + encodeURIComponent(node.node.id) + 
				"&parentnodeid=" + encodeURIComponent(node.node.parent) +
				"&nodetype=" + encodeURIComponent(dataStr);

	writeLog("tree_node_selected (" + $(node.instance.element).attr("id") + ", "+ node.node.id + ")");

	$.ajax(
		{
			type: "POST",
			url: urlVar,
			contentType: "application/x-www-form-urlencoded; charset=utf-8"
		}
	  ).done(function(data, status, xhr) {	
		  eval(data);
		  addNewActionToTheResponseActionList(action);
		  executeResponse(); 
		}
	  ).fail(function(xhr, status, errorThrown) {
		  	alert('hata:' + errorThrown);
		}
	  );
}


function mkSendTreeNodeExpandedRequest(element, nodeid, cb) {
	var dataStr = "";
	var blockName = "";
	var blockType = "";
	
	var dataJsonNode = $("tree[id="+element+"]").jstree(true).get_node(nodeid);
	if (dataJsonNode != undefined && dataJsonNode.data != undefined) {
		dataStr = dataJsonNode.data.node_type;
	}
	
	var block = $("tree[id="+element+"]").closest("controlblock");
	if (block == undefined || block.length == 0) {
		block = $("tree[id="+element+"]").closest("datablock");
		if (block == undefined || block.length == 0) {
			blockName = $(block).attr("data-block-name");
			blockType = "d";
		}
	} else {
		blockName = $(block).attr("control-block-name");
		blockType = "c";
	}
	var urlVar = "?htsqlproceduretorun=tree_node_expanded&treename=" + element + 
				"&blocktype=" + blockType + 
				"&datablockname=" + blockName + 
				"&nodeid=" + encodeURIComponent(nodeid) +
				"&nodetype=" + encodeURIComponent(dataStr);

	writeLog("tree_node_expanded (element: " + element + ", node_id: " + nodeid + ")");

	$.ajax(
		{
			type: "POST",
			url: urlVar,
			contentType: "application/x-www-form-urlencoded; charset=utf-8"
		}
	  ).done(function(data, status, xhr) {	
		  eval(data);
		  action.callBackFuncion = cb;
		  addNewActionToTheResponseActionList(action);
		  executeResponse(); 
		}
	  ).fail(function(xhr, status, errorThrown) {
		  	alert('hata:' + errorThrown);
		}
	  );
}

