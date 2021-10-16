import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {

    constructor(readonly moviesService: MoviesService) {}

    // 전체 영화 목록 가져오기.
    @Get()
    @ApiResponse({ 
        status: 200, 
        description: '모든 영화를 조회.'
    })
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // 영화 목록 생성
    @Post()
    @ApiResponse({ 
        status: 201, 
        description: '영화 생성'
    })
    createMovie(@Body() movieData: CreateMovieDto) {
        return this.moviesService.createMovie(movieData);
    }
 
    @Get('/:id')
    @ApiResponse({ 
        status: 200, 
        description: '특정 영화를 조회.'
    })
    getById(@Param('id') id: number){
        return this.moviesService.getById(id);
    }
    

    @Delete('/:id')
    @ApiResponse({ 
        status: 200, 
        description: '특정 영화를 삭제.'
    })
    deleteMovie(@Param('id') id: number){
        return this.moviesService.deleteMovie(id);
    }

    @Patch('/:id')
    @ApiResponse({ 
        status: 200, 
        description: '특정 영화를 업데이트.'
    })
    updateMovie(@Param('id') id: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.updateMovie(id, updateData);
    }

}
