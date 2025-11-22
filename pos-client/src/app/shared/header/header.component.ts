import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";


@Component({
    selector: 'app-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {



}
