import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ContentService } from '../../_services/content.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Output() isDone = new EventEmitter<any>();

  @ViewChild('end') endRef: ElementRef;

  public visible: boolean = false;
  private instructions: string[];
  private ingredients: string[];

  constructor(private content: ContentService) {
    this.content.getRecipe().subscribe(data => {
      this.visible =true;
      this.ingredients = data.ingredients;
      this.instructions = data.directions.split('.');
      this.timer();
    }, (err) => {
      //already visited
      this.isDone.emit(true);
    });
  }

  //Timer for banning visitor
  timer(){
    if (this.visible) {
      let endVal = -4600;// hardcoded approxed value :/
      const timer = interval(4000).pipe().subscribe(() => {
        let val = this.endRef.nativeElement.offsetParent.offsetTop;
        if (val < endVal) {
          //Banning visitor
          this.content.banVisitor().subscribe((data) => {
            //Notfying parent to hide elements
            this.isDone.emit(true);
            timer.unsubscribe();
            // console.log(data, "banned")
          })

        }
        console.log("interval")
      });
    }else{
      console.log("not in interval")
    }
  }

  ngOnInit() {
  }

}
