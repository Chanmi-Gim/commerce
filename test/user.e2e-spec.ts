import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { UserController } from 'src/controllers/user.controller';
import { APP_PIPE } from '@nestjs/core';

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
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(),
        },
      ],
    }).compile();

    app = testingModule.createNestApplication();
    (await app.init()).listen(8000);

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

    /**
     * 이 부분은 DTO가 담당하는 걸 테스트한다.
     * 그리고 컨트롤러는 DTO가 통과된 이후의 코드다.
     * 따라서, 컨트롤러를 테스트하는 걸로는 검증 불가능하다.
     *
     * DTO의 검증은 Pipe가 담당한다.
     * class-validator 데코레이터는 데이터의 메타데이터이고,
     * Pipe는 메타데이터와 실제 데이터가 일치하는지 검사하는 레이어다.
     *
     * 원래 서버 코드는 appModule이 생성된 이후 `main.ts`에서 pipe를 추가한다.
     * 테스트 코드는 `main.ts`로 동작하는 게 아니기 때문에 프로바이더로 직접 pipe를 추가했다.
     *
     * pipe가 테스트 코드에 추가되었기 때문에 아래 코드는 400번 에러를 잡게 된다.
     */
    it.only('이름과 닉네임이 둘 다 없으면 에러를 던져야 한다.', async () => {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        body: JSON.stringify({
          name: null,
          nickname: null,
        }),
      });

      expect(response.status).toBe(400);
    });
  });

  describe('GET users', () => {
    it('전체 유저가 조회되는지 테스트한다.', async () => {
      expect(1).toBe(2);
    });
  });
});
