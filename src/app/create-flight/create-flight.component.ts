import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  flight: Flight = new Flight();
  submitted = false;
  froms = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Mumbai' ,'Bangalore','Chennai','Karachi','Lahore','Peshawar']
  tos = ["London" ,"New York","Oman","Paris", "Capetown"]
  arrivalHasError = false;
  destinationHasError = false;

  constructor(private flightService: FlightService,

    private router: Router) { }

  ngOnInit() {
  }

  newFlight(): void {
    this.submitted = false;
    this.flight = new Flight();
  }

  save() {
    this.flightService
    .createflight(this.flight).subscribe(data => {
      console.log(data)
      this.flight = new Flight();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  validateDestination(value: string){
    if(value == "default"){
      this.destinationHasError = true;
    }
    else{
      this.destinationHasError = false;
    }
  }

  validateArrival(value: string){
    if(value == "default"){
      this.arrivalHasError = true;
    }
    else{
      this.arrivalHasError = false;
    }
  }
  gotoList() {
    this.router.navigate(['/flights']);
  }
}
