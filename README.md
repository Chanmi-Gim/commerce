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
