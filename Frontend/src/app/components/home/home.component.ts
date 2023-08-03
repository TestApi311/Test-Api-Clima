import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/app/models/code-country';
import { time_place } from 'src/app/models/time-place';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  url_Api: string = 'https://api.openweathermap.org/data/2.5/weather?appid';
  key_Api: string = 'caffae02abcf570a374727be813eeefd';

  place: string = 'armenia';
  country: string = 'CO';
  fecha: any;
  hora: any;
  data: any = '';
  weather: string = '';
  // weatherIcon: string = "";
  weatherIconUrl: string = '';
  backgroundColor: string = '';
  // temp: number = 0;
  // tempCelsius: string = "";
  clock: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  countries: any = countries;
  currentTime: any;
  form: FormGroup;
  time: any = time_place;
  area: string = '';

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTime(this.country);

    this.form = this.fb.group({
      place: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.client
      .getRequest(
        `${this.url_Api}=${this.key_Api}&q=${this.place},${this.country}&lang=es`
      )
      .subscribe(
        {
          next: (response: any) => {
            // console.log(response);
            this.data = response;
            // console.log(response);

            this.checkWeather(
              response.weather[0].main,
              response.weather[0].icon
            );
          },
          error: (error: any) => {
            console.log(error);
          },
        }
        /*
      ((response: any) => {
        // console.log(response);
        this.data = response;

        this.checkWeather(response.weather[0].main, response.weather[0].icon);


      }),
      ((error: any) => {
        console.log(error);

      })
      */
      );
  }

  onSubmit() {
    if (this.form.valid) {
      // console.log("Hola");
      // console.log(this.place);
      // console.log(this.country);

      this.getTime(this.form.value.country);
      // console.log('Onsubmit', this.countries[0].code);

      this.client
        .getRequest(
          `${this.url_Api}=${this.key_Api}&q=${this.form.value.place},${this.form.value.country}&lang=es`
        )
        .subscribe({
          next: (response: any) => {
            // console.log(response);
            this.data = response;
            this.checkWeather(
              response.weather[0].main,
              response.weather[0].icon
            );
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡La cuidad ingresada no es valida!',
            });
          },
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: '¡Por favor complete todos los campos!',
      });
    }
  }

  checkWeather = (weather: string, weatherIcon: string) => {
    // console.log("a", weatherIcon);
    if (weather === 'Thunderstorm') {
      // console.log(1);
      this.weather = 'Tormenta eléctrica';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Drizzle') {
      // console.log(2);
      this.weather = 'Llovizna';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Rain') {
      // console.log(3);
      this.weather = 'Lluvia';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Snow') {
      // console.log(4);
      this.weather = 'Nieve';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Mist') {
      // console.log(5);
      this.weather = 'Niebla';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Smoke') {
      // console.log(6);
      this.weather = 'Humo';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Haze') {
      // console.log(7);
      this.weather = 'Neblina';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Dust') {
      // console.log(8);
      this.weather = 'Polvo en suspensión';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Fog') {
      // console.log(9);
      this.weather = 'Niebla densa';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Sand') {
      // console.log(10);
      this.weather = 'Arena en suspensión';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Ash') {
      // console.log(11);
      this.weather = 'Ceniza en suspensión';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Squall') {
      // console.log(12);
      this.weather = 'Ráfaga';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Tornado') {
      // console.log(13);
      this.weather = 'Tornado';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Clear') {
      // console.log(14);
      this.weather = 'Cielo despejado';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    } else if (weather === 'Clouds') {
      // console.log(15);
      this.weather = 'Nubes';
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    }
  };

  // enviarDatos(area: string, place: string) {
  //   console.log(area);
  //   console.log(place);
  // }

  getTime(code: string) {
    // console.log(this.place == 'armenia');
    // console.log(code);

    this.time.forEach((e) => {
      if (code === e.country) {
        // console.log(code, 'code');
        // console.log(e.country, 'country');

        this.area = e.area;
        this.place = e.place;
      }
    });

    setInterval(() => {
      // if (this.place == 'armenia') {
      //   this.clock.next(new Date());
      //   this.currentTime = this.clock.value;
      // } else {
      this.client.getInfo(this.area, this.place).subscribe({
        next: (data) => {
          // console.log(data.datetime);
          this.currentTime = '';
          this.hora = data.datetime.slice(11, 19);
          this.fecha = data.datetime.slice(0, 10);
        },
      });
      // }
    }, 1000);
  }
}
