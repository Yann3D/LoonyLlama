#pragma strict

var emitSpot : GameObject;
var projectile : GameObject;
var culotte : GameObject;
var poule_right : GameObject;
var poule_left : GameObject;
var poele : GameObject;
private var bDisturbed : boolean;
private var canEmit : boolean;
private var joueAnim : boolean = true;
private var objectsSpawned = new Array();
 
function Start () {
	canEmit = true;
	bDisturbed = false;
	objectsSpawned.Push(culotte);
	objectsSpawned.Push(poele);
	objectsSpawned.Push(poule_left);
	objectsSpawned.Push(poule_right);
}

function Update () {

	//Joue les animations et émet les objets
	if (projectile.transform.position.x >= transform.position.x - 1.5 && projectile.transform.position.x <= transform.position.x + 1.5 && projectile.transform.position.y <= -2.4){
		if (joueAnim){
			GetComponent.<Animation>().Play("Saut");
			joueAnim = false;
			if (canEmit){
				EmitObject();	
			}
		}
	}
}

//Emet des objets depuis l'échoppe
function EmitObject () {
	canEmit = false;
	var pickedObject = Random.Range(0,objectsSpawned.length);
	var spawned : GameObject = Instantiate(objectsSpawned[pickedObject],emitSpot.transform.position,Quaternion.identity);
	if (spawned.name == "Poule_left(Clone)"){
		spawned.transform.rotation.y = 180;
	}
	Destroy (spawned,4);
	var xImpulse = Random.Range(-200,200);
	spawned.GetComponent.<Rigidbody>().AddForce(Vector3(xImpulse,ObjectImpulse(pickedObject),0));
	yield WaitForSeconds(0.8);
	canEmit = true;
}

//Gère la vitesse d'éjection des objets en fonction de leur nature
function ObjectImpulse (object : int) {
if (object == 0){
	return 800;
}
if (object == 1){
	return 400;
}
if (object == 2){
	return 500;
}
if (object == 3){
	return 500;
}
}