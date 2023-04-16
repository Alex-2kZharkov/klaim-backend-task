import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string, number> {
  transform(queryString: string): number | undefined {
    const intValue = parseInt(queryString, 10);
    if (queryString === undefined) {
      return;
    }

    if (Number.isNaN(intValue)) {
      throw new BadRequestException(`${queryString} is not an integer`);
    }

    return intValue;
  }
}
