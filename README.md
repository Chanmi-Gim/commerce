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

### library

```bash
npm i typeorm mysql2 --save
```

- ORM 이란 무엇인가?
