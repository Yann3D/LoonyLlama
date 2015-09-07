#pragma strict

//Lama
var projectile : GameObject;
var lamaRig : GameObject;
var spotLama : GameObject;
var couLama : GameObject;

//Classes
var mainScript : Main;
var recoltableManager : RecoltableManager;
var gameModesManager : GameModesManager;
var scoreManager : ScoreManager;
var achManager : AchievementsManager;

//Recoltables
var associatedRecoltable : GameObject;
var recoltablesParent : GameObject;

//Score
var spotScore : GameObject;
var valeurDuClic : int = 150;

//Jeune
private var corpsDuJeune : GameObject;
var youngFall : GameObject;
var vfxCourse : tk2dSpriteAnimator;
var porteur : boolean;
var brouette : boolean;
var hoverboard : boolean;
var piqueNique : boolean;
var baigneur : boolean;
var maxSpeedMove : float = 0;

//GUI et mode de jeu
private var buttonSmashing : boolean = false;

//Variables privées
private var intervalle : float;
private var bEjected : boolean;
private var countdown : int;
private var moveAccel : float;
private var sample : float;
private var bRunning : boolean;
private var updateSpeedRun : boolean;
private var bOnLlamaDuty : boolean;
private var startCountdown : boolean;
private var stop : boolean;
private var stillOnDuty : boolean;
private var playVFXCourse : boolean = false;
private var generateScore : boolean = false;
private var updateSpeedMove : boolean = true;
private var calculDistance : boolean = true;
private var startRunAndGather : boolean = true;
private var goBack : boolean = false;

function Start () {
	corpsDuJeune = transform.Find("Corps").gameObject;
	stillOnDuty = false;
	stop = false;
	startCountdown = true;
	countdown = 5;
	bEjected = false;
	bOnLlamaDuty = false;
	updateSpeedRun = true;
	bRunning = false;
	moveAccel = 1.0;
}

function Update () {
	
	//Définit si le jeune est déclenché ou non
	if (!stop){
		BasicYoungMovements();
	}
	
	//Joue les FX sous les pieds des jeunes 
	if (playVFXCourse){
		if (!piqueNique){
			VFX_Course();
		}
		if (piqueNique){
			VFX_Course_Quinconces();
		}
	}
	
	//Ejecte le lama	
	if (bOnLlamaDuty && bEjected){
		EjectLlama();
		bEjected = false;	
	}
}

//Déclenche le jeune lorsque la caméra/lama arrive à proximité, et gère leurs actions lorsqu'ils sont en contact avec le lama
function BasicYoungMovements() {
	
	if (!goBack){
	
		//Gère la direction du jeune tant qu'il n'a pas le lama en charge
		if (!bOnLlamaDuty){
			if (this.transform.position.x - projectile.transform.position.x > 0){
				transform.rotation.y = 0;
			}
			else{
				transform.rotation.y = 180;
			}
		}
		else{
			transform.rotation.y = 180;
		}
		
		//Déclenche le jeune si la caméra arrive à proximité
		if (!bRunning){
			if (this.transform.position.x - Camera.main.transform.position.x <= 4.9){
				if (!hoverboard || !baigneur){
					corpsDuJeune.GetComponent.<Animation>().Play();
					playVFXCourse = true;
				}
				bRunning = true;
			}
		}
		else if (bRunning && !bOnLlamaDuty){
			if (hoverboard || baigneur){
				if (this.transform.position.x - projectile.transform.position.x > 0){
					moveAccel = 0;
				}
				else{
					moveAccel = 3;
				}
			}
			else{
				moveAccel = 3.6;
			}
			this.transform.Translate(Vector3.left * moveAccel * Time.deltaTime);
		}
		
		//Si le jeune a le lama en charge, gère le button smashing, fait apparaitre la jauge au-dessus de lui et gère son déplacement
		else if (bRunning && bOnLlamaDuty){
			if (!buttonSmashing){
				if (porteur){
					if (stillOnDuty){
						SignalIt();
					}
				}
				if (startRunAndGather){
					gameModesManager.DefineActiveYoung(this);
					gameModesManager.RunAndGather(this.gameObject);
					startRunAndGather = false;
				}
				moveAccel = 3;
			}
			if (buttonSmashing){
				gameModesManager.SetupButtonMashing();
				if (updateSpeedMove){
					UpdateSpeedMove();
				}
				if (Input.GetMouseButtonDown(0)){
					scoreManager.GenerateScore(spotScore, valeurDuClic, "Plus vite !");
					if (moveAccel > maxSpeedMove){
						moveAccel = maxSpeedMove;
					}
					else{
						moveAccel += 0.09;
					}
				}
			}
			this.transform.Translate(Vector3.left * moveAccel * Time.deltaTime);
		}
	}
	else{
		transform.rotation.y = 0;
		this.transform.Translate(Vector3.left * moveAccel * Time.deltaTime);
	}
}

