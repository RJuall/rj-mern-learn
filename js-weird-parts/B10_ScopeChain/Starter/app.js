function a() {
	function b() {
		
		console.log(myVar);
		myVar = 2;
	}

	//var myVar = 2;
	b();
	console.log(myVar);
}

var myVar = 1;
a();