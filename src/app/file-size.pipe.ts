import { Pipe, PipeTransform } from "@angular/core";

// Constants
const SIZE_FACTOR: number = 1024;                     // Division factor for formatting file size
const SIZE_UNIT: string[] = ["B", "KB", "MB", "GB", "TB"];  // Size units

/**
 * To transform a file size in byte to a string for display
 * e.g. 2048 -> 2KB, 13545646 -> 12.92MB
 */
@Pipe({name: "fileSize"})
export class FileSizePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value == undefined)
      return "";

    if (!Number.isInteger(value))
      throw new Error("Input value must be in integer");

    let size: number = value;

    for (let i: number = 0; i < SIZE_UNIT.length - 1; ++i) {
      if (size < SIZE_FACTOR)
        return (Math.round(size * 100) / 100) + SIZE_UNIT[i];
  
      size /= SIZE_FACTOR;
    }
  
    return  (Math.round(size * 100) / 100) + SIZE_UNIT[SIZE_UNIT.length - 1];
  }
  
}