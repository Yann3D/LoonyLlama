#pragma strict

var jeune : Jeune;
var mLoyal : Loyal;

function Start () {
	
}

function Update () {
	
}

function OnTriggerEnter2D (collider : Collider2D){
	if (collider.CompareTag("Lama")){
		if (jeune != null){
			jeune.TriggerJeune();
			UIManager.Instance().SetRescuable();
		}
		if (mLoyal != null){
			mLoyal.TriggerLoyal();
		}
	}
}