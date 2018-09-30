import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var p5: any;

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.css']
})
export class GuitarComponent implements OnInit {

  @Output() isDone = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    let instance = new p5(this.sketch);

    //checking if the sketch is finished.
    let checker = setInterval(() => {
      if (!instance._loop) {
        this.emitEvent(this);
      }
    }, 200, instance);
  }

  //whole sketch
  private sketch(p: any) {
    var notes = [];
    var frets = [];

    //Class declarations
    class Fret {
      private x;
      private y;
      constructor(x) {
        this.x = x;
        this.y = window.innerHeight - 20;
      }
      display() {
        p.fill(51);
        p.rect(this.x, this.y, 5, 20, 20)
      }
    }
    class Note {
      private offset;
      private x;
      private width;
      private y;
      private height;
      private tempo;
      private fade;
      private displayer;
      private string;

      constructor(fret, string, timing) {
        //2.5 je offset zbog praga... debljina praga
        this.offset = 2.5;

        if (fret == -1) {
          //bare string
          console.log("bare")
          this.x = 0 + this.offset;
          this.width = frets[0].x;
        } else {
          //all frets
          let noteWidth = frets[fret + 1].x - frets[fret].x;
          this.x = frets[fret].x;
          this.width = noteWidth;
        }

        //x shows what fret it's on
        this.y = window.innerHeight - 20;
        this.height = 20;
        this.tempo = 2;
        this.fade = 100; //6
        //When to be displayed ms
        this.displayer = timing;
        this.string = string;
      }

      move() {
        if (this.displayer < 0) {
          this.y -= this.tempo;
          if (this.fade > 0) {
            this.fade -= 0.4;
          }
        }
        this.displayer -= 10;
      };

      display() {
        if (this.displayer < 0) {
          // stroke(51);
          if (this.string == 1) {
            p.fill(71, 14, 178, this.fade);
          }
          else if (this.string == 2) {
            p.fill(66, 134, 244, this.fade);
          }
          else if (this.string == 3) {
            p.fill(14, 178, 93, this.fade);
          }
          else if (this.string == 4) {
            p.fill(255, 247, 17, this.fade);
          }
          // else if (this.string == 5) {
          //     fill(234, 50, 4, this.fade);
          // }
          p.rect(this.x, this.y, this.width, this.height);
        }
      };
    }

    p.setup = () => {
      //Calculating fret locations
      let s = window.innerWidth * 1.92;
      let offsetD = (s / 2);
      var offset = (window.innerWidth - offsetD) / 2.5;
      // frets[0] = new Fret(20);
      for (let i = 0; i <= 13; i++) {
        let d = s - (s / (p.pow(2, (i / 12))))
        //Aligning with the right (-->) side of screen
        if (i == 0) {
          frets[i] = new Fret(offset + d * 2);
        } else {
          frets[i] = new Fret(offset + d + frets[0].x);
        }
      }

      p.createCanvas(window.innerWidth, window.innerHeight);
      p.fill(24)
      generate();
    };


    p.draw = () => {
      if (notes.length > 1) {
        cycle();
      } else {
        console.log('done?');
        p.remove();
      }
    }

    function cycle() {
      p.clear();
      // p.background(130);
      p.noStroke();

      fretboard();
      string();

      //Drawing notes
      for (let j = 0; j < notes.length; j++) {
        if (notes[j].y > -50) {
          notes[j].move();
          notes[j].display();
        } else {
          notes.splice(j, 1);
        }
      }
      //Drawing frets
      for (let i = 0; i < frets.length; i++) {
        frets[i].display();
      }
    }

    function fretboard() {
      //nut
      p.fill(255, 230, 188)
      p.rect(0, window.innerHeight - 23, frets[0].x, 23);

      //fretboard
      p.fill(61, 39, 1, 250)
      p.rect(frets[0].x, window.innerHeight - 15, window.innerWidth, 15);


      p.fill(250)
      // dots for frets 3, 5, 7, 9
      for (let i = 2; i < 10; i += 2) {
        let f_x = frets[i].x + (frets[i + 1].x - frets[i].x) / 2;
        p.ellipse(f_x + 3, window.innerHeight - 7.5, 4, 4);
      }
      //dot for fret 12
      let x = frets[11].x + (frets[12].x - frets[11].x) / 2;
      p.ellipse(x, window.innerHeight - 7.5, 4, 4);

    }

    function string() {
      for (let i = 0; i < window.innerWidth; i++) {
        p.strokeWeight(5);
        p.stroke(41);
        p.point(i, window.innerHeight - 25 + p.sin(i));
      }
      p.noStroke();
    }

    function generate() {
      for (let i = 0; i < 12; i++) {
        // let fret = round(random(0, 11));
        // console.log(fret)
        notes[i] = new Note(i, 1, 200 + 100 * i);
      }
      notes[notes.length] = new Note(-1, 1, 100);
    }

  }

  private emitEvent(interval) {
    this.isDone.emit(true);
    clearInterval(interval);
  }

}
