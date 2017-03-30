#pragma strict

var cyclistes : GameObject[];
var spawnGap : Vector2;

function Start () {
	Spawn();
}

function Update () {
	
}

function Spawn (){
	if (cyclistes.Length > 0){
		var cyclIdx : int = Random.Range(0, cyclistes.Length);
		Instantiate(cyclistes[cyclIdx], transform.position, Quaternion.identity);
		Wait();
	}
}

function Wait(){
	var waitTime : float = Random.Range(spawnGap.x, spawnGap.y);
	yield WaitForSeconds(waitTime);
	Spawn();
}