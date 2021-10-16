import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    

    // 전체 영화 목록 가져오기.
    @Get()
    getAll() {
        return "This will retrun all Movies";
    }

    // 영화 목록 생성
    @Post()
    createMovie(@Body() movieData) {
        return movieData;
    }

    // search는 nestjs param이 없을 때 id로 읽음. 따라서 /:id 위에 작성.
    // 
    @Get('/search')
    search(@Query('year') searchingYear: string) {
        return 'This will search by year';
    }

    @Get('/:id')
    getById(@Param('id') id: string){
        return `This will Get a movie id ${id}`
    }
    

    @Delete('/:id')
    removeMovie(@Param('id') id: string){
        return `This will Delete a movie id ${id}`;
    }

    @Patch('/:id')
    updateMovie(@Param('id') id: string, @Body() updateData){
        return {
            updateMovie: id,
            ...updateData
        };
    }


}
