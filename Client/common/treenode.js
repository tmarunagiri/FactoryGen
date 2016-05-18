function tree(){
	this.jsonInput=null;
	this.rootnode=null;
	this.rkey=0;
	//this.jstree=new js();
    this.jstree={};
	this.DataTable=[];
}
treenode:function treenode(key,value,rkey){
		this.id=rkey;
		this.text=key;
    }
treeData:function treeData(){
	this.Id;
	this.Node;
	this.ParentId;
	this.Type;
	this.Active;
    }
tree.prototype={
    
    
	CreateTree:function(jsonfile){
//	this.jsonInput = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
    this.jsonInput = JSON.parse(jsonfile);
	this.rootnode=new treenode("root","Root",this.rkey++);
	this.BuildTree(this.rootnode,this.jsonInput);
	//console.log(JSON.stringify(this.rootnode));
	return this.rootnode;
	},
	BuildTree:function(node,value){
	for (var childField in value) {
		if (typeof value[childField] != 'array' && typeof value[childField] != 'object') {
			var child=new treenode(childField,childValue,this.rkey++);
			if(!node.children){
				node.children=[];
			}
			node.children.push(child);
		}
		if(typeof value[childField] == 'object'){
			if (value.hasOwnProperty(childField)) {
	        childValue = value[childField];
	        if (childValue !== undefined && !(childValue instanceof Function)) {
	          // ignore undefined and functions
	          child = new treenode(childField,childValue,this.rkey++);
			  //child.setValue(childField,childValue,this.rkey++);
			  if(!node.children){
				node.children=[];
			}
	          node.children.push(child);
	        }
	      }
		  this.BuildTree(child,childValue);
		}
		if (typeof value[childField] == 'array') {
	    // array
			for (var i = 0, iMax = value.length; i < iMax; i++) {
			  childValue = value[i];
			  child = new treenode(childField,childValue,this.rkey++);
			  if(!node.children){
					node.children=[];
				}
			  node.children.push(child);
			 if (childValue !== undefined && !(childValue instanceof Function)) {
			 
				if(typeof value[childField] == 'object'){
					child = new treenode(childField,childValue,this.rkey++);
					if(!node.children){
					node.children=[];
				}
					node.children.push(child);
					this.BuildTree(child,childValue);
				}
			  }
			}
	    
		}
	}
	},
	GenerateHierachyTable:function(){
        var jstree=this.jstree;
		//var model=jstree.data.model;
		var cnt = jstree._cnt;
		var datarow;
		var _node;
		for(var i=1;i<=cnt;i++){
			
			if(jstree.is_parent(i) && (jstree.is_undetermined(i) || jstree.is_selected(i))){
				datarow = new tree();
				_node=jstree.get_node(i);
				datarow.Id=_node.id;
				datarow.Node=_node.text;
				datarow.ParentId=_node.parent;
				datarow.Type="Parent"
				datarow.Active=(jstree.is_undetermined(i) || jstree.is_selected(i));
				this.DataTable.push(datarow);
				for(var j=0;j<_node.children;j++){
					var childId=_node.children[j];
					datarow = new tree();
					_node=jstree.get_node(childId);
					datarow.Id=_node.id;
					datarow.Node=_node.text;
					datarow.ParentId=_node.parent;
					datarow.Type="Field"
					datarow.Active=(jstree.is_undetermined(childId) || jstree.is_selected(childId));
					this.DataTable.push(datarow);
				}
			}
		}
	}
}


