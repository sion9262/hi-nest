import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    })
    describe('getAll()', () => {
        
        it('should return an array', () => {
            const result = service.getAll();

            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getById()', () => {
        
        it('should return a movie', () => {
            service.createMovie({
                title: 'Test Movie',
                genres: ['Test'],
                year: 2000
            });
            
            const movie = service.getById(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });
        it('should throw a NotFoundException', () => {
            try{
                service.getById(999);
            }catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with ID 999 not found`);
            }
        })
    });
    
    describe('deleteMovie()', () => {

        it('delete a movie', () => {
            // given
            service.createMovie({
                title: 'Test Movie',
                genres: ['Test'],
                year: 2000
            });

            const beforeMoives = service.getAll().length;
            
            //when
            service.deleteMovie(1);
            const afterMovies = service.getAll().length;
            
            //then
            expect(afterMovies).toBeLessThan(beforeMoives);
        });

        it('should throw a NotFoundException', () => {
            try {
                service.deleteMovie(999);
            }catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with ID 999 not found`);
            }
        });
        
    });

    describe('createMovie()', () => {

        it('create a movie', () => {
            // given
            const beforeMoives = service.getAll().length;
            // when
            service.createMovie({
                title: 'Test Movie',
                genres: ['Test'],
                year: 2000
            });
            const afterMovies = service.getAll().length;
            // then
            expect(afterMovies).toBeGreaterThan(beforeMoives);
        });
    });

    describe('updateMovie()', () => {

        it('update a movie', () => {
            // given
            service.createMovie({
                title: 'Test Movie',
                genres: ['Test'],
                year: 2000
            });
            service.updateMovie(1, { title: 'Updated Test'});
            const movie = service.getById(1);
            // then
            expect(movie.title).toEqual('Updated Test');
        });

        it('should throw a NotFoundException', () => {
            try {
                service.updateMovie(999, {});
            }catch(e) {
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with ID 999 not found`);
            }
        });
    });
});