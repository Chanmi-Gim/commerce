import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { UserController } from 'src/controllers/user.controller';

/**
 * describe : 컴포넌트라고 생각
 */
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userController: UserController;

  /**
   * beforeAll : 테스트가 시작되기 전 같은 스코프 내에서 함수를 1번 호출한다는 의미
   * beforeEach : 테스트가 시작되기 전 같은 스코프 내에서 함수를 자식 테스트 (describe, it) 마다 호출한다는 의미
   */
  beforeAll(async () => {
    const testingModle: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModle.createNestApplication();
    await app.init();

    userController = app.get<UserController>(UserController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('userController is defined', async () => {
    expect(userController).toBeDefined();
  });

  describe('POST users', () => {
    it('유저가 생성된 후 전체 유저의 수가 1이 늘어났는지 검증한다.', async () => {
      expect(1).toBe(2);
    });

    it('유저가 생성될 때 인자로 받는 랜덤 닉네임이 동일하게 조회되어야 한다.', async () => {
      expect(1).toBe(2);
    });

    it('유저는 자기 이름을 제공하지 않을 수도 있어야 한다.', async () => {
      expect(1).toBe(2);
    });
  });

  describe('GET users', () => {
    it('전체 유저가 조회되는지 테스트한다.', async () => {
      expect(1).toBe(2);
    });
  });
});
