import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) {}

  getEvents(){
    return this.http.get("/api/sam/events")
  }
  getEvent(id: number){
    return this.http.get('/api/sam/events/'+id)
  }
  getSoldEvents(){
    return this.http.get("/api/sam/events-sold")
  }

  addEvent(newEvent: any){
    return this.http.post("/api/sam/events", newEvent, httpOptions)
  }

  deleteEvent(id: number){
    return this.http.delete("/api/sam/events/" + id,httpOptions)
  }

  updateEvent( data: any){
    return this.http.put("/api/sam/events", data, httpOptions)
  }

  getOPCounts(){
    return this.http.get('/api/sam/operations')
  }

  getCounts(){
    return this.http.get('/api/sam/counts')
  }

  getCategories(){
    return this.http.get("/api/28872339/categories");
  }

  addCategory(newCategory: any){
    return this.http.post("/api/28872339/categories", newCategory, httpOptions);
  }

  deleteCategory(id: number){
    return this.http.delete("/api/28872339/categories/" + id, httpOptions);
  }

  updateCategory(data: any){
    return this.http.put("/api/28872339/categories", data, httpOptions);
  }

  getCategoryDetails(id: number){
    return this.http.get("/api/28872339/categories/" + id);
  }

  getCategoryStats(){
    return this.http.get("/api/28872339/categories/stats");
  }


}
