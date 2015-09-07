#pragma strict

//ATTENTION !!
//Ce script gère en réalité Mr Loyal, et non le policier.
//Le code étant similaire, j'ai conservé ce script en tant que test,
//mais le temporaire ayant tendance à devenir définitif...

var maxSpeedRun : float;

function Start () {

}

function Update () {
		
	//Gère simplement le déplacement de Mr Loyal 
	this.transform.Translate(Vector3.left * maxSpeedRun * Time.deltaTime);

}