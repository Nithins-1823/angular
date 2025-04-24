import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Auth, User, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // get the user from the route ( which is injected by the UserResolver )
  user: User = this.ActivatedRoute.snapshot.data['user'];

  constructor() {
    console.log(`Logged in as ${this.user.displayName}`, this.user);
  }

  // SEND LOCATION METHOD
   sendLocation() :void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accu = position.coords.accuracy;
        console.log(Latitude is ${latitude},\nLongitude is ${longitude}\nAccuracy is ${accu});
      },
      (error) => {
        console.error("Something went wrong ", error.message);
      }
    );
  } else {
    console.log("Geolocation is not enabled for this browser");
  }
}


  // SIGN OUT METHOD

  auth = inject(Auth);
  signOut() {
    signOut(this.auth)
      .then(() => {
        console.log(`${this.user.displayName} has signed out`);
        this.router.navigate(['auth/sign-in']);
      })
      .catch((error) => {
        console.log('Sign-out failed', error);
      });
  }
}
