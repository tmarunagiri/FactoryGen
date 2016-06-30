import app from "client/module";

class factoryServices{

	constructor($http){

		this.http=$http;
	}

	DelFolder(){
		return http.get('/DelFolder');
	}
	CreateFactory(jsonfactory){
		let jf={jsonFactory:jsonfactory};
		return http.get('/CreateFactory',jf);
	}
	CreateZip(){
		return http.get('/CreateZip');
	}

}

export default app.service("factoryServices",factoryServices);