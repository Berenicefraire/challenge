import { Component, OnInit } from '@angular/core';
import { CharsService } from '../shared/services/news.service';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  chars: any[] = [];
  isLoading:boolean = false;
  displayMobileMenu: boolean = false;

  articleSelected: any;
  
  // Handler modal
  showModal:boolean = false;

  constructor(private charsService: CharsService) { }

  ngOnInit(): void { 
    this.getChars(8);
  }

  getChars(limit?: number) {
    this.isLoading = true;
    this.charsService.getCharList(8).subscribe(data => {
      this.chars = data;
      this.isLoading = false;
    });
  }

  readArticle(article: any) {
    this.articleSelected = article;
    this.showModal = true;
  }

  handlerModal(e:boolean) {
    this.showModal = e;
  }

  showMenu($event: any) {
    $event.preventDefault();
    this.displayMobileMenu = true;
    console.log('show');
  }

  close() {
    this.displayMobileMenu = false;
    console.log('hide');
  }

}
