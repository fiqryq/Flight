var cube : Transform;

function Update(){
	if(cube.gameObject == null){
	}
	else{
		transform.position = cube.position;
	}
}

function OnTriggerEnter () {
	Fly.isGrounded = true;
}
function OnTriggerExit () {
	Fly.isGrounded = false;
}