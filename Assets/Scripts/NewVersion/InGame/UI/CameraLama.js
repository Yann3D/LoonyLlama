#pragma strict

var lama : Transform;
var cameraSpeed : float;

function Start () {
	
}

function LateUpdate () {
	if (!UIManager.Instance().IsStartingGame()){
		transform.position = Vector3.MoveTowards(transform.position,
			Vector3(lama.position.x, lama.position.y, transform.position.z),
			cameraSpeed * Time.deltaTime);
	}
}
