import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    // Initial setup for accordion
    this.initAccordion();
  }

  ngAfterViewInit() {
    // Set active class based on current route after view initialization
    this.initActiveClass();
  }

  private initAccordion() {
    const accordion = $(this.el.nativeElement.querySelector("#accordian"));
    const tabsVerticalInner = accordion;
    
    // Set initial styles for selector-active based on the active item
    this.setSelectorActiveStyles();

    accordion.on("click", "li", (e: any) => {
      // Remove active class from all items and add it to the clicked item
      accordion.find('ul li').removeClass("active");
      $(e.currentTarget).addClass('active');

      // Update styles for selector-active based on the clicked item
      this.setSelectorActiveStyles();
    });

    accordion.on("click", "li.has-submenu > a", (e: any) => {
      e.preventDefault(); // Prevent the anchor link from triggering navigation
  
      const $submenu = $(e.currentTarget).siblings('.submenu');
  
      // Toggle the submenu visibility
      $submenu.slideToggle();
  
      // Toggle the active state
      $(e.currentTarget).parent().toggleClass('active');
    });
  }

  private setSelectorActiveStyles() {
    const activeItemVerticalInner = $(this.el.nativeElement.querySelector('#accordian .active'));
    const activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
    const activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();
    const itemPosVerticalTop = activeItemVerticalInner.position();
    const itemPosVerticalLeft = activeItemVerticalInner.position();
    
    this.renderer.setStyle(this.el.nativeElement.querySelector(".selector-active"), "top", `${itemPosVerticalTop.top}px`);
    this.renderer.setStyle(this.el.nativeElement.querySelector(".selector-active"), "left", `${itemPosVerticalLeft.left}px`);
    this.renderer.setStyle(this.el.nativeElement.querySelector(".selector-active"), "height", `${activeWidthVerticalHeight}px`);
    this.renderer.setStyle(this.el.nativeElement.querySelector(".selector-active"), "width", `${activeWidthVerticalWidth}px`);
  }

  private initActiveClass() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      // Get the path of the current route
      const path = this.activatedRoute.snapshot.firstChild?.url[0]?.path || 'index.html';

      // Find the corresponding link in the accordion and add active class
      const target = $(`#accordian ul li a[href="${path}"]`);
      target.parent().addClass('active');
      
      // Update styles for selector-active based on the active item
      this.setSelectorActiveStyles();
    });
  }
}
