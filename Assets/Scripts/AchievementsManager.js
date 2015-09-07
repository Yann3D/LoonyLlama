#pragma strict
import UnityEngine.UI;

var pancarte : GameObject;
var txtAchievement : Text;
static var entreesTram : int = 0;

function Start () {
	PlayerPrefs.SetInt("Tickartes", 0);
	PlayerPrefs.SetInt("Croissants", 0);
	PlayerPrefs.SetInt("Caneles", 0);
	PlayerPrefs.SetInt("Macarons", 0);
	PlayerPrefs.SetInt("Sandwichs", 0);
	PlayerPrefs.SetInt("Raisins", 0);
}

function Update () {
	
}

function DisplayUnlockedAchievement (nomDuSucces : String) {
	if (!pancarte.GetComponent.<Animation>().isPlaying){
		txtAchievement.text = nomDuSucces;
		pancarte.GetComponent.<Animation>().Play();
	}
}

//Gère les succès des récoltables
function CheckRecoltables(nomSucces : String, objectif : int){
	if (PlayerPrefs.GetInt(nomSucces) + 1 > objectif){
		PlayerPrefs.SetInt(nomSucces, objectif);
	}
	else{
		PlayerPrefs.SetInt(nomSucces, PlayerPrefs.GetInt(nomSucces) + 1);
		if (PlayerPrefs.GetInt(nomSucces) == objectif){
			DisplayUnlockedAchievement(nomSucces);
		}
	}
	CheckGourmet();
	CheckBordelais();
}

function CheckGourmet(){
	if (PlayerPrefs.GetInt("Fin Gourmet") == 0){
		if (PlayerPrefs.GetInt("Reveil Difficile") == 100 && PlayerPrefs.GetInt("Rustique") == 170){
			PlayerPrefs.SetInt("Fin Gourmet", 1);
			DisplayUnlockedAchievement("Fin Gourmet");
		}
	}
}

function CheckEntreeTram() {
	entreesTram += 1;
	if (entreesTram == 1){
		if (PlayerPrefs.GetInt("Lama bad trip") == 0){
			PlayerPrefs.SetInt("Lama bad trip", 1);
			DisplayUnlockedAchievement("Lama bad trip");
		}
	}
	if (entreesTram == 5){
		if (PlayerPrefs.GetInt("Recidiviste") == 0){
			PlayerPrefs.SetInt("Recidiviste", 1);
			DisplayUnlockedAchievement("Recidiviste");
		}
	}
}

function CheckBordelais(){
	if (PlayerPrefs.GetInt("Un(e) vraie(e) Bordelais(e) !") == 0){
		if (PlayerPrefs.GetInt("Ultra-Swag !") == 1 &&
			PlayerPrefs.GetInt("Expert Touriste") == 16 &&
			PlayerPrefs.GetInt("Lama bad trip") == 1 &&
			PlayerPrefs.GetInt("Angles Arrondis") == 120 &&
			PlayerPrefs.GetInt("Connaisseur") == 150 &&
			PlayerPrefs.GetInt("Ami de la vigne") == 200){
				PlayerPrefs.SetInt("Un(e) vraie(e) Bordelais(e) !", 1);
				DisplayUnlockedAchievement("Un(e) vraie(e) Bordelais(e) !");
		}
	}
}

function CheckLigne() {
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		if (PlayerPrefs.GetInt("Tickartes") == 15){
			if (PlayerPrefs.GetInt("Swag !") == 0){
				PlayerPrefs.SetInt("Swag !", 1);
				DisplayUnlockedAchievement("Swag !");
			}
		}
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		if (PlayerPrefs.GetInt("Tickartes") == 25){
			if (PlayerPrefs.GetInt("Mega-Swag !") == 0){
				PlayerPrefs.SetInt("Mega-Swag !", 1);
				DisplayUnlockedAchievement("Mega-Swag !");
			}
		}
	}
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		if (PlayerPrefs.GetInt("Tickartes") == 32){
			if (PlayerPrefs.GetInt("Ultra-Swag !") == 0){
				PlayerPrefs.SetInt("Ultra-Swag !", 1);
				DisplayUnlockedAchievement("Ultra-Swag !");
				CheckBordelais();
			}
		}
	}
	if (PlayerPrefs.GetInt("Lama'tinee dans le tram") == 0){
		if (PlayerPrefs.GetInt("Swag !") == 1 && PlayerPrefs.GetInt("Mega-Swag !") == 1 && PlayerPrefs.GetInt("Ultra-Swag !") == 1){
			PlayerPrefs.SetInt("Lama'tinee dans le tram", 1);
			DisplayUnlockedAchievement("Lama'tinee dans le tram");
		}
	}
}

