#pragma strict

class Serge extends MonoBehaviour {

	var lamanim : Animator;
	var rebondImpulse : float = 15;
	private var lamaRB : Rigidbody2D;
	private var myCollider : CircleCollider2D;
	private var hasLanded : boolean = false;
	private var canBeRescued : boolean = false;
	private var isGrounded : boolean = false;

	private static var instance : Serge;
	public static function Instance () : Serge {
		return instance;
	}

	function Awake (){
		if (instance != null){
			Destroy (gameObject);
		}
		else {
			instance = this;
		}
	}

	function Start () {
		lamaRB = GetComponent.<Rigidbody2D>();
		myCollider = GetComponent.<CircleCollider2D>();
	}

	function Update () {
		
	}

	function FixedUpdate (){
		if (lamaRB.velocity.x < 3.0 && isGrounded && !hasLanded){
			lamanim.SetTrigger("Land");
			transform.rotation = Quaternion.Euler(0,0,0);
			lamaRB.velocity = Vector3.zero;
			hasLanded = true;
		}
	}

	function OnCollisionEnter2D (collision : Collision2D){
		if (collision.collider.CompareTag("Ground")){
			lamanim.SetTrigger("Roll");
		}
	}

	function OnCollisionStay2D (collision : Collision2D){
		if (collision.collider.CompareTag("Ground")){
			isGrounded = true;
		}
	}

	function OnCollisionExit2D (collision : Collision2D){
		if (collision.collider.CompareTag("Ground")){
			isGrounded = false;
			hasLanded = false;
		}
	}

	function SetOnJeune (spot : Transform, animToPlay : String, disappear : boolean){
		SetStill();
		transform.SetParent(spot);
		transform.position = spot.position;
		transform.localRotation = Quaternion.identity;
		if (animToPlay != ""){
			PlayAnim(animToPlay);
		}
		if (disappear){
			gameObject.SetActive(false);
		}
	}

	function SetFree (){
		if (!gameObject.activeSelf){
			gameObject.SetActive(false);
		}
		lamaRB.simulated = true;
		myCollider.enabled = true;
		transform.SetParent(null);
		lamanim.SetTrigger("Launch");
	}

	function SetStill (){
		lamaRB.simulated = false;
		lamaRB.velocity = Vector3.zero;
		myCollider.enabled = false;
	}

	function PlayAnim(animToPlay : String){
		lamanim.SetTrigger(animToPlay);
	}

	function SetRescuable (){
		canBeRescued = true;
	}

	function SetNotRescuable (){
		canBeRescued = false;
	}

	function CanBeRescued (){
		return canBeRescued;
	}
}