import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 데코레이터가 없는 속성 제거
        forbidNonWhitelisted: true, // 데코레이더가 존재하지 않으므로 exception
        transform: true // user가 보낸 것을 원하는 type으로 변경
      })
    );
    await app.init();
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
  
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title : 'Test',
          year : 2021,
          genres: ['test']
        })
        .expect(201)
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title : 'Test',
          year : 2021,
          genres: ['test'],
          test : 13141
        })
        .expect(400)
    });
  });
  // 실제 서버에서 넘어오는 id - number, testing 시 id -> string
  // e2e에서 transform 작동 안함.
  // 위에 pipe를 올리지 않기 때문이다.
  // 테스트할 때도 위의 설정을 해줘야함.
  describe('/movies/:id', () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title : "2003"
      })
      .expect(200);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
      .patch('/movies/999')
      .expect(404);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer())
      .delete('/movies/999')
      .expect(404);
    });
  });
  
});
