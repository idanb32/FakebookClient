
import FacebookLogin from 'react-facebook-login';

const faceBookId = '980121512645782'

const FacebookBtn =(props)=>{

    const responseFacebook =(res)=>{
        console.log(res);
        let facebookObj = {
            "email": res.email,
            "userDisplay": res.name,
            "facebookId": res.id,
            "imgurl": res.picture.data.url
        }
        props.SignUpWithFacebook(facebookObj);
    }
    
    return (<div className='FacebookBtn'>
        <FacebookLogin 
            appId={faceBookId}
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
        />
    </div>)
}

export default FacebookBtn;