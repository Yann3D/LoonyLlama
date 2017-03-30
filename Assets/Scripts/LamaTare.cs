using UnityEngine;
using System.Collections;

public class LamaTare : MonoBehaviour {

	public GameObject	FiringPlatform			= null;
	public float		MinFiringPlatformHeight = 0.0f;
	public float		MaxFiringPlatformHeight = 6.0f;

	// Use this for initialization
	void Awake ()
	{
		SetRandomFiringPlatformHeight();
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}

	public void SetRandomFiringPlatformHeight()
	{
		float fRandomFiringPlatfomrHeight = Random.Range(MinFiringPlatformHeight, MaxFiringPlatformHeight);
		Vector3 vLocalPos = FiringPlatform.transform.localPosition;
		vLocalPos.y = fRandomFiringPlatfomrHeight;
		FiringPlatform.transform.localPosition = vLocalPos;
	}

}
