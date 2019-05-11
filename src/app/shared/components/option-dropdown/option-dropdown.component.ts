import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-option-dropdown',
    templateUrl: './option-dropdown.component.html',
    styleUrls: ['./option-dropdown.component.scss']
})
export class OptionDropdownComponent implements OnInit {
    public isShowDropDown = false;
    public isHover = false;

    constructor() {
    }

    showDropdown() {
        this.isShowDropDown = !this.isShowDropDown;
    }

    ngOnInit() {
    }

}