//Signale au RecoltableManager que le jeune porte toujours le lama et envoie l'ordre de popper un récoltable
function SignalIt () {
	if (calculDistance){
		intervalle = (youngFall.transform.position.x - this.transform.position.x)/35;	
		calculDistance = false;
	}
	stillOnDuty = false;
	recoltableManager.GenereUnRecoltable(associatedRecoltable);
	yield WaitForSeconds(intervalle);
	stillOnDuty = true;
}

//Que faire lors de la rencontre entre le jeune et le lama
function YoungAndLlamaSetup () {
	bOnLlamaDuty = true;
	stillOnDuty = true;
	if (porteur){
		scoreManager.StopRoue();
		corpsDuJeune.GetComponent.<Animation>().Play("RunCycleWithLama");
		yield WaitForSeconds(Time.deltaTime);
		lamaRig.GetComponent.<Animation>().Play("OnBack");
	}
	if (brouette){
		corpsDuJeune.GetComponent.<Animation>().Play("RunCycleBrouette");
		yield WaitForSeconds(Time.deltaTime);
		lamaRig.transform.rotation.y = 180;
		lamaRig.GetComponent.<Animation>().Play("Brouette");
	}
	if (hoverboard){
		GameObject.Find("MrLoyal").transform.rotation.y = 180;
		vfxCourse.gameObject.SetActive(true);
		playVFXCourse = true;
		corpsDuJeune.GetComponent.<Animation>().Play();
		yield WaitForSeconds(Time.deltaTime);
		projectile.transform.rotation.y = 0;
		lamaRig.GetComponent.<Animation>().Play("Glissade");
	}
	if (piqueNique){
		GameObject.Find("MrLoyal").transform.rotation.y = 0;
		recoltablesParent.SetActive(true);
		projectile.GetComponent.<Collider>().isTrigger = false;
		couLama.SetActive(true);
		projectile.SetActive(false);
	}
	if (baigneur){
		vfxCourse.gameObject.SetActive(true);
		playVFXCourse = true;
		corpsDuJeune.GetComponent.<Animation>().Play("NageSurf");
		yield WaitForSeconds(Time.deltaTime);
		lamaRig.GetComponent.<Animation>().Play("Surfing");
		gameModesManager.RunAndGatherPhysicsSetup();
	}
	if (!piqueNique){
		projectile.transform.parent = spotLama.transform;
		projectile.transform.position = spotLama.transform.position;
	}
}

