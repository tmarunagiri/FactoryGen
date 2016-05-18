//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//});
var fname;
 if(process.argv.length <3){
     console.log("Invalid / Missing file name");
     return "";
 }
else{
     fname=process.argv[2];
 }
 
//var fname='./jsonsource/sample.json';
var tree = require('./treenode.js').tree;
var fs = require('fs');
var mf=require('./modelfactory.js');
//var tree=new tree();
var inputjson=tree.CreateTree(fname);
//tree.GenerateHierachyTable();
//mf.GenerateFactories();