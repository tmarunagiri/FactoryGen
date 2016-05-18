var fs = require('fs');
var path=require('path');
var foldername =path.join(__dirname,"Factory");
var WriteToFile=function (jf){
    if (!fs.existsSync(foldername)){
    fs.mkdirSync(foldername);
    }
    //console.log("foldername :" +foldername);
    var fname= foldername+"/" +jf.FactoryName+'.js';
    //console.log("filename "+fname);
    fs.writeFileSync(fname,jf.FactoryFullCode);
    
}
var DelFolder=function(path){
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
        fs.unlinkSync(curPath);
//      if(fs.lstatSync(curPath).isDirectory()) { // recurse
//        DelFolder(curPath);
//      } else { // delete file
//        //console.log("Deleting file "+curPath);
//        fs.unlinkSync(curPath);
//      }
    });
    //fs.rmdirSync(path);
  }
};

var CreateZip=function(fldname,outputfilename){
    var EasyZip = require('easy-zip').EasyZip;
    var zip=new EasyZip();
    console.log("zipping folder "+fldname);
    zip.zipFolder(fldname,function(){
	zip.writeToFile(outputfilename);
    console.log("zip file Created" +outputfilename+ " Successfully");
});
}
module.exports={
    WriteToFile:WriteToFile,
    CreateZip:CreateZip,
    DelFolder:DelFolder
}