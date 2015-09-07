#pragma strict

var photos : Material;
var photoAssociee : Texture;
var tampon : GameObject;

function Start () {
	if (PlayerPrefs.GetInt(photoAssociee.name) == 1){
		tampon.SetActive(true);
	}
}

function Update () {

}

function OnMouseOver () {
	if (Input.GetMouseButtonDown(0)){
		photos.mainTexture = photoAssociee;
	}
}