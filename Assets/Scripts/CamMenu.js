#pragma strict

private var target : GameObject;

function Start () {

}

function Update () {
	if (target != null){
		transform.position = Vector3.MoveTowards(transform.position, target.transform.position, 50 * Time.deltaTime);
	}
}

function MoveToMenu (menu : GameObject){
	target = menu;
}