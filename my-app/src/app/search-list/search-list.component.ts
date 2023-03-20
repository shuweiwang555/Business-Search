import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { I } from 'node_modules_bk/@angular/cdk/keycodes';
import { ViewportScroller } from "@angular/common";
import { Router } from "@angular/router";
import { popperGenerator } from 'node_modules_bk/@popperjs/core';
import { MatTabGroup, MatTabHeader } from '@angular/material/tabs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
  // animations: [
  //   trigger('animImageSlider', [
  //     transition(':increment', right),
  //     transition(':decrement', left),
  //   ]),
  // ],
})

export class SearchListComponent implements OnInit, AfterViewInit {

  searchTextCtrl = new FormControl('', [Validators.required]);
  filteredrow: any;
  filteredText: any;
  filteredReviews: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedText: any = "";
  location: any = "";
  distance: any = "";
  category = "default";
  hahahahah = false;

  // checkbox: any;
  isDisabled: boolean = false;
  checkbox: boolean = false;
  laloresult: any;
  firstPagedata: any;
  fpdataRow: any;
  haha = false;
  hahaha = false;
  noooData = false;
  nooimage = false;
  statusColor = false;
  statuss: any;
  moreInfo: any;
  reviewsInfo: any;

  name: any;
  loca: any;
  phone: any;
  price: any;
  cate: any;
  url: any;
  images: any;

  counterrr: number = 0;
  disdis = false;

  autoSlideMoving: any;
  sliderAnimationSpeed: any;

  selectedTab = 0;

  mapOptionsCenter: any = { lat: 30, lng: 121 };
  mapOptionsZoom = 14;
  marker = {
    position: { lat: 30, lng: 121 },
  }

  submitted = false;
  reserveForm: FormGroup;

  localStorageitems: Array<any> = [];
  email: any;
  date: any;
  hour: any;
  min: any;
  statusColor2 = true;

