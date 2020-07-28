import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class BlogInfoService {
  private blogs: Array <IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'first post',
      date: new Date(2020, 6, 25, 10, 0),
      message: 'Sign up to create your account and start to use Angular Blog'
    }
  ];
  private users: Array <IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  ];

  constructor() { }

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }
  getUsers(): Array <IUser> {
    return this.users;
  }
  addPost(newPost: IBlog): void {
    this.blogs.push(newPost);
  }
  editPost(newPost: IBlog): void {
    const index = this.blogs.findIndex(d => d.id === newPost.id);
    this.blogs.splice(index, 1, newPost);
  }
  deletePost(id:number): void {
    const index = this.blogs.findIndex(d => d.id === id);
    this.blogs.splice(index, 1);
  }
  addUser(newUser: IUser): void {
    this.users.push(newUser);
  }
  
}
