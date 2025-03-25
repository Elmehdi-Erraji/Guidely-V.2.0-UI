import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Department, DepartmentService } from '../../../../../core/services/department.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { Page, Role, UserResponse, UsersService, UserRequest } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Data arrays
  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  roles: Role[] = [];
  departments: Department[] = [];

  // Filter controls
  searchQuery: string = '';
  selectedRole: string = 'null';
  selectedDepartment: string = 'null';

  // Add User Modal fields
  addUserName: string = '';
  addUserEmail: string = '';
  addUserPassword: string = '';
  addUserConfirmPassword: string = '';
  addUserRoleId: string = '';
  addUserDepartmentId: string = '';

  // Edit User Modal fields
  editUserId: string = '';
  editUserName: string = '';
  editUserEmail: string = '';
  editUserPhone: string = ''; // optional field, if needed
  editUserPassword: string = ''; // leave empty if not changing
  editUserRoleId: string = '';
  editUserDepartmentId: string = '';
  editUserStatus: string = ''; // e.g. "1" for Pending, "2" for Active, etc.

  constructor(
    private usersService: UsersService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
    this.loadDepartments();
  }

  // Load all users (adjust page/size as needed)
  loadUsers(): void {
    this.usersService.findAllUsers(0, 1000).subscribe({
      next: (data: Page<UserResponse>) => {
        this.users = data.content;
        this.filteredUsers = [...this.users];
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // Load roles from backend
  loadRoles(): void {
    this.usersService.getRoles().subscribe({
      next: (data: Role[]) => {
        this.roles = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Error loading roles', 'error');
      }
    });
  }

  // Load departments from DepartmentService
  loadDepartments(): void {
    this.departmentService.getDepartments(0, 1000).subscribe({
      next: (data: any) => {
        // If paged response, use data.content; otherwise, assign data directly.
        this.departments = data.content ? data.content : data;
      },
      error: (error) => {
        Swal.fire('Error', 'Error loading departments', 'error');
      }
    });
  }

  // Filter users based on search text, role, and department
  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesQuery =
        this.searchQuery.trim() === '' ||
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole =
        this.selectedRole === 'null' ||
        (user.roleId ? user.roleId === this.selectedRole : user.roleName.toLowerCase() === this.selectedRole.toLowerCase());
      const matchesDept =
        this.selectedDepartment === 'null' ||
        (user.departmentId ? user.departmentId === this.selectedDepartment : (user.departmentName || '').toLowerCase() === this.selectedDepartment.toLowerCase());
      return matchesQuery && matchesRole && matchesDept;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedRole = 'null';
    this.selectedDepartment = 'null';
    this.filteredUsers = [...this.users];
  }

  // Helper methods to display role and department names.
  // Now they accept the entire user object.
  getRoleName(user: UserResponse): string {
    return user.roleName;
  }

  getDepartmentName(user: UserResponse): string {
    return user.departmentName || '';
  }

  // --- Add User functionality ---
  openAddUserModal(): void {
    this.addUserName = '';
    this.addUserEmail = '';
    this.addUserPassword = '';
    this.addUserConfirmPassword = '';
    this.addUserRoleId = '';
    this.addUserDepartmentId = '';
  }

  addUser(): void {
    if (
      !this.addUserName.trim() ||
      !this.addUserEmail.trim() ||
      !this.addUserPassword.trim() ||
      !this.addUserConfirmPassword.trim() ||
      !this.addUserRoleId.trim() ||
      !this.addUserDepartmentId.trim()
    ) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }
    if (this.addUserPassword !== this.addUserConfirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    const newUser: UserRequest = {
      name: this.addUserName.trim(),
      email: this.addUserEmail.trim(),
      password: this.addUserPassword,
      roleId: this.addUserRoleId,
      departmentId: this.addUserDepartmentId
    };

    this.usersService.createUser(newUser).subscribe({
      next: (res: UserResponse) => {
        Swal.fire('Success', 'User added successfully', 'success');
        this.loadUsers();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // --- Edit User functionality ---
  openEditUserModal(user: UserResponse): void {
    this.editUserId = user.id;
    this.editUserName = user.name;
    this.editUserEmail = user.email;
    // If the findAll API doesn’t return roleId/departmentId, use fallback (empty string)
    this.editUserRoleId = user.roleId || '';
    this.editUserDepartmentId = user.departmentId || '';
    this.editUserPassword = ''; // leave blank for no change
  }

  updateUser(): void {
    if (
      !this.editUserName.trim() ||
      !this.editUserEmail.trim() ||
      !this.editUserRoleId.trim() ||
      !this.editUserDepartmentId.trim()
    ) {
      Swal.fire('Error', 'Name, Email, Role and Department are required', 'error');
      return;
    }

    const updatedUser: UserRequest = {
      name: this.editUserName.trim(),
      email: this.editUserEmail.trim(),
      roleId: this.editUserRoleId,
      departmentId: this.editUserDepartmentId
    };

    if (this.editUserPassword.trim()) {
      updatedUser.password = this.editUserPassword;
    }

    this.usersService.updateUser(this.editUserId, updatedUser).subscribe({
      next: (res: UserResponse) => {
        Swal.fire('Success', 'User updated successfully', 'success');
        this.loadUsers();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // --- Delete User functionality ---
  deleteUser(user: UserResponse): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete user "${user.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed && user.id) {
        this.usersService.deleteUser(user.id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            this.loadUsers();
          },
          error: (error) => {
            Swal.fire('Error', error.message, 'error');
          }
        });
      }
    });
  }
}
