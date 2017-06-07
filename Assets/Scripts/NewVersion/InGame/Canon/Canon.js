#pragma strict

private var worldMousePos : Vector3;

function Start () {
	
}

function Update () {
	worldMousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	if (worldMousePos.x < -3){
		worldMousePos.x = -3;
	}
	if (worldMousePos.y < -0.3){
		worldMousePos.y = -0.3;
	}
	transform.LookAt(Vector3(worldMousePos.x, worldMousePos.y, transform.position.z));
}
