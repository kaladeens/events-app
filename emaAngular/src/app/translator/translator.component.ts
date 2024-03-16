import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent implements OnInit {
  socket:any;
  text: any ="";
  selectLanguage:any=null;
  languages: any = {
    "BENGALI":"bn",
    "FRENCH":"fr",
    "ARABIC":"ar"
  }
  translated:any = null
  constructor(){
    this.socket = io();
  }
  
  ngOnInit(): void {
    this.listen2response()
  }

  listen2response(){
    this.socket.on("translated",(response:any)=>{
      console.log(response)
      this.translated=response
    })
  }
  translate(){
    console.log(this.selectLanguage)
    let data = {text: this.text,to: this.selectLanguage}
    console.log(data)
    this.socket.emit("translate",data)
  }


}