  @ViewChild('moreInfoTab', { static: false }) tabs: MatTabGroup;
  @ViewChild("myElem") myElementToScroll: ElementRef;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private scroller: ViewportScroller,
    private router: Router
  ) { }

  closeResult = "";
  openModal(content: any) {
    this.submitted = false;
    let reserveButtonword = document.getElementById('ree') as HTMLInputElement | null;
    if (this.localStorageitems.find(x => x.business_name == this.name) && reserveButtonword != null) {
      reserveButtonword.textContent = 'Reserve now';
      this.statusColor2 = true;
      const indesofRese = this.localStorageitems.findIndex(x => x.business_name == this.name);
      this.localStorageitems.splice(indesofRese, 1);
      localStorage.setItem("allWsw", JSON.stringify(this.localStorageitems));
      window.alert("Reservation cancelled!");
      return;
    }

    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        console.log(result);
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log('Dismissed', this.getDismissReason(reason));
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSelected() {
    // console.log(this.selectedText);
    this.selectedText = this.selectedText;
  }

  displayWith(value: any) {
    return value;
  }

  clearSelection() {
    this.selectedText = "";
    this.filteredText = [];
  }

  ngOnInit() {
    this.reserveForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        date: ['', Validators.required],
        hour: ['', Validators.required],
        min: ['', Validators.required],
      }
    );
    if (localStorage) {
      // localStorage.clear();
      const oldData = localStorage.getItem("allWsw");
      if (oldData != null) {
        this.localStorageitems = JSON.parse(oldData);
      }
    }
    this.searchTextCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredText = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(`https://csci571-hw8-wsw.wl.r.appspot.com/api/yelp/autocom?text=${value}`)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data.categories.map((x: any) => x.title) == undefined && data.terms.map((x: any) => x.text) == undefined) {
          this.errorMsg = data['Error'];
          this.filteredText = [];
        } else {
          this.errorMsg = "";
          // const a = data.categories.map((x: any) => x.title);
          // const b = ;
          // const c = a.concat(b);
          this.filteredText = data.categories.map((x: any) => x.title).concat(data.terms.map((x: any) => x.text));
        }
        // console.log(this.filteredText);
      });



  }

  noData = () => {
    this.hahaha = false;
    this.haha = false;
    this.noooData = true;
  }

  getreserveResult = async () => {
    this.submitted = true;
    if (this.reserveForm.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.reserveForm.value, null, 2));
    // console.log(this.localStorageitems);

    let reserveButtonword = document.getElementById('ree') as HTMLInputElement | null;

    if (reserveButtonword != null) {
      reserveButtonword.textContent = 'Cancel Reservation';
      this.statusColor2 = false;
    }

    if (localStorage) {
      if (true) {//this.localStorageitems.find(x=>x.name)
        var key = this.name;
        let oneRes = { business_name: this.name, date_time: this.reserveForm.value.date, time_hm: this.reserveForm.value.hour + ":" + this.reserveForm.value.min, e_mail: this.reserveForm.value.email };
        this.localStorageitems.push(oneRes);
        // }
        localStorage.setItem("allWsw", JSON.stringify(this.localStorageitems));
        // alert("Hi, " + localStorage.getItem("allWsw"));
      } else {
        alert("Sorry, your browser do not support local storage.");
      }

      window.alert("Reservation created!");
      this.submitted = false;
      this.reserveForm.reset();
      document?.getElementById("closeModal")?.click();
      // console.log(this.reserveForm.controls);
    }
  }
  get f() { return this.reserveForm.controls; }

  getResult = async () => {
    let form = document.getElementById("wsw") as HTMLInputElement | null;
    // console.log(form);
    if (form != null) {
      let x = form.reportValidity();
      if (!x) return;
    }

    if (this.checkbox == true) {
      this.laloresult = await this.getIpInfoResult();
    } else {
      this.laloresult = await this.getGoogleInfoResult();
      console.log(this.laloresult);
      if (this.laloresult["loca"] == 'false') {
        this.noData();
        return;
      }
    }
    console.log(this.laloresult);
    this.firstPagedata = await this.getYelpResult();
    // console.log(this.firstPagedata);
    if (!(this.firstPagedata.hasOwnProperty('businesses')) || this.firstPagedata.businesses.length == 0) {
      this.noData();
      return;
    }
    this.showResult();
  }

  showResult = () => {
    this.selectedTab = 0;
    this.noooData = false;
    this.hahaha = false;
    let i = 1;
    this.filteredrow = this.firstPagedata['businesses'];
    if (this.filteredrow.length > 10) {
      this.filteredrow = this.filteredrow.slice(0, 10);
    }
    this.haha = true;
    // console.log(this.filteredrow);
  }

  reviewLoad = async (id: any) => {
    let response;
    try {
      response = await fetch(`https://csci571-hw8-wsw.wl.r.appspot.com/api/yelp/details?id=${id}/reviews`);
    }
    catch (e) {
      console.log(e);
      response = await fetch(`http://localhost:4200/api/yelp/details?id=${id}/reviews`);
    }
    this.reviewsInfo = await response.json();

    this.filteredReviews = this.reviewsInfo.reviews;
    if (this.filteredReviews.length > 3) {
      this.filteredReviews = this.filteredReviews.slice(0, 3);
    }
  }

  showMoreResult = async (f: any) => {
    // this.submitted = false;
    let id = this.filteredrow[f].id;
    this.images = [];
    this.hahaha = false;
    this.haha = false;

    let response;
    try {
      response = await fetch(`https://csci571-hw8-wsw.wl.r.appspot.com/api/yelp/details?id=${id}`);
    }
    catch (e) {
      console.log(e);
      response = await fetch(`http://localhost:4200/api/yelp/details?id=${id}`);
    }
    this.moreInfo = await response.json();
    this.reviewLoad(id);

    this.name = this.moreInfo.name;
    this.loca = this.moreInfo.location.display_address;
    if (this.moreInfo.location.display_address == "" || !(this.moreInfo.hasOwnProperty('location'))) {
      this.loca = "N/A";
    } else this.loca = this.moreInfo.location.display_address;

    if (this.moreInfo.phone == "" || !(this.moreInfo.hasOwnProperty('phone'))) {
      this.phone = "N/A";
    } else this.phone = this.moreInfo.phone;

    let reserveButtonword = document.getElementById('ree') as HTMLInputElement | null;
    // console.log("hellobaba", this.localStorageitems.find(x => x.business_name == this.name));
    // console.log(this.name);
    // console.log(this.localStorageitems.find(x => x.business_name == this.name));
    if (this.localStorageitems.find(x => x.business_name == this.name) && reserveButtonword != null) {
      // if (word != null) {
      // console.log("fucuuuu");
      reserveButtonword.textContent = 'Cancel Reservation';
      this.statusColor2 = false;
    } else if (reserveButtonword != null) {
      reserveButtonword.textContent = 'Reserve now';
      this.statusColor2 = true;
    }

    this.images = this.moreInfo.photos; // TODO
    if (this.images.length > 0) this.nooimage = true;
    // console.log(this.nooimage);

    if (this.moreInfo.price == "" || !(this.moreInfo.hasOwnProperty('price'))) {
      this.price = "N/A";
    } else this.price = this.moreInfo.price;


    if (this.moreInfo.url == "" || !(this.moreInfo.hasOwnProperty('url'))) {
      this.url = "N/A";
    } else this.url = this.moreInfo.url;

    this.cate = this.moreInfo.categories.map((m: any) => m.title.split("_").map((n: any) => n[0].toUpperCase() + n.slice(1)).join("&nbsp")).join(' | ');
    try {
      if (!this.moreInfo.hours[0].is_open_now || this.moreInfo.is_closed) {
        this.statuss = "Closed";
      } else {
        this.statusColor = true;
        this.statuss = "Open Now";
      }
    } catch (e) {
      this.statuss = "No status";
    }

    const myModal = document.getElementById('exampleModal')
    const myInput = document.getElementById('myInput')

    if (myModal != null && myInput != null) {
      myModal.addEventListener('shown.bs.modal', () => {
        myInput.focus()
      })
    }

    // console.log(this.selectedTab);
    this.selectedTab = 0;
    this.tabs.realignInkBar();

    let temp = { lat: this.moreInfo.coordinates.latitude, lng: this.moreInfo.coordinates.longitude };
    if (this.mapOptionsCenter != null) {
      this.mapOptionsCenter = temp;
    }
    this.marker.position = temp;

    this.hahaha = true;
    // let scrollTrig = document.getElementById("hoko") as HTMLElement | null;
    // if (scrollTrig != null) {
    //   scrollTrig.scrollIntoView({
    //     behavior: 'smooth', block: "end",
    //     inline: "nearest"
    //   });
    //   console.log(scrollTrig);
    // }

    setTimeout(() => { this.scroller.scrollToAnchor("hoko"); }, 10);
    // this.scroller.scrollToAnchor("div3");
    // this.scroller.scrollToAnchor("hoko");
    // console.log(this.scroller);
    // this.scroller.scrollToPosition([188, 288]);
    // this.router.navigate([], { fragment: "hoko" });
    // this.myElementToScroll.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });

  }
  // scrollTimeout() {

  // }
  ngAfterViewInit() {

  }

  getIpInfoResult = async () => {
    let result;
    try {
      const response = await fetch('https://csci571-hw8-wsw.wl.r.appspot.com/api/loca');
      result = await response.json();
    }
    catch (e) {
      console.log(e);
      result = { "city": "Los Angeles", "country": "US", "ip": "2600:1700:7cc4:e050:a43f:d3e0:af80:fcd0", "loc": "34.0762,-118.3029", "org": "AS7018 AT&T Services, Inc.", "postal": "90004", "region": "California", "timezone": "America/Los_Angeles" };
      console.log(result);
    }
    let a = result["loc"].split(',');
    let result1: { [key: string]: number } = {};
    result1["lat"] = parseFloat(a[0]);
    result1["lng"] = parseFloat(a[1]);
    // console.log(result1);
    return result1;
  }

  getGoogleInfoResult = async () => {
    const location = this.location;
    let response;
    try {
      response = await fetch(`https://csci571-hw8-wsw.wl.r.appspot.com/api/goloca?location=${location}`);
    }
    catch (e) {
      console.log(e);
      response = await fetch(`http://localhost:4200/api/goloca?location=${location}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  }

  getYelpResult = async () => {
    let keyword = this.selectedText;
    // console.log(this.laloresult);
    let latit = this.laloresult['lat'];
    let longi = this.laloresult['lng'];
    let category = this.category;
    let dis = this.distance;
    if (dis == "") dis = 10;
    let response;
    try {
      response = await fetch(`https://csci571-hw8-wsw.wl.r.appspot.com/api/yelp?keyword=${keyword}&lat=${latit}&lon=${longi}&category=${category}&distance=${dis}`);
    }
    catch (e) {
      response = await fetch(`http://localhost:4200/api/yelp?keyword=${keyword}&lat=${latit}&lon=${longi}&category=${category}&distance=${dis}`);
    }
    return await response.json();
  }


  checkboxonChanged = (value: any) => {
    this.checkbox = !this.checkbox;
    if (this.checkbox == true) {
      this.location = ' ';
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  allClear() {
    this.noooData = false;
    this.haha = false;
    this.hahaha = false;
    this.location = '';
    this.selectedText = '';
    this.distance = '';
    this.category = "default";
    this.isDisabled = false;
    this.checkbox = false;
    this.selectedTab = 0;
  }

  backTolist() {
    this.hahaha = false;
    this.haha = true;
    this.counterrr = 0;//can not let photo back to the first one
    this.selectedTab = 0;
  }


  onReset() {
    this.submitted = false;
    this.reserveForm.reset();
  }

}

