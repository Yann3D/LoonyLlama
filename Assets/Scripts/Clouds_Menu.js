#pragma strict

function Start () {
	transform.parent = GameObject.Find("tk2dCamera").transform;
}

function Update () {
	transform.Translate(Vector3.right * Time.deltaTime * 0.2);
}