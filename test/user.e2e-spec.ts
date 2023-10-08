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
    it('유저 생성 자체만을 테스트한다.', async () => {
      const before = await userController.getAll();
      await userController.create({ name: 'name', nickname: 'nickname' });
      const after = await userController.getAll();

      expect(before.length + 1).toBe(after.length);
    });

    it('유저가 생성될 때 인자로 받는 랜덤 닉네임이 동일하게 조회되어야 한다.', async () => {
      // 1. 랜덤한 닉네임을 만든다.
      const randomNickname = new Date().getTime().toString();

      // 2. 랜덤한 닉네임을 가진 유저의 수를 조회한다. 1
      const before = await userController.getAll();
      const beforeHasRandomNickname = before.filter(
        (el) => el.nickname === randomNickname,
      );

      // 3. 유저를 생성한다.
      await userController.create({ name: 'name', nickname: randomNickname });

      // 4. 랜덤한 닉네임을 가진 유저의 수를 조회한다. 2
      const after = await userController.getAll();
      const afterHasRandomNickname = after.filter(
        (el) => el.nickname === randomNickname,
      );

      // 5. 이전보다 마지막 조회가 그 유저의 수가 1개 늘어난 것을 확인한다.
      expect(beforeHasRandomNickname.length + 1).toBe(
        afterHasRandomNickname.length,
      );
    });

    it('유저는 자기 이름을 제공하지 않을 수도 있어야 한다.', async () => {
      // 1. 이름이 null인 유저의 수를 조회한다.(before)
      // a. 검색 API에 이름을 전달할 수 있게 해야겠다.
      const before = await userController.getAllUser({
        search: 'null',
        target: 'name',
      });

      // 2. 이름이 null인 유저를 생성한다.
      // a. 이름이 없는 경우를 검색할 때는 null 을 스트링으로 허용해야 겠다~

      const createdUser = await userController.create({
        name: null,
        nickname: 'j',
      });
      expect(createdUser.name).toBe(null);

      // 3. 이름이 null인 유저의 수를 조회한다.(after)
      const after = await userController.getAllUser({
        search: 'null',
        target: 'name',
      });

      // 4. before + 1와 after가 같은지 확인한다.
      expect(before.length + 1).toBe(after.length);
    });

    it.todo('이름과 닉네임이 둘 다 없으면 에러를 던져야 한다.');
  });

  describe('GET users', () => {
    it('전체 유저가 조회되는지 테스트한다.', async () => {
      expect(1).toBe(2);
    });
  });
});
