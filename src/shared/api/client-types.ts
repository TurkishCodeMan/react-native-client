export interface BaseEntity {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Role extends BaseEntity {
  name: string;
  description: string;
  type?: string;
}

export interface Invite extends BaseEntity {
  statusApproved: boolean;
  inviteShow: boolean;
  company?: Company;
}

export interface Workspace extends BaseEntity {
  name: string;
  tag: string;
  company?: Company;
  users?: User[];
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  companies?: Company[];
  workspaces?: Workspace[];
  employerCompanies?: Company[];
}

export interface Company extends BaseEntity {
  name: string;
  users?: User[];
  workspaces?: Workspace[];
  subContracters?: User[];
  subCompanies?: Company[];
  employer?: User;
}
