import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component{
 componentDidMount(){
    console.log('Inside componentDidMount')
  window.gapi.load('client:auth2', () => {
   window.gapi.client.init({
      clientId :'1021900157986-evipa7nimlmligrtqgekljoi1nfao6tk.apps.googleusercontent.com',
      scope : 'email'
   }).then(() => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.onAuthChange(this.auth.isSignedIn.get());
    this.auth.isSignedIn.listen(this.onAuthChange);
   });
  });
 }

 onAuthChange = isSignedIn => {
    console.log('Inside onAuthChange'+ isSignedIn)
    if(isSignedIn){
       this.props.signIn(this.auth.currentUser.get().getId());
    }
    else{
       console.log('Inside signOut Start')
       this.props.signOut();
    }
 };

 onSignOutClicked = () => {
    console.log('Inside onSignOutClicked')
  this.auth.signOut();
 }

 onSignInClicked = () => {
    console.log('Inside onSignInClicked');
  this.auth.signIn();
 }

 renderlist(){
       console.log('Inside renderlist');
  if(this.props.isSignedIn === null){
   return null;
  }
  else if(this.props.isSignedIn){
   return (
    <button onClick={this.onSignOutClicked} className="ui red google button">
     <i className="google icon"/>
     SignOut
    </button>
   )
   }
   else{
    return (
    <button onClick={this.onSignInClicked} className="ui green google button">
     <i className="google icon"/>
     SignIn with Google
    </button>
   )
   }
  }

 render(){
    console.log('Inside render');
  return(
  <div>{this.renderlist()}</div>
  );
 };
}

const mapStateToProps = state =>{
   console.log('Inside mapStateToProps')
   console.log('Inside mapStateToPropsValueOf State'+ state.auth.isSignedIn);
   return {isSignedIn : state.auth.isSignedIn}
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);