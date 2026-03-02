import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-role-check',
  templateUrl: './role-check.component.html',
  styleUrls: ['./role-check.component.css'],
})
export class RoleCheckComponent {
  @Output() roleSelected = new EventEmitter<void>();

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {}

  selectRole(role: 'owner' | 'staff') {
    this.adminService.setRole(role);
    this.roleSelected.emit();
    this.router.navigate(['/admin/analytics']);
  }
}
