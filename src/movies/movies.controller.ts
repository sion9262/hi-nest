import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "This will retrun all Movies";
    }

    @Post()
    createMovie() {
        return 'This will Create a movie'
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
    updateMovie(@Param('id') id: string){
        return `This will Update a moive id ${id}`;
    }

}
