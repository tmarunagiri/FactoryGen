
class Util  {
	constructor(){

	}

	Format(){
		var _tobeformated=null;
		var _search;
		if(arguments.length>0){
			_tobeformated=arguments[0];
			for(var i=1;i<arguments.length;i++){
				_search="{"+(i-1).toString()+ "}"
				_tobeformated=_tobeformated.replace(_search,arguments[i]);
			}
		}
		return _tobeformated;
	}
	AppendLine(str){
		return str+"\n";
	}
}

class JsonFactory{
	
	constructor(){
		this.InjectedFactories;
		this.FactoryName;
		this.FactoryBodyCode;
		this.FactoryFullCode;
	}
}

class  ModelFactory{
	constructor(dataTable){
		this.dataTable=dataTable;
		this.templateFile;
		this.jsonFactory=[];
	    this.sourceTemplate="";
	    this.rfs=window.requestFileSystem = window.requestFileSystem ||     window.webkitRequestFileSystem;
	}

	CreateFactory(factoryName,factoryID){
		var jfactory = new JsonFactory();
		var filterobj={Id:factoryID,Type:"Parent",Active:true}
		var	injectedFactoryString = this.GetChildFactories(factoryID,filterobj);
		filterobj={Id:factoryID,Type:"Field",Active:true}
		var factoryFields=this.GetChildFactories(factoryID,filterobj);
		var injectedFactoryArray=injectedFactoryString.split(",");
		var factoryFieldsArray=factoryFields.split(",");
		var bodyFunction="";
		bodyFunction+=Util.AppendLine(Util.Format("function {0} (data) {1}",factoryName,"{"));
		bodyFunction+=Util.AppendLine(Util.Format("this.init(data);"));
		bodyFunction+=Util.AppendLine(Util.Format("{0};","}"));
		bodyFunction+=Util.AppendLine(Util.Format("{0}.prototype ={1}",factoryName,"{"));
		bodyFunction+=Util.AppendLine(Util.Format("init : function(data){0} ","{"));
		bodyFunction+=Util.AppendLine(Util.Format("if(data){0}","{"));
		bodyFunction+=Util.AppendLine(Util.Format("angular.extend(this,data);"));
		bodyFunction+=Util.AppendLine(Util.Format("{0}", "}"));
		bodyFunction+=Util.AppendLine(Util.Format("else {0}","{"));
		bodyFunction+=Util.AppendLine(Util.Format("angular.extend(this, {0}", "{"));
		for (var i = 0; i < factoryFieldsArray.Length; i++)
		{
			bodyFunction+=Util.AppendLine(Util.Format("{0} :null;",  factoryFieldsArray[i].replace("'", ""))); //intialize factory fields to null
		}
		for (var i = 0; i < injectedFactoryArray.Length; i++)
		{
			bodyFunction+=Util.AppendLine(Util.Format("{1} = {1}.init({0});", "{}", injectedFactoryArray[i].replace("'", ""))); //call the init method of injected factories
		}
		bodyFunction+=Util.AppendLine("});");
		bodyFunction+=Util.AppendLine("}}}");
		bodyFunction+=Util.AppendLine(Util.Format("return {0};", factoryName)); // return the intialized that object.

		jfactory.FactoryName = factoryName;
		if (injectedFactoryArray.length>0)
		{
			jfactory.InjectedFactories = injectedFactoryString;
		}
		else
		{
			jfactory.InjectedFactories = "";
		}
		
		jfactory.FactoryBodyCode = bodyFunction.toString();

		return jfactory;
	}

	GenerateFactories(){
		//Get the parent Nodes
        var strComma;
		for(var i=0;i<this.dataTable.length;i++){
			var jfactory=this.CreateFactory(this.dataTable[i].Node,this.dataTable[i].Id);
            strComma="";
            if(jfactory.InjectedFactories.split(",").length>1){
                strComma=",";
            }
			jfactory.FactoryFullCode=Util.Format(this.sourceTemplate, 
                                                            jfactory.FactoryName, 
                                                            jfactory.InjectedFactories, 
                                                            jfactory.FactoryBodyCode,
                                                            strComma,
                                                            jfactory.InjectedFactories.replace("'","")
                                                            );
			this.jsonFactory.push(jfactory);
		}
		//this.WritetoFile(this.jsonFactory);
		
	}

	GetChildFactories(factoryID,filterobj){
		var factoryString="";
		for(var i=0;i<this.dataTable.length;i++){
			var dt=this.dataTable[i];
			if(dt.ParentId==filterobj.Id && dt.Type==filterobj.Type && dt.Active==filterobj.Active){
				factoryString=factoryString+dt.Node+",";
			}
		}
		return factoryString;
	}
	GetFactoryFields(){
		
	}
    
    WritetoFile(jf){
        
        for(var j in jf){
			//fs.writeFileSync(jf.FactoryFullCode,jf.factoryName+'.js');
            
            var jsfile=jf[j].FactoryName+'.js';
            var jcode=jf[j].FactoryFullCode;
            window.requestFileSystem(window.TEMPORARY, 1*1024*1024,function(fs){
                onInitFs(fs,jsfile,jcode,'Public1/');
            },errorHandler);
		}
        
	}

    onInitFs(fs,jsfile,jcode,dirName){
            
        var fileExists=function(jsfile){
            
        fs.root.getFile(jsfile, {create: false}, function(fileEntry){
                fileEntry.remove(function(){
                    console.log("File removed");
                });
            },function(){});
        }
        fileExists(jsfile);
        fs.root.getFile(jsfile, {create: true}, function(fileEntry) {
	        fileEntry.createWriter(function(fileWriter) {
	        fileWriter.onwriteend = function(e) {
	            console.log('Write completed.');
	           var acr= document.getElementById("genFile");
	            acr.href=fileEntry.toURL();
	            acr.innerHTML=fileEntry.name;
	        };
	        fileWriter.onerror = function(e) {
	            console.log('Write failed: ' + e.toString());
	        };
	        // Create a new Blob and write it to log.txt.
	        var blob = new Blob([jcode], {type: 'text/plain'});
	        fileWriter.write(blob);
	        }, errorHandler)
        }, errorHandler);

    }
    
    errorHandler(e){
      var msg = '';
      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'QUOTA_EXCEEDED_ERR';
          break;
        case FileError.NOT_FOUND_ERR:
          msg = 'NOT_FOUND_ERR';
          break;
        case FileError.SECURITY_ERR:
          msg = 'SECURITY_ERR';
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = 'INVALID_MODIFICATION_ERR';
          break;
        case FileError.INVALID_STATE_ERR:
          msg = 'INVALID_STATE_ERR';
          break;
        default:
          msg = 'Unknown Error';
          break;
      };
        console.log('Error: ' + msg);
    }

    ReadLocalFile(file,ofact){
   		var rawFile = new XMLHttpRequest();
       	rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    if(ofact){
                        ofact.sourceTemplate=allText;
                    }
                }
            }
        }
        
        rawFile.send();
    }

}

export default ModelFactory;