function CheckPhotos() {
	if (PlayerPrefs.GetInt("Difficulty") == 0){
		if (PlayerPrefs.GetInt("Tickartes") >= 3){
			if (PlayerPrefs.GetInt("Gare") == 0){
				PlayerPrefs.SetInt("Gare", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 5){
			if (PlayerPrefs.GetInt("SainteCroix") == 0){
				PlayerPrefs.SetInt("SainteCroix", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 6){
			if (PlayerPrefs.GetInt("SaintMichel") == 0){
				PlayerPrefs.SetInt("SaintMichel", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 7){
			if (PlayerPrefs.GetInt("PorteDeBourgogne") == 0){
				PlayerPrefs.SetInt("PorteDeBourgogne", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 8){
			if (PlayerPrefs.GetInt("PlaceDeLaBourse") == 0){
				PlayerPrefs.SetInt("PlaceDeLaBourse", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 9){
			if (PlayerPrefs.GetInt("PlaceDesQuiconces") == 0){
				PlayerPrefs.SetInt("PlaceDesQuinconces", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 10){
			if (PlayerPrefs.GetInt("JardinPublic") == 0){
				PlayerPrefs.SetInt("JardinPublic", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
	}
	if (PlayerPrefs.GetInt("Difficulty") == 1){
		if (PlayerPrefs.GetInt("Tickartes") >= 16){
			if (PlayerPrefs.GetInt("PlaceDeLaVictoire") == 0){
				PlayerPrefs.SetInt("PlaceDeLaVictoire", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 18){
			if (PlayerPrefs.GetInt("HotelDeVille") == 0){
				PlayerPrefs.SetInt("HotelDeVille", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 20){
			if (PlayerPrefs.GetInt("GrandTheatre") == 0){
				PlayerPrefs.SetInt("GrandTheatre", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 21){
			if (PlayerPrefs.GetInt("PlaceDesQuiconces") == 0){
				PlayerPrefs.SetInt("PlaceDesQuinconces", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 22){
			if (PlayerPrefs.GetInt("Capc") == 0){
				PlayerPrefs.SetInt("Capc", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 25){
			if (PlayerPrefs.GetInt("Hangars") == 0){
				PlayerPrefs.SetInt("Hangars", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
	}
	if (PlayerPrefs.GetInt("Difficulty") == 2){
		if (PlayerPrefs.GetInt("Tickartes") >= 10){
			if (PlayerPrefs.GetInt("StadeChabanDelmas") == 0){
				PlayerPrefs.SetInt("StadeChabanDelmas", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 13){
			if (PlayerPrefs.GetInt("HotelDeRegion") == 0){
				PlayerPrefs.SetInt("HotelDeRegion", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 15){
			if (PlayerPrefs.GetInt("PalaisDeJustice") == 0){
				PlayerPrefs.SetInt("PalaisDeJustice", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 16){
			if (PlayerPrefs.GetInt("HoteDeVille") == 0){
				PlayerPrefs.SetInt("HoteDeVille", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 17){
			if (PlayerPrefs.GetInt("SainteCatherine") == 0){
				PlayerPrefs.SetInt("SainteCatherine", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
		if (PlayerPrefs.GetInt("Tickartes") >= 19){
			if (PlayerPrefs.GetInt("PorteDeBourgogne") == 0){
				PlayerPrefs.SetInt("PorteDeBourgogne", 1);
				CheckRecoltables("Touriste", 8);
				CheckRecoltables("Expert Touriste", 16);
			}
		}
	}
	CheckBordelais();
}