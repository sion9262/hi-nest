import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(readonly moviesService: MoviesService) {}

    // 전체 영화 목록 가져오기.
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // 영화 목록 생성
    @Post()
    createMovie(@Body() movieData: CreateMovieDto) {
        return this.moviesService.createMovie(movieData);
    }

    // search는 nestjs param이 없을 때 id로 읽음. 따라서 /:id 위에 작성.
    // 
    @Get('/search')
    search(@Query('year') searchingYear: string) {
        return 'This will search by year';
    }
 
    @Get('/:id')
    getById(@Param('id') id: number){
        return this.moviesService.getById(id);
    }
    

    @Delete('/:id')
    deleteMovie(@Param('id') id: number){
        return this.moviesService.deleteMovie(id);
    }

    @Patch('/:id')
    updateMovie(@Param('id') id: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.updateMovie(id, updateData);
    }

}
