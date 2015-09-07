#pragma strict

var pigeon : GameObject;
var tutoPigeon : GameObject;
var tutoScript : Tutoriel;
var minSpawnTime : float;
var maxSpawnTime : float;
var minSpawnHeight : float;
var maxSpawnHeight : float;
private var spawnPigeon : boolean = false;
private var tutoPigeonSpawned : boolean = false;
private var spawnTime : float;
private var firstSpawn : float;

function Start () {
	
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		firstSpawn = Random.Range(3.0,6.0);
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		firstSpawn = Random.Range(1.5,3.5);
	}
	if (PlayerPrefs.GetInt("Difficulty") == 2){
		firstSpawn = Random.Range(0.8,2.8);
	}
	yield WaitForSeconds(firstSpawn);
	spawnPigeon = true;
}

function Update () {
	
	//Spawn un pigeon à intervalles irréguliers
	if (spawnPigeon){
		SpawnPigeon();
	}
}

//Génère un nouveau pigeon
function SpawnPigeon(){
	spawnPigeon = false;
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		spawnTime = Random.Range(3.0,6.0);
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		spawnTime = Random.Range(1.5,3.5);
	}
	if (PlayerPrefs.GetInt("Difficulty") == 2){
		spawnTime = Random.Range(0.8,2.8);
	}
	var yPosition = Random.Range(minSpawnHeight,maxSpawnHeight);
	if (!tutoPigeonSpawned){
		if (PlayerPrefs.GetInt("Tuto On") == 1){
			var tutoPigeonI : GameObject = Instantiate(tutoPigeon, Vector3(Camera.main.transform.position.x - 5.2, yPosition, 1),Quaternion.identity);
			tutoScript.DefinePigeon(tutoPigeonI);
			tutoPigeonSpawned = true;
		}
		else{
			tutoPigeonSpawned = true;
		}
	}
	else{
		Instantiate(pigeon, Vector3(Camera.main.transform.position.x - 5.2, yPosition, 1),Quaternion.identity);
	}
	yield WaitForSeconds(spawnTime);
	spawnPigeon = true;
}

//Stoppe la génération de pigeons
function KillPigeons(){
	var pigeons = GameObject.FindGameObjectsWithTag("Pigeon");
	for (var pigeon in pigeons){
		Destroy(pigeon);
	}
	this.enabled = false;
}