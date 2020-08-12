import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-organization-edit, [app-organization-edit]',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() organization: Organization;
  @Output() editOrganization = new EventEmitter<Organization>();
  constructor() { }

  ngOnInit(): void {
    console.log('init');
  }

  onEditOrganization() {
    this.editOrganization.emit(this.organization);
  }



}
