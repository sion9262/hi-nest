import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    readonly title: string;
    @ApiProperty()
    @IsNumber()
    readonly year: number;
    // 각 원소 검사.
    @ApiProperty()
    @IsString({ each: true })
    readonly genres: string[];
}