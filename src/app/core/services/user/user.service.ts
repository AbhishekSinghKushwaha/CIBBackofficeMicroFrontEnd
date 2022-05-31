import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(roleId: any) {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getUserList}${roleId}`);
  }

  setUserStat({ userId, ...payload }: any) {
    return this.http.put(`${environment.apiUrl}${urlList.userManagement.setUserStat}${userId}`, payload);
  }

  saveUsers(payload: any) {
    return this.http.post(`${environment.apiUrl}${urlList.userManagement.addUser}`,payload);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${environment.apiUrl}${urlList.userManagement.deleteUser}${userId}`,{});
  }
}
