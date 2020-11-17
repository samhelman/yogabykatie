import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public selectedPage: string = (this.getPageName()) ? this.getPageName() : 'home' ;

  constructor() { }

  ngOnInit(): void {
    this.titleAnimation()
  }

  getPageName() {
    return window.location.pathname.substring(1);
  }

  //set the selectedPage attribute to the given page
  select(page: string) {
    this.selectedPage = page;
    if (this.selectedPage != 'home') { this.hideTitle() }
    setTimeout(
      () => {
        this.titleAnimation();
      },
      500
    );
    return;
  }

  titleAnimation() {
    const width = screen.width;
    const spacer = document.getElementById("spacer");
    if (width >= 500) {
      spacer.style.height = (this.selectedPage == 'home') ? '20vh' : '0px';
    } else {
      spacer.style.height = '0px'
    }

    this.hideTitle()

    const links = document.getElementById("links")
    const height = links.clientHeight.toString()

    const navContainer = document.getElementById("nav-container")
    navContainer.style.height = (this.selectedPage == 'home') ? '100%' : `${height}px`;

    const navBar = document.getElementById("nav-bar");
    navBar.style.height = (this.selectedPage == 'home') ? 'auto' : `${height}px`;
  }

  hideTitle() {
    const title = document.getElementById("title");
    title.style.opacity = (this.selectedPage == 'home') ? '1' : '0';
  }
}
