import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  obj: Card = {
    id: 0,
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }
  constructor(private cardsService: CardsService) {

  }

  ngOnInit(): void {
    this.getAllCards();
  }

  resetCard() {
    this.obj.id = 0;
    this.obj.cardHolderName = '';
    this.obj.cardNumber = '';
    this.obj.cvc = '';
    this.obj.expiryMonth = '';
    this.obj.expiryYear = '';
  }

  getAllCards() {
    this.cardsService.getAllCards()
      .subscribe(
        response => {
          //console.log(response);
          this.cards = response;
        }
      );
  }

  onSubmit() {
    if (this.obj.id === 0) {
      this.cardsService.addCard(this.obj)
        .subscribe(
          response => {
            this.getAllCards();
            this.resetCard();
          }
        );
    } 
    else {
      this.updateCard(this.obj);
    }
  }

  editCard(id: number) {
    this.cardsService.getCard(id)
      .subscribe(
        response => {
          console.log("Get Card : "+ id);
          console.log(response);
          this.obj = response;
        }
      )
    //this.obj = formData;
  }

  deleteCard(id: number) {
    this.cardsService.deleteCard(id)
      .subscribe(
        response => {
          this.getAllCards();
        }
      )
  }

  updateCard(objToUpdate: Card) {
    this.cardsService.updateCard(objToUpdate)
    .subscribe(
      response => {
        this.getAllCards();
        this.resetCard();
      }
    );
  }
}
