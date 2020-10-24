import { Flight } from '../flight';
import { Component, OnInit, Input } from '@angular/core';
import { FlightService } from '../flight.service';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  id: number;
  flight: Flight;

  constructor(private route: ActivatedRoute,private router: Router,
    private flightService: FlightService) { }

  ngOnInit() {
    this.flight = new Flight();

    this.id = this.route.snapshot.params['id'];

    console.log("flight detail id: "+ this.id);
    
    this.flightService.getflight(this.id)
      .subscribe(data => {
        //console.log(data)
        this.flight = data[0];
        console.log(this.flight)
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['flights']);
  }

}
