import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Footer } from "./Components/footer/footer";
import { Navbar } from "./Components/navbar/navbar";

@Component({
  imports: [RouterOutlet, Header, Footer, Navbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Rich-Power');
}
