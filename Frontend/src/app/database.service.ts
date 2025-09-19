import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userSaveBlog(blogId: any) {
    throw new Error('Method not implemented.');
  }

  users:any=[];
  blogs:any=[];
  savedBlogs:any=[]
  // DbBlogCount:any
  nextBlogId!:any
  isLoggedIn:any = false
  categories =  [{id:1 ,name:"Food"},
  {id:1 ,name:"Fashion"},{id:1 ,name:"Sports"},{id:1 ,name:"Entertainment"},{id:1 ,name:"Travel"}]

  constructor() {
    this.LoadData()
  }

  LoadData(){
    this.users = JSON.parse(localStorage.getItem("users") ?? "[]");
    console.log(this.users);
    this.blogs = JSON.parse(localStorage.getItem("blogs")?? "[]");
    console.log(this.blogs);
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    this.loggedInUser = localStorage.getItem("loggedInUser")
    // this.DbBlogCount = Number(localStorage.getItem("DbBlogCount") ?? 0)
    this.nextBlogId = Number(localStorage.getItem("nextBlogId") ?? 1) 
    this.savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")?? "[]");
  } 
  updateLoggedIn(value:any){
    this.isLoggedIn = value
    localStorage.setItem("isLoggedIn",this.isLoggedIn)
  }

  loggedInUser:any
  LoggedInUser(value:any){
    this.loggedInUser = value
    localStorage.setItem("loggedInUser",this.loggedInUser)
  }

  
  insertUsers(data:any){
    this.users.push(data)
    //  local storage me key value pairhe bhej te hai aur dono string hota h isliye bhejte vakt we do json.stringify
    localStorage.setItem("users",JSON.stringify(this.users))

  }

  insertBlog(data:any){
    
    let blog  = {
      // ek copy bnega data ka fir usme id insert krega
      ...data,
      id:this.nextBlogId
    }
    this.blogs.push(blog);
    localStorage.setItem("blogs",JSON.stringify(this.blogs))
    this.updateNextBlogId(this.nextBlogId+1)
  }

  //update local variable as well as local storage
  updateNextBlogId(value:any){
    this.nextBlogId = value
    localStorage.setItem("nextBlogId",JSON.stringify(this.nextBlogId))
  }

  selectUsers(){
    return this.users
  }

  selectBlogs(){
    return this.blogs
  }

  getLoggedInUser(){
    return localStorage.getItem('loggedInUser');
  }

  id:any
  //edit blog section
  updateBlog(id:any,blogData:any){
    let blogIndex = this.blogs.findIndex((elem:any)=>{
      return elem.id==id
    })
    if(blogIndex!=-1){
      this.blogs[blogIndex]={
        ...blogData,
        id
      }

      localStorage.setItem("blogs",JSON.stringify(this.blogs))
    }

  }

  deleteBlog(id:any){
    let deleteIndex= this.blogs.findIndex((elem:any)=>elem.id == id)
    this.blogs.splice(deleteIndex,1)
    localStorage.setItem("blogs",JSON.stringify(this.blogs))
  }

  insertSave(userId:any,blogId:any){
    console.log(this.savedBlogs)
    let saveData = this.savedBlogs.find((elem:any)=>elem.userId == userId)
    if(saveData){
      saveData.blogs.push(blogId)
    }
    else{
      let obj = {
        userId:userId,
        blogs:[blogId]
      }
      console.log(userId,obj)
      this.savedBlogs.push(obj)
    }
    console.log(this.savedBlogs);
    localStorage.setItem("savedBlogs",JSON.stringify(this.savedBlogs))
  }
}