//Ejection du lama
function EjectLlama(){
	recoltableManager.ResetSounds();
	gameModesManager.InterMode();
	bOnLlamaDuty = false;
	bEjected = false;
	if (porteur){
		if (PlayerPrefs.GetInt("5 lamas et legumes par jour") == 0){
			PlayerPrefs.SetInt("5 lamas et legumes par jour",1);
			achManager.DisplayUnlockedAchievement("5 lamas et legumes par jour");
		}
		corpsDuJeune.GetComponent.<Animation>().Play("Fall");
		projectile.GetComponent.<Rigidbody>().AddForce(Vector3(10,5,0),ForceMode.Impulse);
		scoreManager.GenerateBonus(1500, "FIN DE QUARTIER");
	}
	if (brouette){
		if (PlayerPrefs.GetInt("Couche dans les fleurs avec un lama pour temoin") == 0){
			PlayerPrefs.SetInt("Couche dans les fleurs avec un lama pour temoin",1);
			achManager.DisplayUnlockedAchievement("Couche dans les fleurs avec un lama pour temoin");
		}
		GameObject.Find("MrLoyal").transform.rotation.y = 0;
		corpsDuJeune.GetComponent.<Animation>().Play("BingLampadaire");
		projectile.GetComponent.<Rigidbody>().AddForce(Vector3(8,6,0),ForceMode.Impulse);
		scoreManager.GenerateBonus(4000, "FIN DE QUARTIER");
	}
	if (hoverboard){
		if (PlayerPrefs.GetInt("Lama dans la brume") == 0){
			PlayerPrefs.SetInt("Lama dans la brume",1);
			achManager.DisplayUnlockedAchievement("Lama dans la brume");
		}
		vfxCourse.gameObject.SetActive(false);
		projectile.transform.rotation = Quaternion.identity;
		projectile.GetComponent.<Rigidbody>().AddForce(Vector3(7,4,0),ForceMode.Impulse);
		goBack = true;
		scoreManager.GenerateBonus(8000, "TRANSMISSION DE LAMA !");
	}
	if (piqueNique){
		if (PlayerPrefs.GetInt("Au bord de l'eau, il y a ce lama qui me sourit") == 0){
			PlayerPrefs.SetInt("Au bord de l'eau, il y a ce lama qui me sourit",1);
			achManager.DisplayUnlockedAchievement("Au bord de l'eau, il y a ce lama qui me sourit");
		}
		couLama.SetActive(false);
		projectile.SetActive(true);
		projectile.GetComponent.<Rigidbody>().AddForce(Vector3(7,4,0),ForceMode.Impulse);
		scoreManager.GenerateBonus(16000, "FIN DE QUARTIER");
	}
	if (baigneur){
		if (PlayerPrefs.GetInt("Un lama a la mer !") == 0){
			PlayerPrefs.SetInt("Un lama a la mer !",1);
			PlayerPrefs.SetInt("Lama-trotter",1);
			achManager.DisplayUnlockedAchievement("Un lama a la mer !");
		}
		projectile.GetComponent.<Rigidbody>().AddForce(Vector3(8,8,0),ForceMode.Impulse);
		goBack = true;
		scoreManager.GenerateBonus(20000, "FIN DE QUARTIER");
	}
}

//Joue les FX sous les pieds des jeunes
function VFX_Course () {
	playVFXCourse = false;
	vfxCourse.Play();
	yield WaitForSeconds(0.1);
	playVFXCourse = true;
}

//Joue les FX sous les pieds des jeunes
function VFX_Course_Quinconces () {
	playVFXCourse = false;
	vfxCourse.Play();
	yield WaitForSeconds(0.38);
	playVFXCourse = true;
}

//Ralentit le jeune entre les clics du button smashing
function UpdateSpeedMove () {
	updateSpeedMove = false;
	moveAccel -= 0.125;
	if (moveAccel < 4.0){
		moveAccel = 4.0;
	}
	yield WaitForSeconds(0.2);
	updateSpeedMove = true;
}

//Désactive le jeune et le fige, ainsi que le lama
function ImmobiliseJeune(){
	corpsDuJeune.GetComponent.<Animation>().Stop();
	vfxCourse.enabled = false;
}

//Cache les récoltables associés au jeune
function HideAssociatedRecoltables(){
	recoltableManager.HideRecoltables(recoltablesParent);
}

//Stoppe la translation du jeune
function StopYoungMoves(){
	stop = true;
}

//Déclenche le button mashing
function ActiveButtonMashing(){
	buttonSmashing = true;
}