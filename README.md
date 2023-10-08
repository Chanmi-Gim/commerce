# Commerce

## 도커 관련 명령어 참고

```bash
docker ps # ls와 동일한 명령어로, 도커 컨테이너들을 조회한다.
docker compose up -d # 백그라운드에서 도커 컴포즈 실행

docker stop name|id
docker rm name|id # stop된 컨테이너만 제거 가능

docker start name|id

docker --help
docker compose --help
```

`docker compose up -d`는 현재 폴더의 `docker-compose.yml`을 실행시킨다.
이 Repository 폴더의 yml 파일은 mysql 컨테이너에 관한 정보를 담고있다.

- 컨테이너는 무엇인가?

## library

```bash
npm i typeorm mysql2 @nestjs/typeorm # DB 연동을 위한 라이브러리
npm i @nestjs/config # nestjs 용 .env 해독
npm i cross-env # 운영체제 상관없이 NODE_ENV 사용
```

- ORM (Object Relation Mapping) 이란 무엇인가?
- soft-delete 란?
- ORM typeorm configuration을 보면 host가 있는데, localhost와 127.0.0.1의 차이는?
  - TCP와 IP의 차이인데, 뭐가 무엇인지 찾아볼 것 ( MySQL에서는 중요하다. )

## git

```bash
# 방금 커밋한 것을 수정하는 경우에 사용한다.
# 단, 커밋하고 나서 시간이 오래 지난 후에 다시 커밋해선 안 된다.
# 이 경우, 새로 add한 것들까지 다 포함되서 다시 커밋되기 때문.
git commit --amend

```

## typescript

```bash
{
  "strictNullChecks": true,
  "strict": true,
}
```

- 타입스크립트 config에서 strict를 켜고 끌 때의 차이는 무엇인가?

## DTO (Data Transfer Object)

- 데이터 전달 객체
- `동사 - 리소스 .dto.ts` 형식으로 작성한다.

## Repository

- 서비스에 있는 쿼리 중복을 최소화된다.
- 쿼리를 수정할 때 전체 서비스에 일괄적으로 적용될 수 있기 때문에 생산성이 높다.

```typescript
class UserRepo {
  findOneVaildUser() {
    // 3개월 이내인 유저만 고려한다는 로직을 여기에다가 추가하면,
    // 전체 서비스가 수정된다!
  }
}

function getMyPage() {
  try{
    const user = new UserRepo.findOneValidUser();
    2. 있으면 리턴한다.
    3. 없으면 에러를 던진다.
  } catch(err) {

  }
}

function getMyPoint() {
  try{
    const user = new UserRepo.findOneValidUser();
    2. 유저가 있으면 그 유저의 포인트를 본다. // DB 접근 필요
    3. 유저가 없으면 에러를 던진다.
  } catch(err) {

  }
}

function updateMyNickname() {
  try{
    const user = new UserRepo.findOneValidUser();
    2. 유저의 닉네임을 바꾼다. // DB 접근 필요
    3. 유저를 다시 조회해서 바뀐 닉네임의 유저를 리턴한다.
  } catch(err) {

  }
}
```

## Jest

- 테스트 코드를 이용해서 Postman으로 일일히 API를 호출하지 않아도 되게 한다.
- 테스트의 옵션들
  - --watch : 테스트 코드에서 저장이 새로 이루어질 때마다 테스트 재실행
  - --detectOpenHandles : 테스트 후 열려있는 소켓이 있을 경우 강제 종료
  - --runInBand : 테스트를 병렬적으로 실행하지 않고 순차적으로 실행하게 한다. (안정적)
- beforeAll, beforeEach, afterAll, afterEach
- it.only, it.skip, describe.only, describe.skip
