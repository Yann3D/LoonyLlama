#pragma strict

var intro : AudioSource;
var applause : AudioSource;
var roulementsTambour : AudioSource;

function Start () {

}

function Update () {

}

//Joue les applaudissements à la fin du parcours
function PlayApplause (){
	applause.Play();
}
