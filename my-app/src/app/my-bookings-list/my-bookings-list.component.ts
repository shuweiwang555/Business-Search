import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bookings-list',
  templateUrl: './my-bookings-list.component.html',
  styleUrls: ['./my-bookings-list.component.css']
})
export class MyBookingsListComponent implements OnInit {

  allReservation: any;
  deleteTemp: any;
  listShow = false;
  nolistShow = false;

  constructor() { }

  ngOnInit(): void {
    this.listShow = false;
    this.nolistShow = false;

    // console.log(localStorage['allWsw'].length);
    if (localStorage.hasOwnProperty('allWsw') && JSON.parse(localStorage['allWsw']).length > 0) {
      this.listShow = true;
      this.allReservation = JSON.parse(localStorage['allWsw']);
      console.log(this.allReservation);
    } else {
      this.nolistShow = true;
    }
  }
  deleteReserve(i: any) {
    this.deleteTemp = JSON.parse(localStorage['allWsw']);
    this.deleteTemp.splice(i, 1);
    localStorage.setItem("allWsw", JSON.stringify(this.deleteTemp));
    this.allReservation = JSON.parse(localStorage['allWsw']);
    // console.log(this.allReservation);
    if (this.allReservation == '') {
      this.listShow = false;
      this.nolistShow = true;
    }
    window.alert("Reservation cancelled!");
  }

}
