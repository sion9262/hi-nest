import { Injectable } from '@nestjs/common';
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

    getById(id: string){
        return this.movies.find(movie => movie.id === +id);
    }
    
    deleteMovie(id: string){
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }
    updateMovie(){}


}
