#pragma strict

var impulseAmount : Vector3 = Vector3(8,8,0);
var score : int = 150;
private var ejectLama : boolean = false;

function Start () {
	
}

function Update () {

}

function FixedUpdate (){
	if (ejectLama){
		ejectLama = false;
		var lamaRB : Rigidbody2D = Serge.Instance().GetComponent.<Rigidbody2D>();
		lamaRB.AddForce (impulseAmount, ForceMode2D.Impulse);
		Serge.Instance().PlayAnim("Roll");
	}
}

function OnCollisionEnter2D (collision : Collision2D){

	//Relance le lama et ajoute du score
	if (collision.collider.CompareTag("Lama")){
		ejectLama = true;
	}
}