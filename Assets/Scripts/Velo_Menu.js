#pragma strict

function Start () {
	transform.rotation.y = -180;
	transform.parent = GameObject.Find("tk2dCamera").transform;
}

function Update () {
	transform.Translate(Vector3.right * Time.deltaTime);
}