import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from 'c:/users/faiza/mean-course/src/app/auth/auth.service';
import { PostsService } from '../post.service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',

})
export class PostCreateComponent implements OnInit {

  selectedValue1: number = 10;
  selectedValue2: number = 10;
  inputmsg1: string = '';
  inputmsg2: string = '';

  public loading: boolean = false;

  public result: string = '';
  states: number[] = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  aSub: '';
  bSub: '';
  x: '';
  y: '';
  resultt: '';
  xs: '';
  ys: '';

  // longest = (xs, ys) => (xs.length > ys.length) ? xs : ys;
  //  lcs = (xx, yy) => {
  //   if (!xx.length || !yy.length) { return this.result = ''; }

  //   this. x = xx[0],
  //   this. y = yy[0];
  //   this.xs = xx.slice(1);
  //   this.ys = yy.slice(1);

  //   return (this.x === this.y) ? this.result = this.lcs(this.xs, this.ys) :
  //   this.result = this.longest(this.lcs(xx, this.ys), this.lcs(this.xs, yy));
  // }

  LCS(s1, s2) {
    let result = [];
    for (let i = 0; i <= s1.length; i++) {
      result.push([]);
      for (let j = 0; j <= s2.length; j++) {
        let currValue = 0;
        if (i == 0 || j == 0) {
          currValue = 0;
        } else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
          currValue = result[i - 1][j - 1] + 1;
        } else {
          currValue = Math.max(result[i][j - 1], result[i - 1][j]);
        }
        result[i].push(currValue);
      }
    }

    let i = s1.length;
    let j: number = s2.length;

    let s3 = '';
    while (result[i][j] > 0) {
      if (s1.charAt(i - 1) == s2.charAt(j - 1) && (result[i - 1][j - 1] + 1 == result[i][j])) {
        s3 = s1.charAt(i - 1) + s3;
        i = i - 1;
        j = j - 1;
      } else if (result[i - 1][j] > result[i][j - 1])
        i = i - 1;
      else
        j = j - 1;
    }
    // return s3;
    this.result = s3;
    this.loading = true;
    if (this.result) {
      this.onAddPost();
    }
  }

  // lcs(a, b) {

  //   this.aSub = a.substr(0, a.length - 1);
  //   this.bSub = b.substr(0, b.length - 1);
  //   if (a.length === 0 || b.length === 0) {
  //     return this.result = '';
  //   } else if (a.charAt(a.length - 1) === b.charAt(b.length - 1)) {
  //     return this.result = this.lcs(this.aSub, this.bSub) + a.charAt(a.length - 1);
  //   } else {
  //     this.x = this.lcs(a, this.bSub);
  //     this.y = this.lcs(this.aSub, b);
  //     (this.x.length > this.y.length) ? this.result = this.x : this.result = this.y;
  //   }

  //   this.loading = true;
  //   console.log('result: ', this.result)
  //   if (this.result) {
  //     this.onAddPost();
  //   }
  // }

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts()
      .pipe(map(res => res['data']))
      .subscribe(
        res => {
          this.inputmsg1 = res.inputmsg1 || '';
          this.inputmsg2 = res.inputmsg2 || '';
          this.result = res.result || '';
        },
        err => {
          console.log(err);
        }
      )
  }

  onAddPost() {
    this.postsService.addPost(this.inputmsg1, this.inputmsg2, this.result);
  }
}





