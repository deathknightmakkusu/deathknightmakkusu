import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DirectoryListing } from './directory_listing';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  // Public methods

  /**
   * Obtain directory listing of requested (relative) path
   * 
   * @param path (relative) path of directory which listing to be obtained
   * @returns Directory listing of the requested path
   */
  getListing(path: string): Observable<DirectoryListing> {
    return this.httpClient.get<DirectoryListing>(environment.listingBaseUrl + path);
  }
}
