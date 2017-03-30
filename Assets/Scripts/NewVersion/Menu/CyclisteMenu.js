#pragma strict

var goingLeft : boolean = false;
private var rSpeed : float;

function Start () {
	rSpeed = Random.Range (8, 12);
	Destroy(gameObject, 30);
}

function Update () {
	if (goingLeft){
		transform.position.x -= rSpeed * Time.deltaTime;
	}
	else if (!goingLeft){
		transform.position.x += rSpeed * Time.deltaTime;
	}
}
