import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { CommonService } from '../../service/common.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(public service:CommonService,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  logout():void{
    this.service.logout();
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

 
}
