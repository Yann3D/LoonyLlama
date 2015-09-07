#pragma strict

var ligneC : tk2dClippedSprite;
var ligneB : tk2dClippedSprite;
var ligneA : tk2dClippedSprite;

var tickartes : Transform;

var spotC : Transform;
var spotB : Transform;
var spotA : Transform;

private var nouvelleValeurC : float = -0.98;
private var nouvelleValeurB : float = -0.99;
private var nouvelleValeurA : float = -0.99;

function Start () {
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		ligneC.ClipRect = Rect(nouvelleValeurC,0,1,1);
		tickartes.position = spotC.position;
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		ligneC.ClipRect = Rect(nouvelleValeurB,0,1,1);
		tickartes.position = spotB.position;
	}
	if (PlayerPrefs.GetInt("Difficulty") == 2){
		ligneC.ClipRect = Rect(nouvelleValeurA,0,1,1);
		tickartes.position = spotA.position;
	}
}

function Update () {

}

function AjouteArret(difficulty : int, nbCartes : int){ 
	var valeurAjout = 0.0;
	if (difficulty == 0){
		if (nbCartes <= 15){
			valeurAjout = 0.065;
			nouvelleValeurC += valeurAjout;
			if (nouvelleValeurC >= 0){
				nouvelleValeurC = 0;
			}
			ligneC.ClipRect = Rect(nouvelleValeurC,0,1,1);
		}
	}
	if (difficulty == 1){
		if (nbCartes <= 25){
			valeurAjout = 0.04;
			nouvelleValeurB += valeurAjout;
			if (nouvelleValeurB >= 0){
				nouvelleValeurB = 0;
			}
			ligneB.ClipRect = Rect(nouvelleValeurB,0,1,1);
		}
	}
	if (difficulty == 2){
		if (nbCartes <= 32){
			valeurAjout = 0.031;
			nouvelleValeurA += valeurAjout;
			if (nouvelleValeurA >= 0){
				nouvelleValeurA = 0;
			}
			ligneA.ClipRect = Rect(nouvelleValeurA,0,1,1);
		}
	}
}