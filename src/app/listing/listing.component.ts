import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BackendService } from '../service/backend.service';
import { DirectoryListing, FileEntry } from '../service/directory_listing';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  // Data members
  
  public fileSelectCount: number = 0;            // Count of file currently being selected
  public listing: DirectoryListing | undefined;  // The direcrory listing to be displayed

  // Constructor

  constructor(private activeRoute: ActivatedRoute, private backend: BackendService) { }

  ngOnInit(): void {
    // Obtain listing from server when the selected directory is changed
    this.activeRoute.url.subscribe(segments => {
      const pathSegments: string[] = [];
      segments.forEach(segmemt => pathSegments.push(segmemt.path));
      const targetPath: string = (segments.length == 0) ? "" : "/" + segments.join("/");
      this.obtainListing(targetPath);
    });
  }


  // Public methods

  public getArchive(): void {
    let requestUrl: string = environment.archiveBaseUrl + this.listing?.basePath + "?files=";
    let selectedFiles: string[] = [];

    this.listing?.files.forEach(file => {
      if (file.selected)
        selectedFiles.push(encodeURIComponent(file.name))
    })

    requestUrl += selectedFiles.join(",");
    location.href = requestUrl;
  }

  /**
   * Get the URL to access a file
   * @param file name of file which full URL is to be obtained
   * @returns full URL to the file
   */
  public getFileUrl(file: FileEntry): string {
    return environment.fileBaseUrl + file.relativeUrl;
  }

  /**
   * Update the file select count whenever any file is selected/unselected
   * @param value event of the file selection/unselected
   */
  public updateFileCount(value: Event): void {
    if ((value.target as HTMLInputElement).checked)
      this.fileSelectCount++;
    else
      this.fileSelectCount--;
  }

  // Private methods

  /**
   * Obtain directory listing
   * @param path of directory which listing is to be obtained
   */
  private obtainListing(path: string): void {
    this.listing = undefined;

    this.backend.getListing(path).subscribe(listing => {
      this.listing = listing;
    })
  }
}
