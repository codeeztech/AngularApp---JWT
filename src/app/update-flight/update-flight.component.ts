import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {

  id: number;
  flight: Flight;
  submitted = false;
  froms = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Mumbai' ,'Bangalore','Chennai','Karachi','Lahore','Peshawar']
  tos = ["London" ,"New York","Oman","Paris", "Capetown"]
  arrivalHasError = false;
  destinationHasError = false;

  constructor(private route: ActivatedRoute,private router: Router,
    private flightService: FlightService) { }

  ngOnInit() {
    this.flight = new Flight();

    this.id = this.route.snapshot.params['id'];
    
    this.flightService.getflight(this.id)
      .subscribe(data => {
        console.log(data)
        this.flight = data[0];
      }, error => console.log(error));
  }

  updateFlight() {
    this.flightService.updateflight(this.id, this.flight)
      .subscribe(data => {
        console.log(data);
        this.flight = new Flight();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateFlight();    
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
