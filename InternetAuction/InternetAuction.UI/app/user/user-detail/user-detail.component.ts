import { Component } from '@angular/core';
import { Router} from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'user-details',
    templateUrl: './app/user/user-detail/user-detail.component.html',
    styleUrls: ['./app/user/user-detail/user-detail.component.css'],
    providers: [UserService]
})

export class UserDetailsComponent {
    currentUser: User;
    editPersonalInf: boolean = false;
    personalLabels: string[] = ["Логин", "Фамилия", "Имя", "Отчество", "Почта", "Телефон"];
    personalInf: string[] = ["jenny_jd", "Яворская", "Евгения", "Евгеньевна", "fjkgjdkl@mail.ru", "+375 29 6777 301"];
    cardLabels: string[] = ["Владелец", "Срок действия"];
    cards: any[] = [{ number: "2345 2345 2346 2345", name: "RYGJH HJKHKJHKJH", date: "23-10-2016", currency: "BYN" },
        { number: "2345 2345 2346 2345", name: "RYGJH HJKHKJHKJH", date: "23-10-2016", currency: "EUR" }];

    constructor(private userService: UserService) { }

}
