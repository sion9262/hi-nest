import { IsNumber, IsString } from "class-validator";
export class CreateMovieDto {
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    // 각 원소 검사.
    @IsString({ each: true })
    readonly genres: string[];
}