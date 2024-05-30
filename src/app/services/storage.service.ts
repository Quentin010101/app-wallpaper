import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  private getData(key: string): Promise<any> | undefined {
    return this._storage?.get(key);
  }

  public get(key: string): Observable<any>{

    return defer(async () => this.getData(key))
  }

  public clear(){
    this._storage?.clear()
  }
}
