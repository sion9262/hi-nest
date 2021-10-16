import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];


    getAll() {
        return this.movies;
    }

    createMovie(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    search(){}

    getById(id: string): Movie{
        const movie =  this.movies.find(movie => movie.id === +id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie
    }
    
    deleteMovie(id: string){
        this.getById(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }
    updateMovie(id: string, updateData){
        const movie = this.getById(id);
        this.deleteMovie(id);
        this.movies.push({...movie, ...updateData});
    }


}
