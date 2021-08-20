import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyC0yrmBhp7RL-pRcVufAno8w8TIBQxS2i4",
  authDomain: "hotel-management-d80be.firebaseapp.com"
})


class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",  
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <div>
              You have already booked a room
            </div>
            <h3>Your Room Details are as follows:</h3>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
          <span>
            <h4>Hostel Allocation</h4>
            <p>Please Sign in:</p>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </span>
        )}
      </div>
    )
  }
}

export default App