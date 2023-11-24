import { Role } from './Role.model';

export class User {
  idUser: number;
  fName: String;
  lName: String;
  password: String;
  email!: String;
  adresse: String;
  region: String;
  ville: String;
  phone: number;
  roleUser: Role;
  valide: boolean;

  constructor(
    idUser: number,
    fName: string,
    lName: string,
    password: string,
    email: string,
    adresse: string,
    region: string,
    ville: string,
    phone: number,
    roleUser: Role,
    valide: boolean
  ) {
    this.idUser = idUser;
    this.fName = fName;
    this.lName = lName;
    this.password = password;
    this.email = email;
    this.adresse = adresse;
    this.region = region;
    this.ville = ville;
    this.phone = phone;
    this.roleUser = roleUser;
    this.valide = valide;
  }
}
