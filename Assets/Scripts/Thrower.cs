using UnityEngine;
using System.Collections;

public class Thrower : MonoBehaviour
{
	// Orientation
	public		float	MinMouseDistanceFromThrower		= 0.0f;
	public		float	MinThrowerAngleFromUp			= 20.0f;
	public		float	MaxThrowerAngleFromUp			= 90.0f;

	private		bool	m_bCanUpdateOrientation			= true;
	private		bool	allerRetourEnergie				= false;
	private		bool	gaugeDown						= false;
	private		bool	ejected							= false;


	// Force
	public		tk2dUIScrollbar		ForceScrollBar			= null;
	public		float				MaxForceValue			= 5.0f;

	private		float				m_fMinForceGaugeDist	= 0.0f;
	private		float				m_fMaxForceGaugeDist	= 0.0f;


	//
	public		GameObject			Fuse				= null;
	public		GameObject			fumeeCanon			= null;
	public 		GameObject			LamaRig				= null;
	//
	private		tk2dSpriteAnimator	m_oFuseAnimator		= null;
	private		int					m_iFuseAnimNbFrames	= 0;

	public		GameObject			Projectile					= null;
	public		GameObject			casque						= null;
	public		GameObject			canonLamaSpot				= null;


	void Start ()
	{
		Projectile.transform.parent = canonLamaSpot.transform;
		Projectile.transform.position = canonLamaSpot.transform.position;
		m_oFuseAnimator = Fuse.GetComponent<tk2dSpriteAnimator>();
		m_iFuseAnimNbFrames = m_oFuseAnimator.DefaultClip.frames.Length;
	}

	void Update ()
	{
		if (!ejected){
			if (Input.GetMouseButtonDown(0)){
				LightFuse();
				allerRetourEnergie = false;
				m_bCanUpdateOrientation = false;
				ejected = true;
			}
		}
		
		if (ForceScrollBar.Value >= 1){
			gaugeDown = true;
		}
		if (ForceScrollBar.Value <= 0){
			gaugeDown = false;
		}
		if (allerRetourEnergie){
			if (gaugeDown){
				ForceScrollBar.Value -=1.3f * Time.deltaTime;
			}
			if (!gaugeDown){
				ForceScrollBar.Value +=1.3f * Time.deltaTime;
			}
		}
		
		if (m_bCanUpdateOrientation)
		{
			allerRetourEnergie = true;
			Vector3 vMousePos = Input.mousePosition;
			Vector3 vWorldMousePos = Camera.main.ScreenToWorldPoint(vMousePos);
			float fControlToThrowerDist = UpdateOrientationFromControlPosition(vWorldMousePos);
		}
		if (ejected){
			ejected = false;
			m_bCanUpdateOrientation = false;
			if (m_oFuseAnimator.IsPlaying(m_oFuseAnimator.DefaultClip) && m_oFuseAnimator.CurrentFrame == m_iFuseAnimNbFrames - 1)
			{
				m_oFuseAnimator.StopAndResetFrame();
			}
			Fire();
		}
		
		if (fumeeCanon.GetComponent<Animation>().isPlaying &&  fumeeCanon.GetComponent<Animation>()["FumeeCanon"].length - fumeeCanon.GetComponent<Animation>()["FumeeCanon"].time <= 0.08){
			fumeeCanon.SetActive(false);
		}	
	}


	private float	UpdateOrientationFromControlPosition(Vector3 vControlWorldPosition)
	{
		vControlWorldPosition.z = 0.0f;

		Vector3 vThrowerPos = this.transform.position;
		vThrowerPos.z = 0.0f;

		Vector3 vWorldDir = vControlWorldPosition - vThrowerPos;
		Quaternion qRotation = Quaternion.FromToRotation(Vector3.up, vWorldDir);

		float fOrientationAngle = 0.0f;
		Vector3 vOrientationAxis = Vector3.zero;
		qRotation.ToAngleAxis(out fOrientationAngle, out vOrientationAxis);

		float fDist = vWorldDir.magnitude;
		if (vOrientationAxis == Vector3.back && fOrientationAngle > MinThrowerAngleFromUp && fOrientationAngle < MaxThrowerAngleFromUp)
		{
			if (fDist >= MinMouseDistanceFromThrower)
			{
				this.transform.rotation = qRotation;
				Projectile.transform.rotation = qRotation;
			}
		}
		
		return fDist;
	}

	private void	UpdateForceFromControlToThrowerDist(float _fControlToThrowerDist)
	{
		float fForceValue = 0.0f;
		if (_fControlToThrowerDist <= m_fMinForceGaugeDist)
			fForceValue = 0.0f;
		else if (_fControlToThrowerDist >= m_fMaxForceGaugeDist)
			fForceValue = 1.0f;
		else
			fForceValue = (_fControlToThrowerDist - m_fMinForceGaugeDist) / (m_fMaxForceGaugeDist - m_fMinForceGaugeDist);
		ForceScrollBar.Value = fForceValue;
	}


	private void	LightFuse()
	{
		m_oFuseAnimator.Play();
	}

	private void Fire()
	{
		Projectile.transform.parent = null;
		float fForce = ForceScrollBar.Value;
		fForce *= MaxForceValue;

		Vector3 vFireDir = this.transform.TransformDirection(Vector3.up);

		Projectile.GetComponent<Rigidbody>().useGravity = true;
		Projectile.GetComponent<Rigidbody>().isKinematic = false;
		Projectile.transform.parent = null;
		Projectile.GetComponent<Rigidbody>().AddForce(fForce * vFireDir);
		
		fumeeCanon.GetComponent<Animation>().Play();
		
		GetComponent<AudioSource>().Play();
		Projectile.GetComponent<AudioSource>().Play();
		LamaRig.GetComponent<Animation>().Play("Ejection");
		this.enabled = false;
	}
}
