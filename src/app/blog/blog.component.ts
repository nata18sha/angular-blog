import { Component, OnInit, TemplateRef } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from 'src/app/shared/models/blog.model';
import { BlogInfoService } from 'src/app/shared/services/blog-info.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { User } from 'src/app/shared/models/user.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Array<IBlog> = [];
  users: Array<IUser> = [];
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  signInStatus = true;
  signButtons = true;
  signUpStatus = true;
  editStatus = false;
  postStatus = true;

  email: string;
  password: string;

  userName: string;
  title: string;
  text: string;
  postId = 1;
  postedBy: string;
  date = new Date();

  userId = 1;
  newUsername: string;
  newEmail: string;
  newPassword: string;


  constructor(private blogService: BlogInfoService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getBlogs();
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
  }

  getBlogs(): void {
    this.blogs = this.blogService.getBlogs();
  }
  getUsers(): void {
    this.users = this.blogService.getUsers();
  }
  showSignIn(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
    this.signInStatus = true;
    this.signUpStatus = true;

  }
  signIn(): void {
    this.getUsers();
    for (let i = 0; i < this.users.length; i++) {
      if (this.email === this.users[i].email && this.password === this.users[i].password) {
        this.userName = this.users[i].username;
        this.modalRef.hide();
        this.resetSignIn();
        this.signButtons = false;
        this.signInStatus = false;
      }
    }
  }
  changeAddStatus(): void {
    this.postStatus = false;
    this.editStatus = false;
    this.signInStatus = false;
  }

  addPost(): void {
    const newPost = new Blog(this.postId, this.userName, this.title, this.date, this.text);
    if (this.title && this.text) {
      if (this.blogs.length > 0) {
        newPost.id = this.blogs.slice(-1)[0].id + 1;
      }
      this.blogService.addPost(newPost);
      this.resetPost();
      this.modalRef.hide();
    }
  }

  editPost(editedPost: IBlog, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
    this.postStatus = false;
    this.editStatus = true;
    this.postId = editedPost.id;
    this.postedBy = editedPost.postedBy;
    this.title = editedPost.topic;
    this.date = editedPost.date;
    this.text = editedPost.message;


  }
  savePost(): void {
    const newPost = new Blog(this.postId, this.postedBy, this.title, this.date, this.text);
    this.blogService.editPost(newPost);
    this.resetPost();
    this.modalRef.hide();
  }

  deletePost(editedPost: IBlog): void {
    if (confirm('Are you sure?')) {
      this.blogService.deletePost(editedPost.id);
    }
  }

  signOut(): void {
    this.signButtons = true;
    this.postStatus = true;
    this.userName = '';
    this.signInStatus = true;
    this.signUpStatus = true;
  }
  signUp(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
    this.signInStatus = false;
    this.signUpStatus = false;
  }
  addUser(): void {
    this.getUsers();
    const newUser = new User(this.userId, this.newUsername, this.newEmail, this.newPassword);
    let checkUsername: string;
    let checkEmail: string;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.newUsername || this.users[i].email === this.newEmail) {
        checkUsername = this.newUsername;
        checkEmail = this.newEmail;
      }
    }
    if (this.newUsername && this.newEmail && this.newPassword) {
      if (this.users.length > 0) {
        newUser.id = this.users.slice(-1)[0].id + 1;
      }
      if (this.newUsername === checkUsername || this.newEmail === checkEmail) {
        alert('This Username or Email already exists!')
      }
      else {
        this.blogService.addUser(newUser);
        this.getUsers();
        for (let i = 0; i < this.users.length; i++) {
          if (this.newEmail === this.users[i].email && this.newPassword === this.users[i].password) {
            this.userName = this.users[i].username;
            this.modalRef.hide();
            this.resetSignUp();
            this.signButtons = false;
          }
        }
      }

    }
    else {
      alert('Please enter Username, Email and Password to register!')
    }
  }
  private resetSignUp(): void {
    this.signUpStatus = true;
    this.newUsername = '';
    this.newEmail = '';
    this.newPassword = '';
  }
  private resetSignIn(): void {
    this.email = '';
    this.password = '';
    this.postId = 1
    this.postedBy = '';
    this.title = '';
    this.date = new Date();
    this.text = '';
  }
  private resetPost(): void {
    this.title = '';
    this.text = '';
    this.postId = 1
    this.postedBy = '';
    this.date = new Date();
  }
}
