#pragma strict

var lama : Transform;
var cameraSpeed : float;

function Start () {
	
}

function LateUpdate () {
	if (GameManager.Instance().IsLamaGone()){
		transform.position = Vector3.MoveTowards(transform.position,
			Vector3(lama.position.x, lama.position.y, transform.position.z),
			cameraSpeed * Time.deltaTime);
	}
	if (transform.position.y < -0.8){
		transform.position.y = -0.8;
	}
}
