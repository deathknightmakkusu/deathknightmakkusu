/**
 * Type representing a directory listing
 */
export type DirectoryListing = {
  basePath: string,   // Base path of this listing
  files: FileEntry[]  // File entries
};

/**
 * Type represeting a file entry
 */
export type FileEntry = {
  selected?: boolean,   // Whether this file is selected for archive creation
  directory: boolean,   // Whether this file is a directory
  name: string,         // File name
  relativeUrl: string,  // Relative URL for accessing the file/directory
  lastModified: Date,   // Last modification timestamp
  size?: number         // File size (not applicable to directories)
};