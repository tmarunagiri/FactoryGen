var app = angular.module("AngularFactoryApp");

app.factory("commonService",function(){

//    return{
//
//        readText1 : function readText(filePath) {
//            var reader=new FileReader();;
//            var output = ""; //placeholder for text output
//            if(filePath.files && filePath.files[0]) {           
//                reader.onload = function (e) {
//                    output = e.target.result;
//                };//end onload()
//                reader.readAsText(filePath.files[0]);
//            }//end if html5 filelist support
//            else { //this is where you could fallback to Java Applet, Flash or similar
//                return "";
//            }       
//            return output;
//        } 
//    }

})