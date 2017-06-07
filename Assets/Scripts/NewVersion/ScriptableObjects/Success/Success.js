#pragma strict

import UnityEngine.UI;

@script CreateAssetMenu (fileName ="Success_", menuName = "New Success")

class Success extends ScriptableObject {
	
	@Header("Infos sur le succès")
	var successName : String;
	var successDesc : String;

	@Header("Objectifs")
	var nbCroissants : int = 0;
	var nbCaneles : int = 0;
	var nbMacarons : int = 0;
	var nbSandwichs : int = 0;
	var nbRaisins : int = 0;
}