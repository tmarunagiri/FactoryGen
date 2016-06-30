import app from "client/module";

class fileread{

    constructor(){
        this.restrict="A";
        this.scope={
            fileread: "=",
            filename:"="
        }
    }

    link(scope, element, attributes) {
        element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
                scope.$apply(function () {
                    scope.fileread = loadEvent.target.result;
                    scope.filename=changeEvent.target.files[0].name;
                });
            }
            
            reader.readAsText(changeEvent.target.files[0]);
            
        });
    }

}

export default app.directive('fileread',fileread) ;