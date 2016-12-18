import { Injectable } from '@angular/core'


@Injectable()
export class SharedService {

    saveSelected(categoryId) {
        localStorage.setItem('selected_category', JSON.stringify({ selected: categoryId }));
    }

    getSelected() {
        let sel = JSON.parse(localStorage.getItem('selected_category'));
        return sel.selected
    }

    saveSuccessRegistr(success) {
        localStorage.setItem('successRegistr', JSON.stringify(success));
    }

    getSuccessRegistr() {
        let sel = JSON.parse(localStorage.getItem('successRegistr'));
        return sel
    }

    saveOpened(str) {
        localStorage.setItem('opened_sidenav', JSON.stringify({ opened: str }));
    }

    getOpened() {
        let sel = JSON.parse(localStorage.getItem('opened_sidenav'));
        return sel.opened
    }

    getLoading() {
        return JSON.parse(localStorage.getItem('loading'));
    }

    setLoading(bool) {
        localStorage.setItem('loading', JSON.stringify(bool));
    }
} 