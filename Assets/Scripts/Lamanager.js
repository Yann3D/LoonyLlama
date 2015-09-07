#pragma strict

var lamaRig : GameObject;
var vfx_roule : tk2dSpriteAnimator;
private var bGrounded : boolean;
private var neverBounced : boolean;
private var mirorImpactNb : int = 0;
private var storeVelocity : Vector3;

function Start () {
	neverBounced = true;
}

function Update () {

	//Joue la panique si le lama est en l'air ET n'a jamais touché le sol
	if (neverBounced){
		if (this.GetComponent.<Rigidbody>().velocity.y < 0 && this.transform.position.y > -3.1){
			this.transform.rotation = Quaternion.identity;
			lamaRig.GetComponent.<Animation>().Play("PanicInTheAir");
		}
	}
	
	//sinon, joue l'animation en boule, et si sa vitesse devient trop lente au sol, joue l'animation d'arret
	else{
		if (this.GetComponent.<Rigidbody>().velocity.x > 1 && this.GetComponent.<Rigidbody>().velocity.y > 0.5){
			lamaRig.GetComponent.<Animation>().Play("Rollama");
		}
		else if (this.GetComponent.<Rigidbody>().velocity.x <= 1 && this.GetComponent.<Rigidbody>().velocity.x >= 0 && bGrounded ){
			this.GetComponent.<Rigidbody>().velocity = Vector3.right * 0;
			this.GetComponent.<Rigidbody>().useGravity = false;
			this.GetComponent.<Rigidbody>().isKinematic = true;
			this.GetComponent.<Collider>().isTrigger = true;
			lamaRig.GetComponent.<Animation>().Play("LamaStop");
		}
	}
}

//Met en place le setup du jeune et du lama
function OnTriggerEnter (collider : Collider){
	if (collider.tag == "Jeune"){
		collider.enabled = false;
		collider.GetComponent(YoungMoves).YoungAndLlamaSetup();
	}
}

//Gère les différents comportements lorsque lama entre en collision avec le jeune nageur, et les différents sols
function OnCollisionEnter (collision : Collision){
	if (collision.collider.tag == "Jeune"){
		collision.collider.enabled = false;
		collision.collider.GetComponent(YoungMoves).YoungAndLlamaSetup();
	}
	if (collision.collider.tag == "Miroir"){
		lamaRig.GetComponent.<Animation>().Play("Glissade");
	}
	neverBounced = false;
}

//Gère la collision avec le sol
function OnCollisionStay (collision : Collision){
	if (collision.collider.tag == "Ground"){
		bGrounded = true;
		vfx_roule.gameObject.SetActive(true);
		vfx_roule.Play();
	}
}

//Gère la sortie du contact entre le lama et le sol
function OnCollisionExit (collision : Collision){
	bGrounded = false;
}