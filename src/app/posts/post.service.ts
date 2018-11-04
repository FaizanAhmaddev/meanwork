import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
constructor(private http: HttpClient) {}

  getPosts() {
    const params = {
      email: JSON.parse(localStorage.getItem('currentUser')).user.email 
    }

    return this.http.get('/api/post/get', { params });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(inputmsg1: string, inputmsg2: string,  result: string ) {

    const post: any = {
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      inputmsg1,
      inputmsg2,
      result: result,
    };
    console.log(post)
    return this.http.post('/api/post/create', post)
    .subscribe(response => {
        console.log(response)
      },
      err => {
        console.log(err)
      }
    )

      this.posts.push(post);
   this.postsUpdated.next([...this.posts]);
// }
}
}
// createUser(email: string, password: string) {
//   const authData: AuthData = {email: email, password: password};
//   this.http.post('/api/user/signup', authData)
//     .subscribe(response => {
//       console.log(response);
//     });
// }}
