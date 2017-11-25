import { Injectable } from '@angular/core';
import {Authentication} from "../model/authentication";

@Injectable()
export class StorageService {
  private storageMap: Map<string, Authentication> = new Map<string, Authentication>();
  static AUTHENTICATION: string = 'Authentication';

  constructor() { }

  public saveAuthentication(auth: Authentication): void {
    this.storageMap.set(StorageService.AUTHENTICATION, auth);
  }

  public removeAuthentication(): void {
    this.storageMap.delete(StorageService.AUTHENTICATION);
  }

  public getAuthentication(): Authentication {
    return this.storageMap.get(StorageService.AUTHENTICATION);
  }
}
