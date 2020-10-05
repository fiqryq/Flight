var maxSpeed = 50.0;
var accelKey = "w";
var leftKey = "left";
var rightKey = "right";
var upKey = "up";
var downKey = "down";
var accel = 1.2;
var decel = 0.8;
var upDownSpeed = 20.0;
var turnSpeed = 20.0;
var speedToFly = 40.0;
var cam : GameObject;
var groundDetector : GameObject;
var explosion : GameObject;
private var curSpeed = 0.0;
private var curFall = 0.0;
private var isFalling = false;
static var isGrounded = true;

function Start () {

}

function Update () {
	if(isFalling  == false){
		if(Input.GetKeyDown(accelKey)){
			curSpeed ++;
		}
		if(Input.GetKey(accelKey)){
			curSpeed += accel * Time.deltaTime;
		}
	}
	else
	{
		curSpeed --;
	}
	if(Input.GetKey(accelKey)){
	}
	else{
		if(isGrounded == false){
			curSpeed -= decel * Time.deltaTime;
		}
		if(isGrounded == true){
			curSpeed -= (decel * 2) * Time.deltaTime;
		}
	}
	if(curSpeed > maxSpeed){
		curSpeed = maxSpeed;
	}
	if(curSpeed < 0){
		curSpeed = 0;
	}
	if(isGrounded == true){
		if(curSpeed < speedToFly){
			transform.rotation.x = 0;
			transform.rotation.z = 0;
			
		}
	}
	if(isGrounded == false){
		if(curSpeed < speedToFly){
			curFall += 9.8 * Time.deltaTime;
			transform.Translate(Vector3.down * curFall * Time.deltaTime);
			if(transform.position.y > 50){
				groundDetector.SetActive(false);
				isFalling = true;
			}
		}
	}
	transform.Translate(Vector3.forward * curSpeed * Time.deltaTime);
	if(Input.GetKey(upKey)){
		if(curSpeed >= speedToFly){
			transform.Rotate(Vector3.right * (-1 * upDownSpeed) * Time.deltaTime);
		}
	}
	if(Input.GetKey(leftKey)){
		transform.Rotate(Vector3.up * (-1 * turnSpeed) * Time.deltaTime);
	}
	if(Input.GetKey(rightKey)){
		transform.Rotate(Vector3.up * turnSpeed * Time.deltaTime);
	}
	if(Input.GetKey(downKey)){
		transform.Rotate(Vector3.right * turnSpeed * Time.deltaTime);
	}
	print(curSpeed);
}
function OnTriggerEnter(col : Collider){
	if(col.tag == "Terrain"){
		var cam1 : GameObject = Instantiate(cam, cam.transform.position, cam.transform.rotation);
		cam1.SetActive(true);
		var explo : GameObject = Instantiate(explosion, transform.position, transform.rotation);
		Destroy(groundDetector);
		Destroy(gameObject);
	}
}