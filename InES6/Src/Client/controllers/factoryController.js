import "client/css/style.css";
import "client/common/treenode";
import "client/common/modelfactory";
import factoryServices from "client/Services/factoryServices";
import app from "client/module";




class factoryController{

    //static factoryController.$inject=['factoryServices','$window'];
    constructor(factoryServices,$window){
        this.textfile="";
        this.uploadme="";
        this.treenew={};
        this.mf={};
        this.reader=new FileReader();
        this.output="";
        this.template= require("raw!client/Template/FactoryTemplate.txt");
        this.factoryServices=factoryServices;
        this.win=$window;
    }

    readFile(){
        this.txtfile="";
        angular.element('#fileJson').click();
        clearMe();
        angular.element(".progress-bar").css("width","0%");
        angular.element("#genFile").css("visibility","hidden");
    }

    readText(filePath) {

        if(filePath.files && filePath.files[0]) {           
            this.reader.onload = function (e) {
                this.output = e.target.result;
                populate(this.output);
            };//end onload()
            this.reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
   
        else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }       
        return true;
    }

    populate() {
        if(this.uploadme){
           this.txt=this.uploadme;
            clearMe();
            this.treenew = new tree();
             this.txt =JSON.stringify( this.treenew.CreateTree(this.txt));
            angular.element('#data').jstree({
            "plugins" : ["checkbox"],
            'core' : {
                'data' : JSON.parse(this.txt)
            }
        });
        treenew.jstree= angular.element('#data').jstree();
         //$scope.treenew=treenew;
        }
    
    }

    createFactories(){
        angular.element(".progress-bar").css("width","0%");
        angular.element("#genFile").css("visibility","hidden");
        if(!this.treenew.GenerateHierachyTable){
            alert("Please Create Tree before creating angular factories");
            return;
        }
        this.treenew.GenerateHierachyTable();
        
        if(this.treenew.DataTable.length==0){
            alert("Please make selection in the treenode ");
            return;
        }
        this.mf=new ModelFactory(this.treenew.DataTable);
        this.mf.ReadLocalFile(this.template,this.mf);
        this.mf.GenerateFactories();
        this.factoryServices.DelFolder().success(response=>{});
        let cntIncr= 100/mf.jsonFactory.length;
        for(let i=0;i< mf.jsonFactory.length;i++ ){
            let pbar=(i+1)*cntIncr;
            this.factoryServices.CreateFactory(mf.jsonFactory[i]).success(response=>{});
            if(pbar >100){
                pbar=100;
            }
            angular.element(".progress-bar").css("width", pbar.toString()+"%");
            angular.element(".progress-bar").html(pbar.toString()+"%");
        }
        this.factoryServices.CreateZip().success(response=>{
            angular.element("#genFile").css("visibility","visible");
        });

        alert("Factories created. Click the generated link to download.")

    }
    close(){
        this.win.close();
    }
    clearMe(){
        let divEl ='<div id="data" class="demo" ></div>';
        angular.element('#data').remove();
        angular.element('#populate').before(divEl)
    }

}
factoryController.$inject=['factoryServices'];
export default app.controller("factoryController",factoryController);
