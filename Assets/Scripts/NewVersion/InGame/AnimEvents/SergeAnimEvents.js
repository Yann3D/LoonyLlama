#pragma strict

function Start () {
	
}

function Update () {
	
}

function GameOverLost (){
	if (!UIManager.Instance().CanBeSaved()){
		UIManager.Instance().TogglePause();
	}
}