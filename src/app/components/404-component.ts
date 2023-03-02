import { Component } from "@angular/core";

@Component({
    selector: 'page-not-found',
    template: `<div class='text-center'>
                  <h1>404 Error</h1>
                  <h2>Page Not Found</h2>
                </div>`,
  })
  export class PageNotFoundComponent {
    constructor() {}
  }